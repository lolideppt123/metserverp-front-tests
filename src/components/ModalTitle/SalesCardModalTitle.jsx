import dayjs from "dayjs";
import RenderText from "../Tooltip/RenderText";

export default function SalesCardModalTitle({ cardData }) {
    return (
        <div className="d-flex align-items-center justify-content-between mb-2 me-5">
            <div className="d-flex align-items-center m-0">
                <span className="h5 m-0 me-2">
                    <RenderText text={cardData?.customer} maxLength={25} />
                </span>
                <span className={` px-1 py-1 ${cardData?.sales_status == "PAID" ? "paid" : "unpaid"}-status`} style={{ fontSize: '14px' }}>
                    {cardData?.sales_status}
                </span>
            </div>
            <div className="d-flex align-items-center justify-content-end">
                <span className="h5 m-0">
                    {dayjs(cardData?.sales_date).format("MMM DD, YYYY")}
                </span>
            </div>
        </div>
    )
}
