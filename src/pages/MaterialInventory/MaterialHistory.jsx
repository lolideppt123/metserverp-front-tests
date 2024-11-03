import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import { PiPlusMinusBold } from "react-icons/pi";

import DropDown from '../../components/DropDown/DropDown';
import dayjs from 'dayjs';
import MoneyFormatter, { NumberFormatter } from '../../settings/MoneyFormatter';
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';
import { Tooltip } from 'antd';

export default function MaterialHistory() {
    const { material_name } = useParams();
    const Labels = {
        PAGE_ENTITY: 'Material Inventory',
        PAGE_ENTITY_URL: 'inventory/materials',
        TABLE_TITLE: material_name,
        ADD_NEW_ENTITY: material_name,
        API_URL: `inventory/materials/transaction/${material_name}`
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
            render: (date, record) => {
                return <div className='fs-md fw-semibold text-center'>{dayjs(date).format('MMM DD, YYYY')}</div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Supplier</div>,
            key: 'supplier',
            dataIndex: 'supplier',
            width: 200,
            render: (text, record) => {
                return <div className='fs-md fw-semibold text-uppercase'>
                    {text.length > 17 ? (
                        <Tooltip className='pointer' title={text}>
                            {text.substr(0, 17)}{text.length > 17 && '\u2026'}
                        </Tooltip>
                    ) : (
                        <>{text}</>
                    )}
                </div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Product</div>,
            key: 'product',
            dataIndex: 'product',
            width: 200,
            render: (text, record) => {
                return (
                    <div className={`fs-md fw-semibold text-uppercase ${record.type == 'prod' && 'text-danger'}`}>
                        {record.type == 'prod' ? (
                            <>
                                {record?.product > 17 ? (
                                    <Tooltip className='pointer' title={record?.product}>
                                        {record?.product?.substr(0, 17)}{record?.product?.length > 17 && '\u2026'}
                                    </Tooltip>
                                ) : (
                                    <>{record?.product}</>
                                )}
                            </>
                        ) : (
                            <>
                                {record?.material > 17 ? (
                                    <Tooltip className='pointer' title={record?.material}>
                                        {record?.material.substr(0, 17)}{record?.material?.length > 17 && '\u2026'}
                                    </Tooltip>
                                ) : (
                                    <>{record?.material}</>
                                )}
                            </>
                        )}
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Quantity <PiPlusMinusBold /></div>,
            key: 'quantity',
            dataIndex: 'quantity',
            // width: 125,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-center ${record.type == 'prod' && 'text-danger'}`}><NumberFormatter amount={text} /></div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Stock</div>,
            key: 'stock',
            dataIndex: 'stock',
            render: (text, record) => (
                <>
                    {record.type == "prod" ? (<div className="fw-semibold text-center">---</div>) : (
                        <div className="fw-semibold text-center"><NumberFormatter amount={record.stock} /></div>
                    )}
                </>
            )
        },
        {
            title: <div className='fs-md fw-bold text-center'>U/Cost</div>,
            key: 'uCost',
            dataIndex: 'uprice',
            // width: 125,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-center ${record.type == 'prod' && 'text-danger'}`}><MoneyFormatter amount={text} /></div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Balance</div>,
            key: 'balance',
            dataIndex: 'running_total',
            // width: 125,
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
                        {record.type == 'mat' && (
                            <div className='px-auto'>
                                <DropDown
                                    link2={`/inventory/materials/transaction/${record.inv_id}/edit`}
                                    deleteConfig={{
                                        link3: `inventory/materials/${record.inv_id}`,
                                        message: `${record?.material?.substr(0, 12)}${record?.material?.length > 12 ? '\u2026' : ""} : Record ${index + 1}`,
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
    const { loading, response: data, setResponse: setData, error, axiosFetch: dataFetch } = useAxiosFunction();
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
                                    <Spinner />
                                ) : (
                                    // <MaterialHistoryDataTable config={config} />
                                    <CompanyDataTable config={config} />
                                )
                            )
                    )
            }
        </>
    )
}
