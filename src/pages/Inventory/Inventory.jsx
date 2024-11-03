import { useEffect, useState, memo } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import GetStartedTemplate from '../../components/Fallback/GetStartedTemplate';

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import InventoryDataTable from '../../modules/InventoryModule/InventoryDataTable';
import dayjs from "dayjs";
import RenderText from '../../components/Tooltip/RenderText';
import { NumberFormatter } from '../../settings/MoneyFormatter';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectDrawerPlatform } from '../../features/drawer/drawerSlice';
import { Tooltip } from 'antd';

const Inventory = () => {
    const { isMobile } = useSelector(selectDrawerPlatform);
    const { loading, response: data, error, axiosFetch } = useAxiosFunction();
    const [newDataColumn, setNewDataColumn] = useState([]);
    const [tableWidth, setTableWidth] = useState(null);
    const Labels = {
        BASE_ENTITY: 'Inventory',
        TABLE_TITLE: 'Product Inventory',
        ADD_NEW_ENTITY: 'Add New Inventory',
        NEW_ENTITY_URL: 'inventory/product/add',
    }

    const dataTableColumn = [
        {
            title: <div className="fs-md fw-semibold text-center">Last Order</div>,
            key: 'orderedDate',
            dataIndex: "last_ordered_date",
            width: 125,
            render: (date, record) => {
                return (
                    <div className={`fs-md fw-semibold text-center`}>
                        {dayjs(date).format("MMM DD, YYYY")}
                    </div>
                );
            },
        },
        {
            title: <div className={`fs-md fw-semibold text-center`}>Product Name</div>,
            key: "productName",
            dataIndex: "product_name",
            fixed: "left",
            width: 250,
            render: (text, record) => {
                return (
                    <div className={`fs-md fw-semibold text-uppercase text-center`}>
                        <NavLink to={`transaction/${record.product_pk}/${encodeURIComponent(record.product_name)}`}>
                            {<RenderText text={text} maxLength={20} />}
                        </NavLink>
                    </div>
                );
            },
        },
        {
            title: <div className="fs-md fw-semibold text-center">Current Stock</div>,
            key: 'currentStock',
            dataIndex: "stock_left",
            width: 175,
            render: (text, record) => {
                return (
                    <div className="progress" style={{ height: "20px", border: "1px solid grey" }}>
                        <div className={`progress-bar bg-${record.color} bg-gradient`} role="progressbar" style={{ width: record.width }}>
                            <span><NumberFormatter amount={record.total_inventory} /></span>
                        </div>
                    </div>
                );
            },
        },
        {
            title: <div className="fs-md fw-semibold text-center">Unit Price</div>,
            key: 'unitPrice',
            dataIndex: "unit_price",
            width: 200,
            render: (text, record) => {
                return (
                    <div className={`fs-md fw-semibold text-uppercase text-center`}>
                        ${<NumberFormatter amount={text} />} | {record.stock_left}
                    </div>
                );
            },
        },
        // {
        //     title: <div className="fs-md fw-semibold text-center">Unit</div>,
        //     key: 'productUnit',
        //     dataIndex: "product_unit",
        //     render: (text, record) => {
        //         return (
        //             <div className={`fs-md fw-semibold text-uppercase text-center`}>
        //                 {text}
        //             </div>
        //         );
        //     },

        // },
        // {
        //     title: 'Last Order',
        //     key: 'orderedDate'
        // },
        {
            title: <div className="fs-md fw-semibold text-center">Updated</div>,
            key: 'orderUpdate',
            dataIndex: "order_update",
            width: 125,
            render: (text, record) => {
                return (
                    <div className={`fs-md fw-semibold text-center`}>
                        {dayjs(text).format("MMM DD, YYYY")}
                    </div>
                );
            },
        },
    ]

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            await axiosFetch({
                url: 'inventory/products/',
                method: 'get'
            });
        }
        getData();
    }, [])

    useEffect(() => {

        if (isMobile) {
            setNewDataColumn([
                {
                    title: <div className={`fs-md fw-semibold text-start`}>Product Name</div>,
                    key: "productName",
                    dataIndex: "product_name",
                    // fixed: "left",
                    // width: 100,
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
                {
                    title: <div className="fs-md fw-semibold text-center"></div>,
                    key: 'currentStock',
                    dataIndex: "stock_left",
                    width: 125,
                    render: (text, record) => {
                        return (
                            <>
                                <div className="fs-md fw-semibold text-uppercase text-end">
                                    <Tooltip className='pointer' title={
                                        <>
                                            <NumberFormatter amount={record.total_inventory} /> {record.product_unit}
                                        </>
                                    }>
                                        <span style={{ fontSize: '13px', padding: '8px 14px' }} className={`badge bg-${record.color} fw-semibold bg-gradient`}>
                                            <NumberFormatter amount={record.total_inventory} />
                                        </span>
                                    </Tooltip>
                                </div>
                                <div className="text-end mt-1 fw-semibold" style={{ fontSize: '12px' }}>
                                    ${<NumberFormatter amount={record.unit_price} />} | {record.stock_left}
                                </div>
                            </>
                        );
                    },
                },
            ])
            setTableWidth("max-content");
        }
        else {
            setNewDataColumn(dataTableColumn);
            setTableWidth(null);
        }

    }, [isMobile])

    console.log(data);

    const config = {
        newDataColumn,
        Labels,
        data,
        loading,
        error,
        tableWidth,
    }
    return (
        <>
            <DataTablePageHeader Labels={Labels} />
            {
                loading ?
                    (
                        <Spinner />
                    ) : (
                        error ?
                            (
                                <NoServerResponse error={error} />
                            ) : (
                                data?.length == 0 ? (
                                    <GetStartedTemplate
                                        entity={'Product Inventory'}
                                        customizedStatement=
                                        {
                                            <>
                                                <p>Now that you added your Product Inventory.</p>
                                                <p>You can now add items to your Sales.</p>
                                            </>
                                        }
                                    />
                                ) : (
                                    <InventoryDataTable config={config} />
                                )
                            )
                    )
            }
        </>

    )
}

export default memo(Inventory)