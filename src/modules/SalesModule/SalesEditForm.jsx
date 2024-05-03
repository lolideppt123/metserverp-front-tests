import { useEffect, useState } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { Spin, Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';
import CreatableSelect from 'react-select/creatable';

import { FiPlus } from 'react-icons/fi';

export default function SalesEditForm({ config }) {
    const { loading, response, success, error, axiosFetch } = useAxiosFunction();
    const {
        Labels,
        sale,
        customer,
        product,
        id,
        productLoad,
        customerLoad,
        saleLoad,
    } = config;

    const [FormLoading, setFormLoading] = useState(false);



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
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        setFormLoading(true);
        const configObj = {
            url: `${Labels.API_URL}`,
            method: `${Labels.METHOD}`,
            data: data,
            formSetError: formSetError
        }
        setTimeout(async () => {
            axiosFetch(configObj);
            // setFormLoading(false);
        }, 1500);
    }

    useEffect(() => {
        if (success) {
            setFormLoading(false);
            reset();
            formClearError();
            history.back();
        }
    }, [success])

    useEffect(() => {
        // console.log(sale == null)
        if (sale == null) {
            console.log("sale does not exists")
        }
        else {
            console.log(sale);
            [
                { name: 'sales_dr', value: sale.sales_dr },
                { name: 'sales_invoice', value: sale.sales_invoice },
                { name: 'sales_date', value: sale.sales_date },
                { name: 'customer', value: sale.customer },
                // { name: 'product_name', value: sale.product_name },
                { name: 'sales_quantity', value: parseFloat(sale.sales_quantity) },
                { name: 'unit_cost', value: parseFloat(sale.sales_unit_cost) },
                { name: 'total_cost', value: parseFloat(sale.sales_total_cost) },

                { name: 'unit_price', value: parseFloat(sale.sales_unit_price) },
                { name: 'gross_price', value: parseFloat(sale.sales_gross_price) },
                { name: 'tax_percent', value: parseInt(sale.tax_percent) },
                { name: 'sales_VAT', value: parseFloat(sale.sales_VAT) },
                { name: 'total_price', value: parseFloat(sale.sales_total_price) },

                // { name: 'sales_status', value: sale.sales_status },
                { name: 'sales_note', value: sale.sales_note },
                { name: 'sales_paid_date', value: (sale.sales_paid_date)?.split('T')[0] },
            ].forEach(({ name, value }) => setValue(name, value))

        }
    }, [sale])

    const onQuantityChange = (e) => {
        setValue("total_cost", getValues("unit_cost") * e.target.value)
        setValue('total_cost', (getValues('unit_cost') * getValues("sales_quantity"))) // Set value for total_cost field
        setValue('gross_price', ((getValues('unit_price') * getValues("sales_quantity")) / 1.12).toFixed(2))
        setValue('sales_VAT', (getValues('gross_price') * 0.12).toFixed(2))
        setValue('total_price', (getValues('gross_price') + getValues('sales_VAT')))
    }
    watch('product_name')

    return (
        <div className="container pt-3">
            {productLoad || customerLoad || saleLoad ? (
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
                                        <span className="form-control form-control-sm bg-secondary">{sale?.sales_quantity}</span>
                                    </div>
                                    {/* <div className="flex-fill mb-2">
                                        <label htmlFor="sales_status" className="text-md text-gray-500">Status</label>
                                        <select className="form-select form-select-sm" autoComplete='off'
                                            {
                                            ...register("sales_status", {
                                                required: "Sales Status is required"
                                            })
                                            }>
                                            <option value={"PAID"}>{"PAID"}</option>
                                            <option value={"UNPAID"}>{"UNPAID"}</option>
                                        </select>
                                        {errors.sales_status && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_status.message}</p>)}
                                    </div> */}
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
                                        <label htmlFor="unit_price" className="fw-bold text-md text-gray-500 col-form-label">Unit Price <span className='fw-normal fs-6'>(Tax Included)</span>:</label>
                                    </div>
                                    <div className="col-5 align-self-end">
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='unit_cost' step={0.000001}
                                            {...register("unit_price", {
                                                required: "Unit Price is required",
                                                valueAsNumber: true,
                                                min: 0,
                                                onChange: (e) => {
                                                    setValue("gross_price", ((e.target.value * getValues("sales_quantity")) / 1.12).toFixed(2))
                                                    setValue("sales_VAT", (getValues("gross_price") * 0.12).toFixed(2) * 1)
                                                    setValue("total_price", (getValues("gross_price") + getValues('sales_VAT')).toFixed(2))
                                                }
                                            }
                                            )}
                                        />
                                    </div>
                                </div>
                                <div className="row mt-2">
                                    <div className="col-2 align-self-start"></div>
                                    <div className="col-5 align-self-center text-end">
                                        <label htmlFor="gross_price" className="fw-bold text-md text-gray-500 col-form-label">Gross Price:</label>
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

                                {/* {getValues('sales_status') == 'PAID' &&
                                    <div className='flex-fill mb-2'>
                                        <label htmlFor="sales_paid_date">Date Paid</label>
                                        <input type="date" className="form-control form-control-sm" id='sales_paid_date' {...register("sales_paid_date", { required: (getValues('sales_status') == 'PAID' ? "If status is PAID, date paid is required" : false) })} />
                                        {errors.sales_paid_date && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_paid_date.message}</p>)}
                                    </div>
                                } */}
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
                        <button type='submit' disabled={isSubmitting || !isDirty || !isValid} className='btn btn-primary col-2' form={`add${Labels.PAGE_ENTITY}Form`}>
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
