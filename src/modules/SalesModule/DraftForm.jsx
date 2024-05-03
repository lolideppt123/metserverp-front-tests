import axiosInstance from '../../helpers/axios';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import Spinner from '../../components/Fallback/Spinner';
import { Spin, Divider, Tooltip } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FiPlus, FiX, FiInfo } from 'react-icons/fi';
import { RiDraftLine } from 'react-icons/ri';
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

// For Modal
import CardModal from '../../components/Modal/CardModal';
import AddSalesReviewModalBody from '../../components/Modal/ModalBody/AddSalesReviewModalBody';
import MoneyFormatter from '../../settings/MoneyFormatter';

// For autosave
import useAutoSaveForm from '../../hooks/useAutoSaveForm';
import { useDispatch, useSelector } from 'react-redux';
import { selectSalesFormState, salesFormReset } from '../../features/sales/salesSlice';
import _ from 'lodash';
import ConfirmationModal from '../../components/Modal/ConfirmationModal';

export default function DraftForm({ config }) {
    const { saveFormAsDraft } = useAutoSaveForm();
    const dispatch = useDispatch();

    const formState = useSelector(selectSalesFormState);
    const { success, axiosFetch } = useAxiosFunction();
    const {
        Labels,
        customer,
        product,
        customerLoad,
        productLoad,
    } = config;

    // choices you already picked
    const [picked, setPicked] = useState([]);
    const [PriceList, setPriceList] = useState([]);

    const [ResponseData, setResponseData] = useState([]);
    const [FormLoading, setFormLoading] = useState(false);
    const [DraftLoading, setDraftLoading] = useState(false);
    const [LoadDraft, setLoadDraft] = useState(false);

    const {
        register,
        trigger,
        handleSubmit,
        reset,
        setError: formSetError,
        clearErrors: formClearError,
        setValue,
        getValues,
        watch,
        control,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            sales_dr: "",
            sales_invoice: "",
            sales_date: "",
            customer: "",
            products: [{ product: '', sales_quantity: 0, unit_price: 0, unit_cost: 0, total_cost: 0 }],
            gross_price: 0,
            sales_VAT: 0,
            total_price: 0,
            tax_percent: 12,
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: 'products',
        control,
        rules: {
            required: "Required at least 1 item"
        }
    })

    const handleRemoveItem = (index) => {
        setPicked(prev => prev.filter(prevItem => prevItem !== productItem[index].product))
        // return only the items that are not equal the index
        setPriceList(prev => prev.filter((_, i) => i !== index))
        setResponseData(prev => prev.filter((_, i) => i !== index))
        formClearError(`products.${index}`)
    }

    const handleChangeItem = (index) => {
        setPicked(prev => [...prev, getValues('products')[index].product]);
        getProductUnitCost();
        formClearError(`products.${index}`)
    }

    const handleChangeUnitPrice = (index) => {
        getProductUnitCost();
        // set price in specific index
        const prices = [...PriceList]
        prices[index] = getValues('products')[index].unit_price * getValues('products')[index].sales_quantity;
        if (isNaN(prices[index])) prices[index] = 0;
        setPriceList(prices)
        // onUnitPriceChange() is called in useEffect after
    }

    const onUnitPriceChange = () => {
        let sum = 0;
        let taxPercent = taxRate / 100

        PriceList.forEach(item => sum += item)
        if (isNaN(sum)) sum = 0
        setValue('gross_price', (sum / (taxPercent + 1)).toFixed(2))
        setValue("sales_VAT", (getValues('gross_price') * taxPercent).toFixed(2) * 1)
        setValue("total_price", (getValues('gross_price') + getValues('sales_VAT')).toFixed(2))
    }

    const onGrossPriceChange = () => {
        let taxPercent = taxRate / 100
        let grossPrice = isNaN(getValues('gross_price')) ? 0 : getValues('gross_price')
        setValue("sales_VAT", (grossPrice * taxPercent).toFixed(2) * 1)
        setValue("total_price", (grossPrice + getValues('sales_VAT')).toFixed(2))
    }

    const getProductUnitCost = async () => {
        let sales_date = getValues('sales_date')
        // create an empty array to be pushed to setResponseData later after loop ends
        const costList = []
        // .entries converts array into key pair value in order to use index
        for (const [itemNo, item] of productItem.entries()) {
            if (isNaN(item.sales_quantity)) item.sales_quantity = 0
            let data = {
                product_name: item.product,
                sales_quantity: item.sales_quantity,
                sales_date,
                itemNo
            }
            await axiosInstance
                .post('products/getunitprice', data, {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                })
                .then((response) => {
                    formClearError(`products.${[itemNo]}.sales_quantity`);
                    if (response.data[0] !== undefined) {
                        item.unit_cost = Number(response.data[response.data.length - 1].unit_cost)
                        item.total_cost = Number((item.unit_cost * item.sales_quantity).toFixed(2))
                        // Remove last item in array which is cost average of unit cost
                        response.data.pop();
                        // Not really cost list
                        // List of quantity deduction breakdowns
                        costList[itemNo] = response.data
                    }
                })
                .catch((err) => {
                    console.log(err);
                    formSetError(`${err?.response?.data?.label}`, {
                        type: "manual",
                        message: `${err?.response?.data?.message}`
                    })
                })
        }
        setResponseData(costList)
    }

    const checkInvoice = async () => {
        let invoice = getValues('sales_invoice')
        await axiosInstance
            .post('checkinvoice', invoice, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                formClearError('sales_invoice')
            })
            .catch((err) => {
                console.log(err);
                formSetError(`${err?.response?.data?.label}`, {
                    type: "manual",
                    message: `${err?.response?.data?.message}`
                })
            })
    }

    const onSubmit = async (data) => {
        setFormLoading(true);
        const configObj = {
            url: `${Labels.API_URL}`,
            method: `${Labels.METHOD}`,
            data: data,
            formSetError: formSetError
        }
        setTimeout(async () => {
            dispatch(salesFormReset());
            axiosFetch(configObj);
            setFormLoading(false);
        }, 1500);
    }

    const saveAsDraft = () => {
        trigger();
        setDraftLoading(true);
        setTimeout(() => {
            saveFormAsDraft(fieldData, isDirty, isValid);

            setDraftLoading(false);
        }, 1500);
    }

    const loadDraftForm = () => {
        const newFormState = { ...formState };

        delete newFormState['_persist'];

        const stateKeys = Object.keys(newFormState);

        for (const key of stateKeys) {
            setValue(key, newFormState[key], { shouldDirty: true, shouldValidate: true });
        }

        const prices = [...PriceList];

        newFormState['products'].map((_, index) => {
            handleChangeItem(index);
            prices[index] = getValues('products')[index].unit_price * getValues('products')[index].sales_quantity;
            if (isNaN(prices[index])) prices[index] = 0;
            setPriceList(prices)
        });
    }

    // Watch & useEffects
    const [productItem, salesStatus, grossPrice, taxRate] = watch(['products', 'sales_status', 'gross_price', 'tax_percent']);
    const fieldData = watch();

    useEffect(() => {
        if (success) {
            setFormLoading(false);
            reset();
            formClearError();
            history.back();
        }
    }, [success])

    useEffect(() => {
        onUnitPriceChange();
    }, [customer, product, PriceList, taxRate, ResponseData])

    useEffect(() => {
        getProductUnitCost();
    }, [picked])


    useEffect(() => {
        if ('_persist' in formState) {
            const newFormState = { ...formState };
            delete newFormState['_persist'];
            if (!_.isEqual(newFormState, fieldData)) {
                setLoadDraft(true);
            }
        }
    }, [])

    return (
        <div className="container pt-3">
            {customerLoad || productLoad ? (
                <Spinner />
            ) : (
                <>
                    {LoadDraft && !isDirty && (
                        <ConfirmationModal isOpen={LoadDraft} loadData={loadDraftForm}>
                            <div style={{ flex: '1', justifyContent: 'center', alignItems: 'center' }}>
                            </div>
                        </ConfirmationModal>
                    )}

                    <form id={`add${Labels.PAGE_ENTITY}Form`} onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6 border-end border-secondary">
                                <div className="d-flex gap-3">
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="sales_dr" className="text-md text-gray-500">Delivery Receipt</label>
                                        <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='sales_dr' placeholder='0000' {...register("sales_dr", { maxLength: 4 })} />
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="sales_invoice" className="text-md text-gray-500">Sales Invoice</label>
                                        <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='sales_invoice' placeholder='0000'
                                            {
                                            ...register("sales_invoice", {
                                                maxLength: 150,
                                                onChange: () => checkInvoice(),
                                                onBlur: () => checkInvoice()
                                            })
                                            }
                                        />
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="sales_date">Date {errors.sales_date && (<span className='text-danger fw-semibold'>{errors.sales_date.message}</span>)}</label>
                                        <input type="date" className="form-control form-control-sm" id='sales_date' required
                                            {
                                            ...register("sales_date", {
                                                required: " (required)*",
                                                onChange: () => getProductUnitCost(),
                                            }
                                            )} />
                                    </div>
                                </div>
                                {errors?.sales_invoice && (<p className='text-danger px-1 mt-1 mb-2 text-center' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_invoice.message}</p>)}

                                <div className="form-group mb-3">
                                    <label htmlFor="customer" className="text-md text-gray-500">Customer{errors.customer && (<span className='text-danger fw-semibold'>{errors.customer.message}</span>)}</label>
                                    <Controller
                                        name='customer'
                                        render={({ field }) => (
                                            <CreatableSelect
                                                {...field}
                                                isClearable
                                                options={customer}
                                                getOptionValue={(option) => option.id}
                                                getOptionLabel={(option) => option.company_name}
                                                getNewOptionData={
                                                    (value, label) => ({
                                                        id: value,
                                                        company_name: label,
                                                        __isNew__: true
                                                    })
                                                }
                                                maxMenuHeight={300}
                                            />
                                        )}
                                        control={control}
                                        rules={{ required: " (required)*" }}
                                    />

                                </div>

                                <div className='mb-4'>
                                    {fields.map((field, index) => {
                                        return (
                                            <div key={field.id} className="card card-header mb-2 ps-3 pe-1">
                                                <div className="d-flex gap-3">
                                                    <div className="flex-fill mb-2" style={{ width: '60%' }}>
                                                        <label htmlFor={`products.${index}.product`} className="text-md text-gray-500">Product Name</label>
                                                        <div className="input-group">
                                                            <select className="form-select form-select-sm" autoComplete='off' id='product_name' style={{ overflow: 'hidden', textOverflow: 'ellipsis' }} disabled={getValues(`products.${index}.product`) == "" ? false : true} required
                                                                {
                                                                ...register(`products.${index}.product`, {
                                                                    required: "Product Name is required",
                                                                    onChange: () => handleChangeItem(index)
                                                                }
                                                                )} >
                                                                {product?.length != undefined ? (
                                                                    <>
                                                                        <option value="">Choose...</option>
                                                                        {product.map((item, index) => (
                                                                            <option
                                                                                value={item.product_name}
                                                                                key={index}
                                                                                disabled={picked.includes(item.product_name)}
                                                                            >
                                                                                {item.product_name}
                                                                            </option>
                                                                        ))}
                                                                    </>
                                                                ) : (
                                                                    <option value="">Choose...</option>
                                                                )}
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div className="flex-fill mb-2" style={{ width: '25%' }}>
                                                        <label htmlFor={`products.${index}.sales_quantity`} className="text-md text-gray-500">Quantity</label>
                                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' min={0.01} step={0.01} required
                                                            {...register(`products.${index}.sales_quantity`, {
                                                                required: "Quantity is Required",
                                                                valueAsNumber: true,
                                                                min: { value: 0.01, message: 'Quantity is required. Min value 0.01' },
                                                                onChange: () => handleChangeUnitPrice(index),
                                                                onBlur: () => handleChangeUnitPrice(index)
                                                            }
                                                            )} />
                                                    </div>

                                                    <div className="flex-fill mb-2" style={{ width: '35%' }}>
                                                        <label htmlFor={`products.${index}.unit_price`} className="text-md text-gray-500">
                                                            Unit Price
                                                            <Tooltip title={getValues('tax_percent') == 12 ? `Unit Price INCLUDES VAT of 12%` : `0% Tax`}>
                                                                <FiInfo style={{ color: 'var(--bs-indigo-500)', margin: '2px', cursor: 'pointer' }} />
                                                            </Tooltip>
                                                        </label>
                                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' min={0.00} step={0.01} required
                                                            {...register(`products.${index}.unit_price`, {
                                                                required: "Unit Price is required",
                                                                valueAsNumber: true,
                                                                min: 0.00,
                                                                onChange: () => handleChangeUnitPrice(index)
                                                            }
                                                            )}
                                                        />
                                                    </div>
                                                    <div className="btn-group mb-2">
                                                        <a type='button' className='text-danger' onClick={() => {
                                                            handleRemoveItem(index)
                                                            remove(index)
                                                        }}>
                                                            <FiX style={{ height: '24px', width: '24px', margin: '23px 6px 3px 0' }} />
                                                        </a>
                                                    </div>
                                                </div>
                                                {errors.products?.[index] &&
                                                    (
                                                        <>
                                                            {console.log(errors.products?.[index])}
                                                            <span className='text-danger text-center fw-semibold'>{errors.products?.[index]?.product?.message}</span>
                                                            <span className='text-danger text-center fw-semibold'>{errors.products?.[index]?.sales_quantity?.message}</span>
                                                            <span className='text-danger text-center fw-semibold'>{errors.products?.[index]?.unit_price?.message}</span>
                                                        </>
                                                    )
                                                }
                                            </div>
                                        )
                                    })}
                                    <p className='fw-semibold text-center text-danger'>{errors.products?.root?.message}</p>
                                    <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-2 mt-2 border-top">
                                        <button className='btn btn-primary' type='button'
                                            onClick={() => {
                                                append({
                                                    product: "",
                                                    sales_quantity: 0,
                                                    unit_price: 0,
                                                    unit_cost: 0,
                                                    total_cost: 0
                                                })
                                            }}>
                                            <FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />Add Item</button>
                                    </div>

                                </div>

                                <Divider />

                                <div className="row">
                                    <div className="col-1 align-self-start"></div>
                                    <div className="col-6 align-self-center text-end">
                                        <label htmlFor="gross_price" className="fw-bold text-md text-gray-500 col-form-label">
                                            Gross Price
                                            <Tooltip title={getValues('tax_percent') == 12 ? `Gross Price EXCLUDES VAT of 12%` : `0% Tax`}>
                                                <FiInfo style={{ color: 'var(--bs-indigo-500)', margin: '2px', cursor: 'pointer' }} />
                                            </Tooltip>
                                            :
                                        </label>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='gross_price' min={0} step={0.01}
                                            {
                                            ...register("gross_price", {
                                                required: "Sub Total is required",
                                                valueAsNumber: true,
                                                min: 0,
                                                onChange: () => onGrossPriceChange(),
                                                setValueAs: (v) => MoneyFormatter({ amount: v })
                                            })
                                            } />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-3 align-self-start"></div>
                                    <div className="col-4 align-self-center text-end">
                                        <select className='form-select form-select-sm' defaultValue={12}
                                            {
                                            ...register("tax_percent", {
                                                valueAsNumber: true,
                                            })
                                            }>
                                            <option value={12} defaultValue={12}>VAT 12%</option>
                                            <option value={0}>VAT 0%</option>
                                        </select>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='sales_VAT' min={0} step={0.01} readOnly disabled
                                            {
                                            ...register("sales_VAT", {
                                                required: "VAT is required",
                                                valueAsNumber: true,
                                            })
                                            } />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-2 align-self-start"></div>
                                    <div className="col-5 align-self-center text-end">
                                        <label htmlFor="total_price" className="fw-bold text-md text-gray-500 col-form-label">Total:</label>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='total_price' min={0} step={0.01}
                                            {
                                            ...register("total_price", {
                                                required: "Total Selling Price is Required",
                                                valueAsNumber: true,
                                                min: 0,
                                            })
                                            } />
                                    </div>
                                </div>

                                <Divider />

                                <div className="form-group mb-2">
                                    <label htmlFor="sales_note">Note</label>
                                    <textarea className="form-control form-control-sm" rows="5" cols="50" style={{ resize: 'none' }} id='sales_note'
                                        {
                                        ...register("sales_note")
                                        }>
                                    </textarea>
                                </div>
                            </div>
                            <div className="col-md-6">
                                {ResponseData?.map((item, index) => (
                                    <div key={`${item[0]?.product}.${index}`}>
                                        <h6 className="fw-semibold text-center px-3 mt-4 mb-1">{item[0]?.product}</h6>
                                        <table key={index} className="table table-sm mb-3">
                                            <thead>
                                                <tr>
                                                    <th scope='col col-sm'>Date</th>
                                                    <th scope='col col-sm'>Bought</th>
                                                    <th scope='col col-sm'>Remaining</th>
                                                    <th scope='col col-sm'>Deduct</th>
                                                    <th scope='col col-sm'>Left</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {item?.map((elem, i) => (
                                                    <tr key={i}>
                                                        <td>{elem.date}</td>
                                                        <td>{elem.quantity_bought}</td>
                                                        <td>{elem.quantity_remaining}</td>
                                                        <td>({elem.quantity_deduct})</td>
                                                        <td>{elem.quantity_left}</td>
                                                    </tr>

                                                ))}

                                            </tbody>
                                        </table>
                                    </div>
                                ))}

                                {ResponseData.length !== 0 &&
                                    <CardModal
                                        titleProp={<></>}
                                        modalWidth={800}
                                        classList={"d-flex justify-content-center flex-md-nowrap align-items-center pt-2 mt-4"}
                                        buttonText={
                                            <button
                                                type='button'
                                                className='btn btn-primary col-6'
                                                disabled={!isDirty || errors['products'] || errors['sales_invoice']}
                                            >
                                                <HiOutlineDocumentMagnifyingGlass style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />
                                                Review
                                            </button>
                                        }
                                        setDestroy={() => []}
                                    >
                                        <AddSalesReviewModalBody salesData={ResponseData} avgCost={productItem} />
                                    </CardModal>
                                }

                            </div>
                        </div>
                    </form >

                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                        <button type='submit' className='btn btn-primary col-2' form={`add${Labels.PAGE_ENTITY}Form`} disabled={isSubmitting || !isDirty || !isValid || errors['products'] || errors['sales_invoice']}>
                            {FormLoading ? (
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{
                                                fontSize: 18,
                                                color: 'white',
                                                margin: '0 8px 3px 0'
                                            }}
                                            spin
                                        />
                                    }
                                />
                            ) : (
                                <FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />
                            )}
                            Save
                        </button>
                        <button type='button' className='btn btn-outline-primary col-2' onClick={saveAsDraft} disabled={!isDirty}>
                            {DraftLoading ? (
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{
                                                fontSize: 18,
                                                color: 'white',
                                                margin: '0 8px 3px 0'
                                            }}
                                            spin
                                        />
                                    }
                                />
                            ) : (
                                <RiDraftLine style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />
                            )}
                            Save as draft
                        </button>
                        <button type='button' onClick={() => history.back()} className='btn btn btn-outline-secondary'>Cancel</button>
                    </div>
                </>




            )}
        </div >
    )
}
