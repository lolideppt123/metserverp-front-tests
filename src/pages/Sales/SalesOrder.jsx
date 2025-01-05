import { useRef, useState} from 'react';
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


// Demo
import { Button, Input, Space } from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';


export default function SalesOrder() {
    const [Destroy, setDestroy] = useState(false);
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');

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


    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button type="link" size="small" onClick={() => confirm({ closeDropdown: false })}>
                        Filter
                    </Button>
                    <Button type="link" size="small" onClick={() => close()}>
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: "#6610f2", fontSize: 18, fontWeight: 600}} />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        filterDropdownProps: {
            onOpenChange(open) {
                if (open) setTimeout(() => searchInput.current?.select(), 100);
            },
        },
        render: (text) =>
            <div className={`fs-md fw-semibold text-center`}>
                {searchedColumn === dataIndex ? (
                        <Highlighter
                            highlightStyle={{
                                backgroundColor: '#ffc069',
                                padding: 0,
                            }}
                            searchWords={[searchText]}
                            autoEscape
                            textToHighlight={text ? text.toString() : ''}
                        />
                ) : (
                    text
                )}
            </div>
        });

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
            ...getColumnSearchProps('customer')
            // render: (text, record) => {
            //     return <div className={`fs-md fw-semibold text-center`}>
            //         {text.length > 25 ? (
            //             <Tooltip className='pointer' title={text}>
            //                 {text.substr(0, 25)}{text.length > 25 && '\u2026'}
            //             </Tooltip>
            //         ) : (
            //             <>{text}</>
            //         )}
            //     </div>
            // }
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