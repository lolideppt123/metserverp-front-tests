import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import InventoryHistoryDataTable from '../../modules/InventoryModule/InventoryHistoryDataTable';
import { PiPlusMinusBold } from "react-icons/pi";

import MoneyFormatter, { NumberFormatter } from '../../settings/MoneyFormatter';
import DropDown from '../../components/DropDown/DropDown';
import SalesCardModalTitle from '../../components/ModalTitle/SalesCardModalTitle';
import SalesCard from '../../components/Cards/SalesCard';
import { DeleteMessage as SalesMessage } from '../Sales/utils/DeleteMessage';
import { DeleteMessage as InventoryMessage } from './utils/DeleteMessage'
import RenderText from '../../components/Tooltip/RenderText';
import { useGetInventoryProductHistoryQuery } from '../../features/inventory/inventoryApiSlice';


export default function InventoryHistory() {
    const { product_pk, product_name } = useParams();
    const {data, isError, error, isLoading, isSuccess} = useGetInventoryProductHistoryQuery(product_pk);

    const Labels = {
        PAGE_ENTITY: 'Product Inventory',
        PAGE_ENTITY_URL: 'inventory/products',
        TABLE_TITLE: product_name,
        ADD_NEW_ENTITY: product_name,
        API_URL: `inventory/products/transaction/${product_pk}`
    }
    const dataTableColumn = [
        {
            title: <div className='fs-md fw-bold text-center'>Id</div>,
            key: 'no',
            dataIndex: 'id',
            width: 50,
            render: (text, record, index) => (
                <div 
                    className={`fs-md fw-semibold text-center ${record.transaction_type === "sales" && 'text-danger'}`}
                >
                    {record?.id || "--" }
                </div>
            )
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
                    <div className={`fs-md fw-semibold text-uppercase text-wrap text-truncate ${record.transaction_type === 'sales' && 'text-danger'}`}>
                        {record?.transaction_type === "sales" ? (
                            <RenderText text={record?.product?.customer} maxLength={18} />
                        ) : (
                            <RenderText text={record?.product?.supplier} maxLength={18} />
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
                    <div className={`fs-md fw-semibold text-uppercase text-truncate ${record.transaction_type === 'sales' && 'text-danger'}`}>
                        <RenderText text={record?.product?.product_name} maxLength={22} />
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
                    <div className={`fs-md fw-semibold text-center ${record.transaction_type == 'sales' && 'text-danger'}`}>
                        {record.transaction_type === 'sales' ? record.quantity_sold : record.quantity}
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Stock</div>,
            key: 'stock',
            dataIndex: 'stock',
            render: (text, record) => {
                return (
                    <div className="fw-semibold text-center">
                        {record.inventory_stock_left ? <NumberFormatter amount={record.inventory_stock_left} /> : '---'}
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-wrap'>Inventory Id Used</div>,
            key: 'stockUsed',
            dataIndex: 'stockUsed',
            render: (text, record) => {
                return (
                    <div className={`fw-semibold text-center ${record.transaction_type === 'sales' && 'text-danger'}`}>
                        {record?.inventory_id ? record.inventory_id : '---'}
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>U/Cost</div>,
            key: 'uCost',
            dataIndex: 'unit_cost',
            render: (text, record) => {
                return (
                    <div className={`fw-semibold text-center ${record.transaction_type == "sales" && 'text-danger'}`}>
                        <MoneyFormatter amount={text} />
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Gross Price</div>,
            key: 'gross_price',
            dataIndex: 'gross_price',
            render: (price, record) => {
                return (
                    <>
                        {record.transaction_type !== "sales" ? (
                            <div className="fw-semibold text-center">
                                ---
                            </div>
                        ) : (
                            <div className="fw-semibold text-center text-success">
                                {record.unit_price > record.unit_cost ?
                                    <MoneyFormatter amount={record.unit_price} /> :
                                    <>(<MoneyFormatter amount={record.u_price} />)</>
                                }
                            </div>
                        )}
                    </>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Sold Price</div>,
            key: 'sold_price',
            dataIndex: 'sold_price',
            render: (price, record) => {
                return (
                    <>
                        {record.transaction_type !== "sales" ? (
                            <div className="fw-semibold text-center">
                                ---
                            </div>
                        ) : (
                            <div className="fw-semibold text-center text-success">
                                {record.product.sales_unit_price > record.unit_cost ?
                                    <MoneyFormatter amount={record.product.sales_unit_price} /> :
                                    <>(<MoneyFormatter amount={record.product.sales_unit_price} />)</>
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
            fixed: "right",
            render: (text, record, index) => {
                return (
                    <>
                        {record.transaction_type == 'restock' ? (
                            <div className='px-auto'>
                                <DropDown
                                    showConfig={{
                                        disabled: true  
                                    }}
                                    editConfig={{
                                        editLink: `/inventory/products/transaction/${record?.id}/edit`, // this path goes to react page url
                                        disabled: false
                                    }}
                                    link2={`/inventory/products/transaction/${record.id}/edit`} 
                                    deleteConfig={{
                                        message: <InventoryMessage record={record.product} />,
                                        disabled: false,
                                        component: "inventory",
                                        recordID: record.id
                                    }}
                                />
                            </div>
                        ) : (
                            <div className='px-auto'>
                                <DropDown
                                    showConfig={{
                                        showLink: "",
                                        disabled: false,
                                        cardHeader: <SalesCardModalTitle cardData={record.product} />,
                                        cardWidth: null,
                                        cardBody: <SalesCard data={record.product} />
                                    }}
                                    editConfig={{
                                        editLink: `/sales/transaction/${record?.product?.pk}/edit`, // this path goes to react page url
                                        disabled: false
                                    }}
                                    deleteConfig={{
                                        message: <SalesMessage record={record?.product} />,
                                        disabled: false,
                                        component: "sales",
                                        recordID: record?.product?.pk
                                    }}
                                />
                            </div>
                        )}
                    </>
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
    };

    console.log(data)

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
                                    // Template here for no results found
                                    <div className="py-4">
                                        <h6 className="text-center px-3 mt-4 mb-1"><i>No Results Found</i></h6>
                                    </div>
                                ) : (
                                    <InventoryHistoryDataTable config={config} />
                                )
                            )
                    )
            }
        </>

    )
}
