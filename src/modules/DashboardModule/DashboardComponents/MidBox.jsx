import { Progress } from "antd";
import Spinner from "../../../components/Fallback/Spinner";

export default function MidBox({ data, loading }) {
    return (
        <div className="box box-mid">
            <div className="card text-center">
                <h6 className="card-header">{data?.title}</h6>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="card-body">
                            <div className="d-flex flex-row justify-content-between">
                                <div className='fs-md fw-semibold'>Paid</div>
                                <div className='fs-md fw-semibold'>{data?.paid_percent ? data.paid_percent : '0'}%</div>
                            </div>
                            <Progress showInfo={false} strokeColor={'#95de64'} percent={data?.paid_percent ? data.paid_percent : '0'} />
                        </div>
                        <div className="card-body pt-0">
                            <div className="d-flex flex-row justify-content-between">
                                <div className='fs-md fw-semibold'>Unpaid</div>
                                <div className='fs-md fw-semibold'>{data?.unpaid_percent ? data.unpaid_percent : '0'}%</div>
                            </div>
                            <Progress showInfo={false} strokeColor={'#ffa940'} percent={data?.unpaid_percent ? data.unpaid_percent : '0'} />
                        </div>
                        <div className="card-body pt-0">
                            <div className="d-flex flex-row justify-content-between">
                                <div className='fs-md fw-semibold'>Returned</div>
                                <div className='fs-md fw-semibold'>{data?.returned ? data.returned : '0'}%</div>
                            </div>
                            <Progress showInfo={false} strokeColor={'#ff4d4f'} percent={data?.returned ? data.returned : '0'} />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
