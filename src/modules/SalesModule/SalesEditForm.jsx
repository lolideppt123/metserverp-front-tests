import { useEffect, useState } from 'react';
import axiosInstance from '../../helpers/axios';
import { Spin, Flex, Tooltip } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

import { FiPlus, FiInfo } from 'react-icons/fi';
import { useUpdateSalesItemMutation } from '../../features/sales/salesApiSlice';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Fallback/Spinner';

export default function SalesEditForm({ config }) {
    const {
        Labels,
        sale = {},
        customer,
        isLoading
    } = config;

    const [FormLoading, setFormLoading] = useState(false);
    const [validated, setValidated] = useState(false);

    const [updateSales, {}] = useUpdateSalesItemMutation();
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        setError: formSetError,
        clearErrors: formClearError,
        setValue,
        getValues,
        watch,
        control,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm();

    const onSubmit = async (data) => {
        // inserts new property. Then backend checks if quantity has been changed
        data['quantity_diff'] = data.sales_quantity - sale.sales_quantity;

        setFormLoading(true);

        let message = "";
        let variant = "";

        try {
            const response = await updateSales(data).unwrap();
            message = response?.message;
            variant = "success";
        }
        catch (err) {
            console.log(`Updating sales error: `, err);
            message = err?.data?.message || "An error occurred while updating. Try again or contact Master Joseph";
            variant = "error";
        }
        finally {
            // Close modal
            setTimeout(() => {
                enqueueSnackbar(message, {variant: variant, autoHideDuration: 5000});
                setFormLoading(false);
                navigate(-1);
            }, 1500);
        }
    }

    const onQuantityChange = () => {
        let taxPercent = taxRate / 100
        let salesQuantity = isNaN(getValues("sales_quantity")) ? 0 : getValues("sales_quantity");
        let salesUnitCost = isNaN(getValues('unit_cost')) ? 0 : getValues('unit_cost');
        let salesUnitPrice = isNaN(getValues('unit_price')) ? 0 : getValues('unit_price');
        let salesGrossPrice = isNaN(getValues('gross_price')) ? 0 : getValues('gross_price');

        setValue('total_cost', (salesUnitCost * salesQuantity).toFixed(2)) // Set value for total_cost field
        setValue('gross_price', ((salesUnitPrice * salesQuantity) / (1 + taxPercent)).toFixed(2))
        setValue('sales_VAT', (salesGrossPrice * taxPercent).toFixed(2))
        setValue('total_price', (salesGrossPrice + getValues('sales_VAT')).toFixed(2))
    }

    // Check if there's enough stock for the product
    const validateProductStock = async () => {
        let sales_date = getValues('sales_date');
        let salesQuantity = isNaN(getValues("sales_quantity")) ? 0 : getValues("sales_quantity");
        let sales_diff = (salesQuantity - sale.sales_quantity) < 0 ? 0 : (salesQuantity - sale.sales_quantity);

        let data = {
            product_name: sale?.product_name,
            sales_quantity: [{ sales_diff, quantity: sale.sales_quantity }],
            sales_date,
            itemNo: null
        }

        await axiosInstance
            .post('products/getunitprice', data, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true
            })
            .then((response) => {
                formClearError(`sales_quantity`);
            })
            .catch((err) => {
                console.log(err);
                formSetError(`${err?.response?.data?.label}`, {
                    type: "manual",
                    message: `${err?.response?.data?.message}`
                })
            })

        setValidated(prev => !prev);
    }

    const [salesQuantity, unitPrice, grossPrice, taxRate] = watch(['sales_quantity', 'unit_price', 'gross_price', 'tax_percent']);

    useEffect(() => {
        onQuantityChange()
    }, [salesQuantity, unitPrice, taxRate, validated])

    useEffect(() => {
        if (sale == null) {
        }
        else {
            [
                { name: 'sales_dr', value: sale.sales_dr },
                { name: 'sales_invoice', value: sale.sales_invoice },
                { name: 'sales_date', value: sale.sales_date },
                { name: 'customer', value: sale.customer },
                { name: 'product_name', value: sale.product_name },
                { name: 'sales_quantity', value: parseFloat(sale.sales_quantity) },
                { name: 'unit_cost', value: parseFloat(sale.sales_unit_cost) },
                { name: 'total_cost', value: parseFloat(sale.sales_total_cost) },

                { name: 'unit_price', value: parseFloat(sale.sales_unit_price) },
                { name: 'gross_price', value: parseFloat(sale.sales_gross_price) },
                { name: 'tax_percent', value: parseInt(sale.tax_percent) },
                { name: 'sales_VAT', value: parseFloat(sale.sales_VAT) },
                { name: 'total_price', value: parseFloat(sale.sales_total_price) },

                { name: 'sales_note', value: sale.sales_note },
                { name: 'sales_paid_date', value: (sale.sales_paid_date)?.split('T')[0] },

                // Additional properties needed
                { name: 'pk', value: sale.pk },
                { name: 'sales_transaction', value: sale.sales_transaction },

            ].forEach(({ name, value }) => setValue(name, value))

        }
    }, [sale])

    return (
        <div className="container pt-3">
        {isLoading ? (
                <div className="py-5">
                    <Spinner />
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
                                        <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='sales_invoice' placeholder='0000' {...register("sales_invoice", { maxLength: 150 })} />
                                        {errors.sales_invoice && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_invoice.message}</p>)}
                                    </div>
                                </div>

                                <div className='form-group mb-2'>
                                    <label htmlFor="sales_date">Date</label>
                                    <span type="date" className="form-control form-control-sm bg-secondary">{sale?.sales_date}</span>
                                </div>

                                <div className="form-group mb-2">
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

                                <div className="form-group mb-2">
                                    <label htmlFor="product_name" className="text-md text-gray-500">Product Name</label>
                                    <div className="input-group">
                                        <span className="form-control form-control-sm bg-secondary">
                                            {sale?.product_name}
                                        </span>
                                    </div>
                                    {errors.product_name && (<p className='text-danger px-1 mt-1 mb-1' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.product_name.message}</p>)}
                                </div>

                                <div className="d-flex gap-3">
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="sales_quantity" className="text-md text-gray-500">Quantity</label>
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' min={0.01} step={0.01} required
                                            {...register("sales_quantity", {
                                                required: "Quantity is Required",
                                                valueAsNumber: true,
                                                min: { value: 0.01, message: 'Quantity is required. Min value 0.01' },
                                                onChange: () => validateProductStock(),
                                                onBlur: () => validateProductStock()
                                            }
                                            )} />
                                        {errors.sales_quantity && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_quantity.message}</p>)}
                                    </div>
                                </div>

                                <div className="d-flex gap-3">
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="unit_cost" className="text-md text-gray-500">Unit Cost</label>
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='unit_cost' step={"0.000001"}
                                            {...register("unit_cost", {
                                                required: "Quantity",
                                                valueAsNumber: true,
                                                onChange: (e) => setValue("total_cost", (e.target.value * getValues("sales_quantity")))
                                            }
                                            )} />
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="total_cost" className="text-md text-gray-500">Total Cost</label>
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='total_cost' step={"0.000001"}
                                            {...register("total_cost", {
                                                required: "Quantity",
                                                valueAsNumber: true
                                            }
                                            )} />
                                    </div>
                                </div>

                                {/*  */}

                                <div className="row mt-2">
                                    <div className="col-2 align-self-start"></div>
                                    <div className="col-5 align-self-center text-end">
                                        <label htmlFor="unit_price" className="fw-bold text-md text-gray-500 col-form-label">
                                            Unit Price
                                            <Tooltip title={getValues('tax_percent') == 12 ? `Unit Price INCLUDES VAT of 12%` : `0% Tax`}>
                                                <FiInfo style={{ color: 'var(--bs-indigo-500)', margin: '2px', cursor: 'pointer' }} />
                                            </Tooltip>
                                            :
                                        </label>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='unit_cost' step={0.01} required
                                            {...register("unit_price", {
                                                required: "Unit Price is required",
                                                valueAsNumber: true,
                                                min: 0,
                                                onChange: () => onQuantityChange(),
                                                onBlur: () => onQuantityChange()
                                            }
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-2 align-self-start"></div>
                                    <div className="col-5 align-self-center text-end">
                                        <label htmlFor="gross_price" className="fw-bold text-md text-gray-500 col-form-label">
                                            Gross Price
                                            <Tooltip title={getValues('tax_percent') == 12 ? `Gross Price EXCLUDES VAT of 12%` : `0% Tax`}>
                                                <FiInfo style={{ color: 'var(--bs-indigo-500)', margin: '2px', cursor: 'pointer' }} />
                                            </Tooltip>
                                            :
                                        </label>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='gross_price' min={0} step={0.000001}
                                            {
                                            ...register("gross_price", {
                                                required: "Sub Total is required",
                                                valueAsNumber: true,
                                                min: 0,
                                                onChange: (e) => {
                                                    setValue("sales_VAT", (e.target.value * 0.12).toFixed(2) * 1)
                                                    setValue("total_price", (e.target.value + getValues('sales_VAT')).toFixed(2))
                                                }
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

                                <div className="form-group mb-2">
                                    <label htmlFor="sales_note">Note</label>
                                    <textarea className="form-control form-control-sm" rows="5" cols="50" style={{ resize: 'none' }} id='sales_note'
                                        {
                                        ...register("sales_note")
                                        }>

                                    </textarea>
                                </div>
                            </div>
                            <div className="col-md-5">

                            </div>
                        </div>
                    </form >
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                        <button type='submit' disabled={isSubmitting || !isDirty || !isValid || errors['sales_quantity']} className='btn btn-primary col-2' form={`add${Labels.PAGE_ENTITY}Form`}>
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
                        <button type='button' onClick={() => history.back()} className='btn btn btn-outline-secondary'>Cancel</button>
                    </div>
                </>
            )}
        </div >
    )
}
