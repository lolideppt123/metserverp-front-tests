import axiosInstance from '../../helpers/axios';

import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";
import { Spin, Flex } from 'antd';
import { FiPlus, FiPlusCircle } from 'react-icons/fi';


export default function SalesForm({ config }) {
    const { customer,
        product,
        customerLoad,
        productLoad
    } = config;

    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        clearErrors,
        setValue,
        getValues,
        formState: { errors, isSubmitting, isDirty },
    } = useForm();

    const onAdd = (event, param) => {
        event.preventDefault();
        navigate(`/${param}/add`);
    }

    const onSubmit = async (data) => {
        console.log(data)
        axiosInstance
            .post('sales/', data, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                console.log(response);
                enqueueSnackbar(response.data.message, { variant: 'success' });
                reset();
                history.back();
            })
            .catch((err) => {
                console.log(err);
                setError(`${err.response.data.label}`, {
                    type: "manual",
                    message: `${err.response.data.message}`
                })
            })
    }

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
                // console.log(response);
                clearErrors('sales_quantity');
                if (response.data[0] !== undefined) {
                    setValue('unit_cost', response.data[0].unit_cost) // Set value for unit_cost field
                    setValue('total_cost', getValues('unit_cost') * sales_quantity) // Set value for total_cost field
                }
            })
            .catch((err) => {
                console.log(err);
                setError(`${err.response.data.label}`, {
                    type: "manual",
                    message: `${err.response.data.message}`
                })
            })
    }

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
                    <form id='addProductForm' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-7">
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
                                    <div className='flex-fill mb-2'>
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
                                </div>

                                <div className="form-group mb-2">
                                    <label htmlFor="customer" className="text-md text-gray-500">Customer</label>
                                    <div className="input-group">
                                        <select className="form-select form-select-sm" autoComplete='off' id='customer' {...register("customer", { required: "Product Name is required", maxLength: { value: 100 } })} >
                                            {customer.length != undefined ? (
                                                <>
                                                    <option value="">Choose...</option>
                                                    {customer.map((item, index) => (
                                                        <option value={item.company_name} key={index}>{item.company_name}</option>
                                                    ))}
                                                </>
                                            ) : (
                                                <option value="">Choose...</option>
                                            )}
                                        </select>
                                        <button className='btn' onClick={(event) => onAdd(event, 'customers')} style={{ backgroundColor: "rgb(115, 219, 125)" }} tabIndex={-1}><FiPlusCircle className='input-group' style={{ height: '20px', width: '20px' }} /></button>
                                    </div>
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
                                            {product.length != undefined ? (
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
                                        <button className='btn' onClick={(event) => onAdd(event, 'products')} style={{ backgroundColor: "rgb(115, 219, 125)" }} tabIndex={-1}><FiPlusCircle className='input-group' style={{ height: '20px', width: '20px' }} /></button>
                                    </div>
                                    {errors.product_name && (<p className='text-danger px-1 mt-1 mb-1' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.product_name.message}</p>)}
                                </div>

                                <div className="d-flex gap-3">

                                    <div className="flex-fill mb-2">
                                        <label htmlFor="sales_quantity" className="text-md text-gray-500">Quantity</label>
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='sales_quantity' min={0} step="0.01"
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
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='unit_cost' step="0.000001"
                                            {...register("unit_cost", {
                                                required: "Quantity",
                                                valueAsNumber: true,
                                            }
                                            )} />
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="total_cost" className="text-md text-gray-500">Total Cost</label>
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='total_cost' step="0.000001"
                                            {...register("total_cost", {
                                                required: "Quantity",
                                                valueAsNumber: true
                                            }
                                            )} />
                                    </div>
                                </div>

                                <div className="d-flex gap-3">
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="unit_price" className="text-md text-gray-500">Unit Price</label>
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='unit_price' min={0} step="0.000001"
                                            {...register("unit_price", {
                                                required: "Unit Price is required",
                                                valueAsNumber: true,
                                                min: 1,
                                                onChange: (e) => setValue("total_price", (e.target.value * getValues("sales_quantity")))
                                            }
                                            )} />
                                        {errors.unit_price && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.unit_price.message}</p>)}
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="total_price" className="text-md text-gray-500">Total Selling Price</label>
                                        <input type="number" className={`form-control form-control-sm`} autoComplete='off' id='total_price' min={0} step="0.000001" {...register("total_price", { required: "Quantity", valueAsNumber: true })} />
                                    </div>

                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className='flex-fill mb-2'>
                                    <label htmlFor="sales_paid_date">Date Paid</label>
                                    <input type="date" className="form-control form-control-sm" id='sales_paid_date' {...register("sales_paid_date", { required: (getValues('sales_status') == 'PAID' ? "If status is PAID, date paid is required" : false) })} />
                                    {errors.sales_paid_date && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_paid_date.message}</p>)}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="sales_note">Note</label>
                                    <textarea className="form-control form-control-sm" rows="5" cols="50" style={{ resize: 'none' }} id='sales_note'
                                        {
                                        ...register("sales_note")
                                        }>

                                    </textarea>
                                </div>
                            </div>
                        </div>
                    </form >
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                        <button className='btn btn-primary col-2' form='addProductForm' disabled={isSubmitting || !isDirty || errors.sales_quantity}><FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />Save</button>
                        <button className='btn btn btn-outline-secondary'>Cancel</button>
                    </div>
                </>
            )}
        </div >
    )
}
