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
                            <>
                                <div className={`fs-md fw-semibold text-uppercase text-start`} style={{ fontSize: '16px' }}>
                                    <NavLink to={`transaction/${record.product_pk}/${encodeURIComponent(record.product_name)}`}>
                                        {<RenderText text={text} maxLength={20} />}
                                    </NavLink>

                                </div>
                                <div className="text-start mt-1 fw-semibold" style={{ fontSize: '13px' }}>
                                    <span>{record.product_type}</span>
                                </div>
                                <div className="text-start mt-1" style={{ fontSize: '13px' }}>
                                    <span className='fw-semibold'>Last Order: </span>
                                    <span>{dayjs(record.last_ordered_date).format("MMM DD, YYYY")}</span>
                                </div>
                                <div className="text-start mt-1" style={{ fontSize: '13px' }}>
                                    <span className='fw-semibold'>Updated: </span>
                                    <span>{dayjs(record.order_update).format("MMM DD, YYYY")}</span>
                                </div>
                            </>
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
