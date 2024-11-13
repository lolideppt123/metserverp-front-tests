import { useParams } from 'react-router-dom';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import { PiPlusMinusBold } from "react-icons/pi";

import DropDown from '../../components/DropDown/DropDown';
import dayjs from 'dayjs';
import MoneyFormatter, { NumberFormatter } from '../../settings/MoneyFormatter';
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';
import { useGetInventoryMaterialHistoryQuery } from '../../features/inventory/materialInventoryApiSlice';
import RenderText from '../../components/Tooltip/RenderText';
import { DeleteMessage as MaterialMessage } from './utils/DeleteMessage';
import { DeleteMessage as InventoryMessage } from '../Inventory/utils/DeleteMessage';

export default function MaterialHistory() {
    const { material_pk, material_name } = useParams();
    const Labels = {
        PAGE_ENTITY: 'Material Inventory',
        PAGE_ENTITY_URL: 'inventory/materials',
        TABLE_TITLE: material_name,
        ADD_NEW_ENTITY: material_name,
        API_URL: `inventory/materials/transaction/${material_name}`
    }

    // Redux
    const { data, isError, error, isLoading, isSuccess} = useGetInventoryMaterialHistoryQuery(material_pk);
    console.log(material_pk);

    const dataTableColumn = [
        {
            title: <div className='fs-md fw-bold text-center'>Id</div>,
            key: 'no',
            dataIndex: 'id',
            width: 50,
            render: (text, record, index) => (
                <div className='fs-md fw-semibold text-center'>
                    { record.transaction_type === 'restock' ? (record.id) : ("--")}
                </div>
            )
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
                return (
                    <div className='fs-md fw-semibold text-uppercase'>
                        <RenderText text={record.supplier} maxLength={17} />
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Product</div>,
            key: 'product',
            dataIndex: 'product',
            width: 200,
            render: (text, record) => {
                return (
                    <div className={`fs-md fw-semibold text-uppercase ${record.transaction_type == 'production' && 'text-success'}`}>
                        {record.transaction_type == 'production' ? (
                            <RenderText text={record?.product?.product_name} maxLength={17} />
                        ) : (
                            <div className="text-center">
                                ---
                            </div>
                        )}
                    </div>
                )
            }
        },
                {
            title: <div className='fs-md fw-bold text-center'>Material Id Used</div>,
            key: 'materialUsed',
            dataIndex: 'materialUsed',
            render: (text, record) => {
                return (
                    <div className={`fs-md fw-semibold text-center text-uppercase ${record.transaction_type == 'production' && 'text-danger'}`}>
                        {record.transaction_type == 'production' ? (
                            record?.material?.pk
                        ) : ("--")}
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
                return (
                    <div 
                        className={`fs-md fw-semibold text-center ${record.transaction_type == 'production' && 'text-danger'}`}
                        >
                        <NumberFormatter amount={record.quantity} />
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Stock</div>,
            key: 'stock',
            dataIndex: 'stock',
            render: (text, record) => (
                <>
                    {record.transaction_type == "production" ? (
                            <div className="fw-semibold text-center text-success">
                                {record?.product?.product_stock_left || 0}
                            </div>
                        ) : (
                            <div className="fw-semibold text-center"><NumberFormatter amount={record.stock} /></div>
                    )}
                </>
            )
        },
        {
            title: <div className='fs-md fw-bold text-center'>Cost</div>,
            key: 'uCost',
            dataIndex: 'uprice',
            // width: 125,
            render: (text, record) => {
                return (
                    <div className={`fs-md fw-semibold text-center ${record.transaction_type == 'production' && 'text-danger'}`}>
                        {record.transaction_type === 'production' ? (
                            <MoneyFormatter amount={record?.product?.product_cost} />
                        ) : (
                            <MoneyFormatter amount={record.unit_cost} />
                        )}
                    </div>
                )
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
            fixed: 'right',
            render: (text, record, index) => {
                return (
                    <div className='px-auto'>
                        {record.transaction_type === 'restock' ? (
                            
                            <DropDown
                                showConfig={{
                                    disabled: true
                                }}
                                editConfig={{
                                    // this path goes to react page url
                                    editLink: `/inventory/materials/transaction/${record.id}/edit`,
                                    disabled: false
                                }}
                                deleteConfig={{
                                    disabled: false,
                                    component: "material-inventory",
                                    message: <MaterialMessage record={record} />,
                                    recordID: record.id, // material_inv id
                                }}
                            />

                        ): (
                            <DropDown
                                showConfig={{
                                    disabled: true
                                }}
                                editConfig={{
                                    // this path goes to react page url
                                    editLink: `/inventory/products/transaction/${record?.id}/edit`,
                                    disabled: false
                                }}
                                deleteConfig={{
                                    disabled: false,
                                    component: "inventory",
                                    message: <InventoryMessage record={record} />,
                                    recordID: record.id, // material_inv id
                                }}
                            />
                        )}
                    </div>
                )
            }
        },
    ];

    const config = {
        Labels,
        dataTableColumn,
        data,
        isLoading,
        error,
    }

    console.log(data);

    return (
        <>
            <AddFormPageHeader config={config} />
            {
                isLoading ?
                    (
                        <Spinner />
                    ) : (
                        isError && !isSuccess ?
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
