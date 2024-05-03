import { Progress } from "antd";
import Spinner from "../../../components/Fallback/Spinner";
import { Table } from "antd";

export default function LargeBox({ data, loading }) {
    const dataTableColumn = [
        {
            title: 'Name',
            key: 'name',
            dataIndex: 'name',
            render: (text, record) => {
                return <div className='fs-md fw-semibold'>{text}</div>
            }
        },
        {
            title: 'Stock',
            key: 'stock_left',
            dataIndex: 'stock_left',
            render: (text, record) => {
                return <>{<span style={{ fontSize: '12px' }} className={`badge bg-${record.color} p-2 fw-semibold`}>{text}</span>}</>
            }
        },
        {
            title: 'Unit',
            key: 'unit',
            dataIndex: 'unit',
            render: (text, record) => {
                return <div className='fs-md fw-semibold text-uppercase'>{text}</div>
            }
        },
    ]
    return (
        <div className="box box-large">
            <div className="card text-center">
                <h6 className="card-header">{data?.title}</h6>
                {loading ? (
                    <Spinner />
                ) : (
                    <>
                        <div className="card-body">
                            <Table
                                columns={dataTableColumn}
                                rowKey={data => data.name}
                                dataSource={data.data}
                                pagination={{
                                    pageSize: 5,
                                }}
                            />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}
