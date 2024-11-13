import { NumberFormatter } from "../../../../settings/MoneyFormatter";
import RenderText from "../../../../components/Tooltip/RenderText";
import dayjs from "dayjs";

const DeleteMessage = ({record}) => {
    return (
        <div className="d-flex flex-column mb-4">
            <h6 className="text-center h6-text-danger mb-3">You are about to delete a Sales Order record.</h6>
            <div className="card card-body">
                <div className="d-flex justify-content-between">
                    <div className="me-2">
                        <p className="mb-0 text-muted">
                            <span className="h6 pe-1">
                                Invoice:
                            </span>
                            <span className=''>
                                <RenderText text={record?.invoice_num} maxLength={12} />
                            </span>
                        </p>
                    </div>
                    <div>
                        <p className=" mb-0 text-muted">
                            <span 
                                style={{ fontSize: '12px' }} 
                                className={`badge  ${record.invoice_status == "PAID" ? "paid-status" : "unpaid-status"}`}
                            >
                                {record?.invoice_status}
                            </span>
                        </p>
                    </div>
                    <p className="flex-fill mb-0 text-muted text-end">
                        <span className="h6 pe-1">
                            Date:
                        </span>
                        <span className=''>
                            {dayjs(record?.invoice_date).format("MMM DD, YYYY") || "NO DATE"}
                        </span>
                    </p>
                </div>
                <div className="d-flex justify-content-between">
                    <p className=" mb-0 text-muted">
                        <span className="h6 pe-1">
                                Customer: 
                        </span>
                        <span className=''>
                            <RenderText text={record?.customer} maxLength={18} />
                        </span>
                    </p>
                    <p 
                        className="mb-0 text-muted" 
                        style={{marginRight: record?.invoice_status === "PAID" ? '' :'1.8rem'}}
                    >
                        <span className="h6 pe-1">
                                Date Paid: 
                        </span>
                        <span>
                            {record?.invoice_status === "PAID" ? (
                                dayjs(record?.invoice_paid_date).format("MMM DD, YYYY")
                            ): (
                                "---"
                            )}
                        </span>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default DeleteMessage;