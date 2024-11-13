import dayjs from "dayjs";
import { NumberFormatter } from "../../../settings/MoneyFormatter";
import RenderText from "../../../components/Tooltip/RenderText";

const DeleteMessage = ({record}) => {
    return (
        <div className="d-flex flex-column mb-4">
            <h6 className="text-center h6-text-danger mb-3">You are about to delete a Material Inventory record.</h6>
            <div className="card card-body">
                <div className="d-flex justify-content-between">
                    <p className="mb-0 text-muted">
                        <span className="h6 pe-1">
                            Record Id:
                        </span>
                        <span className=''>
                            {record?.pk || record?.id || ""}
                        </span>
                    </p>
                    <p className=" mb-0 text-muted">
                        <span className="h6 pe-1">
                                Date: 
                        </span>
                        <span className=''>
                            {dayjs(record?.ordered_date).format("MMM DD, YYYY") || "NO DATE"}
                        </span>
                    </p>
                </div>
                <p className=" mb-0 text-muted">
                    <span className="h6 pe-1">
                            Material: 
                    </span>
                    <span className=''>
                        <RenderText text={record?.material?.material_name} maxLength={24} />
                    </span>
                </p>
                <p className=" mb-0 text-muted">
                    <span className="h6 pe-1">
                            Supplier: 
                    </span>
                    <span className=''>
                        <RenderText text={record?.supplier} maxLength={24} />
                    </span>
                </p>
                <p className=" mb-0 text-muted">
                    <span className="h6 pe-1">
                        Quantity:
                    </span>
                    <span className=' me-1'>
                        <NumberFormatter amount={record?.quantity} />
                    </span>
                    <span>
                        {record?.material?.material_unit_abbv || ""}
                    </span>
                </p>
            </div>
        </div>
    )
}

export {DeleteMessage};