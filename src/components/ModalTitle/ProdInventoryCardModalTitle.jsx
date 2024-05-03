import dayjs from "dayjs";

export default function ProdInventoryCardModalTitle({ cardData }) {
    return (
        <>
            <div className="d-flex align-items-center justify-content-between mb-2 me-5">
                <div className="d-flex align-items-center m-0">
                    <span className="h5 m-0">{cardData?.product_name == "" ? "####" : cardData?.product_name}</span>
                </div>
                <div className="d-flex align-items-center justify-content-end">
                    <span className="h5 m-0">
                        {dayjs(cardData?.date).format("MMM DD, YYYY")}
                    </span>
                </div>

            </div>
        </>
    )
}

