import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';


import CreatableSelect from 'react-select/creatable';
import Spinner from '../../components/Fallback/Spinner';
import MoneyFormatter, { NumberFormatter } from '../../settings/MoneyFormatter';
import { Divider, message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { FiPlus } from 'react-icons/fi';
import axiosInstance from '../../helpers/axios';
import { useUpdateSalesOrderStatusMutation } from '../../features/sales/salesOrderApiSlice';
import { useSnackbar } from 'notistack';


function SalesOrderEditForm({config}) {
    const { Labels, data, isLoading, id } = config;

    // Redux
    const [updateInvoice] = useUpdateSalesOrderStatusMutation();
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();

    const [FormLoading, setFormLoading] = useState(false);


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
        formState: { errors, isSubmitting, isDirty, isValid }
    } = useForm({
        mode: 'onBlur',
        defaultValues: {
            id: id,
            sales_dr: data?.sales[0]?.sales_dr || "",
            sales_invoice: data?.sales_invoice || "",
            sales_date: data?.sales[0]?.sales_date  || "",
            invoice_status: data?.invoice_status || "UNPAID",
            invoice_paid_date: dayjs(data?.invoice_paid_date).format("YYYY-MM-DD") || ""
        }
    });

    const onSubmit = (data) => {
        setFormLoading(true);

        console.log("FOrm Data: ", data);

        let paid_date = dayjs(data.invoice_paid_date).isValid();
        let isPaid = data.invoice_status === "PAID";

        if(isPaid && !paid_date) {
            formSetError('invoice_status', {type: 'custom', message: 'Enter a valid date'});
            setFormLoading(false); // Stop loading if there’s an error
            return;
        } 
        else if(!isPaid) {
            data.invoice_paid_date = "";
        }

        let message = "";
        let variant = "";

        setTimeout( async () => {
            try {
                const response = await updateInvoice(data).unwrap();
                message = response?.message;
                variant = "success";
            }
            catch (err) {
                console.log("Adding sales error: ", err);
                message = err?.data?.message || `${err?.status} Code: ${err?.originalStatus || "Call Master Joseph"}` || "An error occurred";
                variant = "error";
            }
            finally {
                enqueueSnackbar(message, {variant: variant, autoHideDuration: 5000});
                setFormLoading(false);
                navigate(-1);
            }
        }, 1500); 
    }

    const checkInvoice = async () => {
        let invoice = getValues('sales_invoice');
        let invoiceCurrent = data.sales_invoice;
        let triggerCheck = invoiceCurrent === invoice;

        // Trigger check only if changed
        if(!triggerCheck) {
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
    };
    
    const invoiceStatus = watch('invoice_status');

  return (
    <div className="container pt-3">
        {isLoading ? (
            <Spinner />
        ) : (
            <>
                <form id={`updateOrderForm`} onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-md-6 border-end border-secondary">

                            {/* DR Invoice */}
                            <div className="d-flex gap-3">
                                <div className="flex-fill mb-2">
                                    <label htmlFor="sales_dr" className="text-md text-gray-500">Delivery Receipt</label>
                                    {/* <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='sales_dr' placeholder='0000' {...register("sales_dr", { maxLength: 10 })} /> */}
                                    <span className="form-control form-control-sm bg-secondary">
                                        {data?.sales[0]?.sales_dr}
                                    </span>
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
                            </div>
                            {errors?.sales_invoice && (<p className='text-danger px-1 mt-1 mb-2 text-center' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.sales_invoice.message}</p>)}


                            {/* Sales Date Field */}
                            <div className="form-group mb-2">
                                <label htmlFor="sales_date">Date</label>
                                <span className="form-control form-control-sm bg-secondary">
                                    {data?.sales[0]?.sales_date}
                                </span>
                            </div>

                            {/* Date Paid & Status Field */}
                            <div className="d-flex gap-3">
                                {/* Date Field */}
                                <div className="flex-fill mb-2">
                                    <label htmlFor="payment_date">Payment</label>
                                    <input 
                                        type="date" 
                                        className="form-control form-control-sm"
                                        id='payment_date'
                                        // value={Paydate == null ? "" : Paydate} 
                                        // onChange={(e) => setPaydate(e.target.value)}
                                        {...register('invoice_paid_date', {
                                            required: invoiceStatus === 'PAID'
                                        })}
                                    />
                                </div>
                                {/* Status Field */}
                                <div className="flex-fill mb-2">
                                    <label htmlFor="sales_date">Status</label>
                                    <select 
                                        className='form-select form-select-sm' 
                                        autoComplete='off'
                                        id='invoice_status'
                                        style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        {
                                            ...register('invoice_status')
                                        }
                                    >
                                        <option value={"PAID"}>PAID</option>
                                        <option value={"UNPAID"}>UNPAID</option>
                                    </select>
                                </div>
                            </div>
                            {errors?.invoice_status && (<p className='text-danger px-1 mt-1 mb-2 text-center' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.invoice_status.message}</p>)}

                            <div className="form-group mb-2">
                                <label htmlFor="customer" className="text-md text-gray-500">Customer{errors.customer && (<span className='text-danger fw-semibold'>{errors.customer.message}</span>)}</label>
                                <span className="form-control form-control-sm bg-secondary">
                                    {data?.sales[0].customer}
                                </span>                                
                            </div>

                            {/* Products Fields */}
                            <div className="form-group">
                                <label htmlFor="product_name" className="text-md text-gray-500">Product</label>
                            </div>
                            {
                                data?.sales?.map((item, index) => (
                                    <div key={index} className="form-group mb-2">
                                        <div className="d-flex gap-3">
                                            <div className="flex-fill mb-2" style={{ width: '60%' }}>
                                                <span className="form-control form-control-sm bg-secondary">
                                                    {item.product_name}
                                                </span>
                                            </div>
                                            <div className="flex-fill mb-2" style={{ width: '25%' }}>
                                                <span className="form-control form-control-sm bg-secondary text-end">
                                                    {<NumberFormatter amount={item.sales_quantity} />}
                                                </span>
                                            </div>
                                            <div className="flex-fill mb-2" style={{ width: '35%' }}>
                                                <span className="form-control form-control-sm bg-secondary text-end">
                                                    {<MoneyFormatter amount={item.sales_unit_price} />}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }


                            <Divider style={{marginTop: 15}} />


                        </div>
                    </div>
                </form>

                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                    <button
                        type='submit'
                        className='btn btn-primary col-2' 
                        form={`updateOrderForm`} 
                        disabled={ !isDirty || !isValid}>
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
                    <button type='button' onClick={() => navigate(-1)} className='btn btn btn-outline-secondary'>Cancel</button>
                </div>
            </>
        )}
    </div>
  )
}

export default SalesOrderEditForm;