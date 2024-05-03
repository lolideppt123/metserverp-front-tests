import dayjs from "dayjs";
import { Tooltip } from "antd";

export default function SalesCardModalTitle({ cardData }) {
    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-2 me-5">
                <div className="d-flex align-items-center m-0">
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
            <div className="d-flex flex-column me-5 mb-2">
                <span className="h5 m-0">
                    {cardData?.customer?.substr(0, 25)}{cardData?.customer?.length > 25 ? (
                        <Tooltip className="pointer" title={cardData.customer}>{'\u2026'}</Tooltip>
                    ) : (
                        <></>
                    )}
                </span>
            </div>
            <div className="d-flex flex-column me-5">
                <span className="h6 fw-semibold m-0">
                    {cardData?.product_name?.substr(0, 17)}{cardData?.product_name?.length > 17 ? (
                        <Tooltip className="pointer" title={cardData.product_name}>{'\u2026'}</Tooltip>
                    ) : (
                        <></>
                    )}
                </span>
            </div>
        </>
    )
}
