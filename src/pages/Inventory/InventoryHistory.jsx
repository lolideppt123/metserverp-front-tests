import dayjs from 'dayjs';
import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import { Tooltip } from 'antd';
import { PiPlusMinusBold } from "react-icons/pi";

import MoneyFormatter, { NumberFormatter } from '../../settings/MoneyFormatter';
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';
import DropDown from '../../components/DropDown/DropDown';


export default function InventoryHistory() {
    const { loading, response: data, setResponse: setData, error, axiosFetch: dataFetch } = useAxiosFunction();
    const { product_pk, product_name } = useParams();
    const Labels = {
        PAGE_ENTITY: 'Product Inventory',
        PAGE_ENTITY_URL: 'inventory/products',
        TABLE_TITLE: product_name,
        ADD_NEW_ENTITY: product_name,
        API_URL: `inventory/products/transaction/${product_pk}`
    }
    const dataTableColumn = [
        {
            title: <div className='fs-md fw-bold text-center'>No.</div>,
            key: 'no',
            dataIndex: 'id',
            width: 50,
            render: (text, record, index) => <div className='fs-md fw-semibold text-center'>{index + 1}</div>
        },
        {
            title: <div className='fs-md fw-bold text-center'>Date</div>,
            key: 'date',
            dataIndex: 'transaction_date',
            width: 125,
            render: (date) => {
                return <div className='fs-md fw-semibold text-center'>{dayjs(date).format('MMM DD, YYYY')}</div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Customer/Supplier</div>,
            key: 'custSupp',
            dataIndex: 'cust_supp',
            width: 200,
            render: (text, record) => {
                return (
                    <div className={`fs-md fw-semibold text-uppercase text-wrap text-truncate ${record.type == 'sales' && 'text-danger'}`}>
                        {text.length > 17 ? (
                            <Tooltip className='pointer' title={text}>
                                {text.substr(0, 17)}{text.length > 17 && '\u2026'}
                            </Tooltip>
                        ) : (
                            <>{text}</>
                        )}
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Product</div>,
            key: 'productName',
            dataIndex: 'product_name',
            width: 200,
            render: (text, record) => {
                return (
                    <div className={`fs-md fw-semibold text-uppercase text-truncate ${record.type == 'sales' && 'text-danger'}`}>
                        {text.length > 17 ? (
                            <Tooltip className='pointer' title={text}>
                                {text.substr(0, 17)}{text.length > 17 && '\u2026'}
                            </Tooltip>
                        ) : (
                            <>{text}</>
                        )}
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Quantity <PiPlusMinusBold /></div>,
            key: 'quantity',
            dataIndex: 'quantity',
            render: (text, record) => {
                return (
                    <div className={`fs-md fw-semibold text-center ${record.type == 'sales' && 'text-danger'}`}>
                        {text}
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Stock</div>,
            key: 'stock',
            dataIndex: 'stock',
            render: (stock) => {
                return (
                    <div className="fw-semibold text-center">
                        {stock ? <NumberFormatter amount={stock} /> : '---'}
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>U/Cost</div>,
            key: 'uCost',
            dataIndex: 'u_cost',
            render: (cost, record) => {
                return (
                    <div className={`fw-semibold text-center ${record.type == "sales" && 'text-danger'}`}>
                        <MoneyFormatter amount={cost} />
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>U/Prce</div>,
            key: 'uPrice',
            dataIndex: 'u_price',
            render: (price, record) => {
                return (
                    <>
                        {record.type !== "sales" ? (
                            <div className="fw-semibold text-center">
                                ---
                            </div>
                        ) : (
                            <div className="fw-semibold text-center text-success">
                                {record.u_price > record.u_cost ?
                                    <MoneyFormatter amount={record.u_price} /> :
                                    <>(<MoneyFormatter amount={record.u_price} />)</>
                                }
                            </div>
                        )}
                    </>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Balance</div>,
            key: 'balance',
            dataIndex: 'running_quantity',
            render: (text, record) => {
                return <div className='fs-md fw-semibold text-center'><NumberFormatter amount={text} /></div>
            }
        },
        {
            title: '',
            key: 'actions',
            dataIndex: ['pk', 'type'],
            width: 50,
            render: (text, record, index) => {
                return (
                    <>
                        {record.type == 'inv' && (
                            <div className='px-auto'>
                                <DropDown
                                    link2={`/inventory/products/transaction/${record.id}/edit`}
                                    deleteConfig={{
                                        link3: `inventory/transaction/${record.id}/edit`,
                                        message: `${record?.product_name?.substr(0, 12)}${record?.product_name?.length > 12 ? '\u2026' : ""} : Record ${index + 1}`,
                                        notAllowed: false,
                                        api_url: Labels.API_URL,
                                        setData: (data) => setData(data)
                                    }}
                                />
                            </div>
                        )}
                    </>
                )
            }
        },
    ]

    useEffect(() => {
        const configObj = {
            url: `${Labels.API_URL}`,
            method: `get`,
        }
        dataFetch(configObj);
    }, [])

    const config = {
        Labels,
        dataTableColumn,
        data,
        loading,
        error,
        setData
    }

    return (
        <>
            <AddFormPageHeader config={config} />
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
                                    // <Spinner />
                                    <div className="py-4">
                                        <h6 className="text-center px-3 mt-4 mb-1"><i>No Results Found</i></h6>
                                    </div>
                                ) : (
                                    // <InventoryHistoryDataTable config={config} />
                                    <CompanyDataTable config={config} />
                                )
                            )
                    )
            }
        </>

    )
}
