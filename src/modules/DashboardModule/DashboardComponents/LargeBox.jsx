import { useEffect, useState } from "react";
import Spinner from "../../../components/Fallback/Spinner";
import { Table } from "antd";
import { useSelector } from "react-redux";
import { selectDrawerPlatform } from "../../../features/drawer/drawerSlice";

export default function LargeBox({ data, loading }) {
    const { isMobile } = useSelector(selectDrawerPlatform);
    const [newDataColumn, setNewDataColumn] = useState([]);

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
                return (
                    <div className="d-flex justify-content-center">
                        <span style={{ fontSize: '12px' }} className={`badge bg-${record.color} p-2 fw-semibold`}>{text}</span>
                    </div>
                );
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
    console.log(data.data)
    useEffect(() => {
        console.log(isMobile)
        if (isMobile) {
            setNewDataColumn([
                {
                    title: <div className={`fs-md fw-semibold text-start`}>Name</div>,
                    key: "name",
                    dataIndex: "name",
                    render: (text, record) => {
                        return (
                            <div className='fs-md fw-semibold text-wrap'>
                                {text}
                            </div>
                        );
                    },
                },
                {
                    title: <div className={`fs-md fw-semibold text-start`}>Stock</div>,
                    key: "stock_left",
                    dataIndex: "stock_left",
                    render: (text, record) => {
                        return (
                            <div className="d-flex justify-content-center">
                                    <span style={{ fontSize: '12px' }} className={`badge bg-${record.color} p-2 fw-semibold`}>{text}</span>
                            </div>
                        );
                    },
                },
            ])
        }
        else {
            setNewDataColumn(dataTableColumn);
        }
    }, [isMobile])

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
                                columns={newDataColumn}
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
