import { Select, Tooltip } from "antd";
import OnSubmitSpin from '../../components/Fallback/OnSubmitSpin';
import dayjs from "dayjs"
import { useEffect, useState } from "react";
import { FiEdit3, FiCheck, FiSave } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import { useSnackbar } from 'notistack';


export default function InvoiceCardModalTitle({ config }) {
    const { cardData, setData, api_url } = config
    const { axiosFetch: statusUpdate } = useAxiosFunction();
    const { success, setSuccess, response: invoice, axiosFetch: dataFetch } = useAxiosFunction();
    const { enqueueSnackbar } = useSnackbar();

    const options = [
        {
            value: 'UNPAID',
            label: <span style={{ fontSize: '12px' }} className={`badge unpaid-status m-0 fw-bold`}> UNPAID</span>
        },
        {
            value: 'PAID',
            label: <span style={{ fontSize: '12px' }} className={`badge paid-status m-0 fw-bold`}> PAID</span>
        }
    ]
    const [Selected, setSelected] = useState();
    const [Paydate, setPaydate] = useState();
    const [IsEdit, setIsEdit] = useState(false);
    const [IsSaved, setIsSaved] = useState(false);
    const [FormLoading, setFormLoading] = useState(false);

    const onSubmit = () => {
        setFormLoading(true);
        const choices = ['UNPAID', 'PAID']
        const configObj = {
            url: `sales-invoice/${cardData.id}`,
            method: `patch`,
            data: { invoice_status: Selected, pay_date: Selected == "PAID" ? Paydate : null }
        }
        setTimeout(async () => {
            if (choices.includes(Selected) && Paydate !== null) {
                await statusUpdate(configObj);
                await dataFetch({
                    url: `${api_url}`,
                    method: 'get'
                });
                if (Selected == 'UNPAID') {
                    setPaydate(null)
                }
            }
            else {
                setFormLoading(false);
                enqueueSnackbar("Invalid save. Payment Date is required.", { variant: 'error', autoHideDuration: 8000 });
            }
        }, 1500);
    }

    useEffect(() => {
        if (success) {
            setData(invoice);
            setFormLoading(false);
            setSuccess(false);
            setIsSaved(!IsSaved);
            setIsEdit(!IsEdit);
        }
    }, [success])

    useEffect(() => {
        setSelected(cardData.invoice_status)
        setPaydate(cardData.invoice_paid_date ? dayjs(cardData.invoice_paid_date).format('YYYY-MM-DD') : cardData.invoice_paid_date)
    }, [cardData])
    return (
        <>
            <div className="d-flex flex-wrap align-items-center m-0 p-1">
                <span className="h6 fw-semibold m-0">Invoice No:</span>
                <span className="h6 m-0 fw-bold ms-2">
                    {cardData?.invoice_num?.substr(0, 7)}{cardData?.invoice_num?.length > 7 ? (
                        <Tooltip className="pointer" title={cardData.invoice_num}>{'\u2026'}</Tooltip>
                    ) : (
                        <></>
                    )}
                </span>
                <span className="h6 fw-semibold ms-auto m-0">Invoice Date:</span>
                <span className="h6 fw-bold ms-2 text-end m-0 me-4"> {dayjs(cardData.invoice_date).format('MMM DD, YYYY')}</span>
            </div >
            <div className="d-flex flex-wrap align-items-center m-0 p-1 mb-2">
                <span className="h6 fw-semibold m-0">Customer:</span>
                <span className="h6 m-0 fw-semibold ms-2">
                    {cardData?.customer?.substr(0, 15)}{cardData?.customer?.length > 15 ? (
                        <Tooltip className="pointer" title={cardData.customer}>{'\u2026'}</Tooltip>
                    ) : (
                        <></>
                    )}
                </span>
                {FormLoading ? (
                    <NavLink className={`ms-auto`} aria-disabled to="">
                        <OnSubmitSpin spincolor={'var(--bs-indigo-700)'} />
                    </NavLink>
                ) : (
                    IsEdit ? (
                        <NavLink className={`ms-auto`} onClick={() => onSubmit()} to="">
                            <FiSave className="nav-link-icon" />
                        </NavLink>
                    ) : (
                        IsSaved ? (
                            <NavLink className={`ms-auto`} to="" onClick={(e) => e.preventDefault()}>
                                <FiCheck className="nav-link-icon" />
                            </NavLink>
                        ) : (
                            <NavLink className={`ms-auto`} onClick={() => setIsEdit(!IsEdit)} to="">
                                <FiEdit3 className="nav-link-icon" />
                            </NavLink>
                        )
                    )
                )}
                {
                    IsEdit ? (
                        <div style={{ minWidth: '100px' }}>
                            <Select
                                style={{ minWidth: '110px' }}
                                options={options}
                                defaultValue={'UNPAID'}
                                value={Selected}
                                onChange={(value) => setSelected(value)}
                            />
                        </div>
                    ) : (
                        <span style={{ fontSize: '14px' }} className={`badge ${Selected == "PAID" ? "paid-status" : "unpaid-status"} m-0 fw-bold`}> {Selected}</span>
                    )
                }
                <span className="h6 fw-semibold ms-2 m-0">Payment:</span>
                <span className="h6 fw-bold ms-2 text-end m-0 me-4">
                    {Paydate == null || Paydate == "" ? (
                        <input type="date" className="form-control form-control-sm" disabled={!IsEdit} value={Paydate == null ? "" : Paydate} onChange={(e) => setPaydate(e.target.value)} />
                    ) : (
                        IsEdit ? (
                            <input type="date" className="form-control form-control-sm" disabled={!IsEdit} value={Paydate == null ? "" : Paydate} onChange={(e) => setPaydate(e.target.value)} />
                        ) : (
                            dayjs(Paydate).format('MMM DD, YYYY')
                        )
                    )
                    }
                </span>
            </div>
        </>
    )
}
