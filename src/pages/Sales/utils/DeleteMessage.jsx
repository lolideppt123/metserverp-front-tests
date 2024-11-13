import dayjs from "dayjs";
import { NumberFormatter } from "../../../settings/MoneyFormatter";
import RenderText from "../../../components/Tooltip/RenderText";

const DeleteMessage = ({record}) => {
    return (
        <div className="d-flex flex-column mb-4">
            <h6 className="text-center h6-text-danger mb-3">You are about to delete a Sales record.</h6>
            <div className="card card-body">
                <div className="d-flex justify-content-between">
                    <p className="mb-0 text-muted">
                        <span className="h6 pe-1">
                            Invoice:
                        </span>
                        <span className=''>
                            <RenderText text={record?.sales_invoice} maxLength={12} />
                        </span>
                    </p>
                    <p className="mb-0 text-muted">
                        <span className="h6 pe-1">
                            Date:
                        </span>
                        <span className=''>
                            {dayjs(record?.sales_date).format("MMM DD, YYYY") || "NO DATE"}
                        </span>
                    </p>
                </div>
                <p className=" mb-0 text-muted">
                    <span className="h6 pe-1">
                            Product: 
                    </span>
                    <span className=''>
                        <RenderText text={record?.product_name} maxLength={24} />
                    </span>
                </p>
                <p className=" mb-0 text-muted">
                <span className="h6 pe-1">
                    Customer:
                </span>
                <span className=''>
                    <RenderText text={record?.customer} maxLength={24} />
                </span>
                </p>

                <p className=" mb-0 text-muted">
                <span className="h6 pe-1">
                    Quantity:
                </span>
                <span className=''>
                    <NumberFormatter amount={record?.sales_quantity} />
                </span>
                </p>
            </div>
        </div>
    )
};

export {DeleteMessage};