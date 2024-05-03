import axiosInstance from '../../helpers/axios';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { useForm, Controller } from 'react-hook-form';
import { Spin, Flex } from 'antd';
import { FiPlus } from 'react-icons/fi';
import { useEffect, useState } from 'react';
import CreatableSelect from 'react-select/creatable';

export default function SalesForm({ config }) {
    const { loading, response, success, error, axiosFetch } = useAxiosFunction();
    const {
        Labels,
        customer,
        product,
        setCustomer,
        setProduct,
        customerLoad,
        productLoad,
    } = config;

    const customerConfig = {
        FORM_ENTITY: 'Customers',
        METHOD: 'post',
        MAIN_URL: `customers/`,
        SECOND_URL: `customers/`,
    }
    const productConfig = {
        PAGE_ENTITY: 'Products',
        PAGE_ENTITY_URL: 'products',
        METHOD: 'post',
        API_URL: `products/`
    }

    const [salesSummary, setSalesSummary] = useState();

    const [OpenModal, setOpenModal] = useState(false);
    const [ModalLoading, setModalLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setError: formSetError,
        clearErrors: formClearError,
        setValue,
        getValues,
        watch,
        control,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        defaultValues: {
            sales_quantity: 0,
            unit_cost: 0,
            total_cost: 0,
            unit_price: 0,
            gross_price: 0,
            tax_percent: 12,
            sales_VAT: 0,
            total_price: 0
        }
    });

    const onSubmit = async (data) => {
        const configObj = {
            url: `${Labels.API_URL}`,
            method: `${Labels.METHOD}`,
            data: data,
            formSetError: formSetError
        }
        axiosFetch(configObj);
    }

    useEffect(() => {
        if (success) {
            reset();
            formClearError();
            history.back();
        }
    }, [success])

    const getProductUnitCost = async () => {
        let sales_quantity = getValues('sales_quantity')
        let product_name = getValues('product_name')
        let sales_date = getValues('sales_date')
        const data = {
            sales_quantity,
            product_name,
            sales_date,
        }
        axiosInstance
            .post('products/getunitprice', data, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                formClearError('sales_quantity');
                if (response.data[0] !== undefined) {
                    console.log(response.data[response.data.length - 1].unit_cost)
                    let unitCost = Number(response.data[response.data.length - 1].unit_cost);
                    setValue('unit_cost', (unitCost).toFixed(2) * 1) // Set value for unit_cost field
                    setValue('total_cost', ((getValues('unit_cost') * sales_quantity).toFixed(2)) * 1) // Set value for total_cost field
                    setValue('gross_price', (((getValues('unit_price') * sales_quantity) / 1.12).toFixed(2)) * 1)
                    setValue('sales_VAT', ((getValues('gross_price') * 0.12).toFixed(2)) * 1)
                    setValue('total_price', ((getValues('gross_price') + getValues('sales_VAT')).toFixed(2)) * 1)
                    response.data.pop();
                    setSalesSummary(response.data);
                }
                // console.log(response.data);
            })
            .catch((err) => {
                // console.log(err);
                formSetError(`${err?.response?.data?.label}`, {
                    type: "manual",
                    message: `${err?.response?.data?.message}`
                })
            })
    }

    const onQuantityChange = () => {
        console.log(getValues('sales_quantity'))
    }

    const onUnitPriceChange = () => {
        let taxPercent = (getValues('tax_percent') / 100)
        let unitPrice = isNaN(getValues('unit_price')) ? 0 : getValues('unit_price')

        setValue("gross_price", ((unitPrice * getValues("sales_quantity")) / (taxPercent + 1)).toFixed(2))
        setValue("sales_VAT", (getValues("gross_price") * taxPercent).toFixed(2) * 1)
        setValue("total_price", (getValues("gross_price") + getValues('sales_VAT')).toFixed(2))
    }

    const onGrossPriceChange = () => {
        let taxPercent = (getValues('tax_percent') / 100)
        let grossPrice = isNaN(getValues('gross_price')) ? 0 : getValues('gross_price')
        setValue("sales_VAT", (grossPrice * taxPercent).toFixed(2) * 1)
        setValue("total_price", grossPrice + getValues('sales_VAT'))
    }

    const onVatChange = () => {
        onUnitPriceChange()
    }


    watch(['sales_status', 'unit_cost', 'tax_percent'])
    useEffect(() => {
        // console.log("rendered cust prod change")
    }, [customer, product])

    return (
        <div className="container pt-3">
            {customerLoad || productLoad ? (
                <div className="py-5">
                    <Flex vertical>
                        <Spin />
                    </Flex>
                </div>
            ) : (
                <>
                    <form id={`add${Labels.PAGE_ENTITY}Form`} onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6 border-end border-secondary">
                                <div className="d-flex gap-3">
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="sales_dr" className="text-md text-gray-500">Delivery Receipt</label>
                                        <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='sales_dr' placeholder='0000' {...register("sales_dr", { maxLength: 4 })} />
                                        {errors.sales_dr && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_dr.message}</p>)}
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="sales_invoice" className="text-md text-gray-500">Sales Invoice</label>
                                        <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='sales_invoice' placeholder='0000' {...register("sales_invoice", { maxLength: 4 })} />
                                        {errors.sales_invoice && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_invoice.message}</p>)}
                                    </div>
                                </div>
                                <div className='form-group mb-2'>
                                    <label htmlFor="sales_date">Date</label>
                                    <input type="date" className="form-control form-control-sm" id='sales_date'
                                        {
                                        ...register("sales_date", {
                                            required: "Date is required",
                                            onChange: getProductUnitCost,
                                        }
                                        )} />
                                    {errors.sales_date && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_date.message}</p>)}
                                </div>

                                <div className="form-group mb-2">
                                    <label htmlFor="customer" className="text-md text-gray-500">Customer</label>
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
                                        rules={{ required: true }}
                                    />
                                    {errors.customer && (<p className='text-danger px-1 mt-1 mb-1' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.customer.message}</p>)}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="product_name" className="text-md text-gray-500">Product Name</label>
                                    <div className="input-group">
                                        <select className="form-select form-select-sm" autoComplete='off' id='product_name'
                                            {
                                            ...register("product_name", {
                                                required: "Product Name is required",
                                                onChange: getProductUnitCost
                                            }
                                            )} >
                                            {product?.length != undefined ? (
                                                <>
                                                    <option value="">Choose...</option>
                                                    {product.map((item, index) => (
                                                        <option value={item.product_name} key={index}>{item.product_name}</option>
                                                    ))}
                                                </>
                                            ) : (
                                                <option value="">Choose...</option>
                                            )}
                                        </select>
                                    </div>
                                    {errors.product_name && (<p className='text-danger px-1 mt-1 mb-1' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.product_name.message}</p>)}
                                </div>

                                <div className="d-flex gap-3">

                                    <div className="flex-fill mb-2">
                                        <label htmlFor="sales_quantity" className="text-md text-gray-500">Quantity</label>
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='sales_quantity' min={1} step="0.01"
                                            {...register("sales_quantity", {
                                                required: "Quantity is Required",
                                                min: 1,
                                                onChange: getProductUnitCost,
                                            }
                                            )} />
                                        {errors.sales_quantity && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_quantity.message}</p>)}
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="sales_status" className="text-md text-gray-500">Status</label>
                                        <select className="form-select form-select-sm" autoComplete='off' defaultValue={'UNPAID'}
                                            {
                                            ...register("sales_status", {
                                                required: "Sales Status is required"
                                            })
                                            }>
                                            <option value={"PAID"}>{"PAID"}</option>
                                            <option value={"UNPAID"}>{"UNPAID"}</option>
                                        </select>
                                        {errors.sales_status && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_status.message}</p>)}
                                    </div>
                                </div>

                                <div className="d-flex gap-3">
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="unit_cost" className="text-md text-gray-500">Unit Cost</label>
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='unit_cost' step={0.000001}
                                            {...register("unit_cost", {
                                                required: "Quantity",
                                                valueAsNumber: true,
                                                onChange: (e) => setValue('total_cost', (e.target.value * getValues("sales_quantity")))
                                            }
                                            )} />
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="total_cost" className="text-md text-gray-500">Total Cost</label>
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='total_cost' step={0.000001}
                                            {...register("total_cost", {
                                                required: "Quantity",
                                                valueAsNumber: true
                                            }
                                            )}
                                        />
                                    </div>
                                </div>

                                {/*  */}

                                <div className="row mt-2">
                                    <div className="col-2 align-self-start"></div>
                                    <div className="col-5 align-self-center text-end">
                                        <label htmlFor="unit_price" className="fw-bold text-md text-gray-500 col-form-label">
                                            Unit Price
                                            <span className='fw-normal fs-6'>{getValues('tax_percent') == 12 ? `(Tax Included)` : `(0% Tax)`}</span>:</label>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='unit_cost' step={0.000001}
                                            {...register("unit_price", {
                                                required: "Unit Price is required",
                                                valueAsNumber: true,
                                                min: 0,
                                                onChange: () => onUnitPriceChange()
                                            }
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-1 align-self-start"></div>
                                    <div className="col-6 align-self-center text-end">
                                        <label htmlFor="gross_price" className="fw-bold text-md text-gray-500 col-form-label">
                                            Gross Price
                                            <span className='fw-normal fs-6'>{getValues('tax_percent') == 12 ? `(Tax Excluded)` : `(0% Tax)`}</span>:</label>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='gross_price' min={0} step={0.000001}
                                            {
                                            ...register("gross_price", {
                                                required: "Sub Total is required",
                                                valueAsNumber: true,
                                                min: 0,
                                                onChange: () => onGrossPriceChange()
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
                                                onChange: () => onVatChange()
                                            })
                                            }>
                                            <option value={12} defaultValue={12}>VAT 12%</option>
                                            <option value={0}>VAT 0%</option>
                                        </select>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='sales_VAT' min={0} step={0.000001} readOnly disabled
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
                                        <label htmlFor="total_price" className="fw-bold text-md text-gray-500 col-form-label">Total Selling Price:</label>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='total_price' min={0} step={0.000001}
                                            {
                                            ...register("total_price", {
                                                required: "Total Selling Price is Required",
                                                valueAsNumber: true,
                                                min: 0,
                                            })
                                            } />
                                    </div>
                                </div>

                                {/*  */}

                                {getValues('sales_status') == 'PAID' &&
                                    <div className='flex-fill mb-2'>
                                        <label htmlFor="sales_paid_date">Date Paid</label>
                                        <input type="date" className="form-control form-control-sm" id='sales_paid_date' {...register("sales_paid_date", { required: (getValues('sales_status') == 'PAID' ? "If status is PAID, date paid is required" : false) })} />
                                        {errors.sales_paid_date && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_paid_date.message}</p>)}
                                    </div>
                                }
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
                                {salesSummary &&
                                    <table className="table table-sm">
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
                                            {salesSummary?.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.date}</td>
                                                    <td>{item.quantity_bought}</td>
                                                    <td>{item.quantity_remaining}</td>
                                                    <td>({item.quantity_deduct})</td>
                                                    <td>{item.quantity_left}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                }
                            </div>
                        </div>
                    </form >
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                        <button type='submit' className='btn btn-primary col-2' form={`add${Labels.PAGE_ENTITY}Form`} disabled={isSubmitting || !isDirty || errors.sales_quantity}><FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />Save</button>
                        <button type='button' onClick={() => history.back()} className='btn btn btn-outline-secondary'>Cancel</button>
                    </div>
                </>
            )}
        </div >
    )
}
