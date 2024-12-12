import { useState} from 'react';
import dayjs from 'dayjs';
import Spinner from '../../components/Fallback/Spinner';
import MoneyFormatter from '../../settings/MoneyFormatter';

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader'
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';
import CardModal from '../../components/Modal/CardModal';
import SalesInvoiceCard from '../../components/Cards/SalesInvoiceCard';
import DropDown from '../../components/DropDown/DropDown';
import InvoiceCardModalTitle from '../../components/ModalTitle/InvoiceCardModalTitle';
import { Tooltip } from 'antd';
import DeleteMessage from './utils/SalesOrder/DeleteMessage';
import { useGetAllSalesOrderQuery } from '../../features/sales/salesOrderApiSlice';
import NoServerResponse from '../../components/Errors/NoServerResponse';


export default function SalesOrder() {
    const [Destroy, setDestroy] = useState(false);

    const Labels = {
        PAGE_ENTITY: 'Sales Orders',
        PAGE_ENTITY_URL: "salesorders/",
        BASE_ENTITY: 'Sales Orders',
        TABLE_TITLE: 'Sales Order',
        ADD_NEW_ENTITY: 'Add Sales Order',
        NEW_ENTITY_URL: 'sales/add',
        API_URL: 'sales-invoice/'
    }

    // Redux
    const {data, isLoading, isError, error, isSuccess} = useGetAllSalesOrderQuery();

    const dataTableColumn = [
        {
            title: <div className='fs-md fw-bold text-center'>Invoice #</div>,
            key: 'invoiceNum',
            dataIndex: 'id',
            fixed: 'left',
            width: 100,
            render: (text, record) => {
                return (
                    <CardModal
                        titleProp={
                            <InvoiceCardModalTitle cardData={record} />
                        }
                        buttonText={
                            <Tooltip className='pointer' title={record?.invoice_num}>
                                {record?.invoice_num?.substr(0, 4)}{record?.invoice_num?.length > 4 ? '\u2026' : ""}
                            </Tooltip>
                        }
                        modalWidth={720}
                        setDestroy={setDestroy}
                        classList={'fs-md fw-semibold text-center'}
                    >
                        <SalesInvoiceCard data={record} />
                    </CardModal>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Customer</div>,
            key: 'customer',
            dataIndex: 'customer',
            width: 275,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-center`}>
                    {text.length > 25 ? (
                        <Tooltip className='pointer' title={text}>
                            {text.substr(0, 25)}{text.length > 25 && '\u2026'}
                        </Tooltip>
                    ) : (
                        <>{text}</>
                    )}
                </div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Total</div>,
            key: 'invoiceTotal',
            dataIndex: 'invoice_total',
            width: 200,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-end`}>
                    <MoneyFormatter amount={text} />
                </div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Status</div>,
            key: 'invoiceStatus',
            dataIndex: 'invoice_status',
            width: 90,
            render: (text, record) => {
                return (
                    <div className={`text-center`}>
                        <span style={{ fontSize: '12px' }} className={`badge  ${record.invoice_status == "PAID" ? "paid-status" : "unpaid-status"}`}>{text}</span>
                    </div>
                )


            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Date</div>,
            key: 'invoiceDate',
            dataIndex: 'invoice_date',
            width: 125,
            render: (date, record) => {
                return <div className={`fs-md fw-semibold text-center`}>{dayjs(date).format('MMM DD, YYYY')}</div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Date Paid</div>,
            key: 'invoicePaidDate',
            dataIndex: 'invoice_paid_date',
            width: 125,
            render: (date, record) => {
                return <div className={`fs-md fw-semibold text-center`}>{date != undefined ? dayjs(date).format('MMM DD, YYYY') : <>---</>}</div>
            }
        },
        {
            title: '',
            key: 'action',
            dataIndex: ['id', 'type'],
            fixed: 'right',
            width: 50,
            render: (text, record) => {
                return (
                    <div className='px-auto'>
                        <DropDown
                            showConfig={{
                                disabled: false,
                                cardHeader: <InvoiceCardModalTitle cardData={record} />,
                                cardBody: <SalesInvoiceCard data={record} />,
                                cardWidth: 720
                            }}
                            editConfig={{
                                editLink: `/salesorder/${record.id}/edit`,
                                disabled: false
                            }}
                            deleteConfig={{
                                message:    <DeleteMessage record={record} />,
                                disabled: false,
                                component: "invoice",
                                recordID: record.id,
                            }}
                        />
                    </div>
                )
            }
        },
    ]

    const config = {
        dataTableColumn,
        data,
        Labels,
    }

    return (
        <>
            <DataTablePageHeader Labels={Labels} />
            {
                isLoading ? (
                    <Spinner />
                ) : (
                    error && !isSuccess ? (
                        <NoServerResponse error={error} />
                    ) : (
                        <CompanyDataTable config={config} />
                    )
                )
            }
        </>
    )
}
