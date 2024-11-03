import { memo, useState } from 'react';
import { Table } from 'antd';
import dayjs from "dayjs";
import { transformData } from './utils/transformData';

import SalesTableSummary from './SalesTableSummary';
import RenderText from "../../components/Tooltip/RenderText";
import MoneyFormatter, { NumberFormatter } from "../../settings/MoneyFormatter";
import SalesCardModalTitle from '../../components/ModalTitle/SalesCardModalTitle';
import SalesCard from '../../components/Cards/SalesCard';
import DropDown from '../../components/DropDown/DropDown';
import CSVExportByMonth from '../../components/Exports/CSVExportByMonth';


const SalesTable = ({ salesData, filters, setFilters }) => {
    const {
        sales: {
            sales_list = [],
            sales_totals = {},
            sales_cummulative = {}
        } = {},
        products,
        customer,
        supplier,
        data_title
    } = salesData;

    const invoiceOptions = [{ text: "With Invoice", value: "With Invoice" }, { text: "Without Invoice", value: "Without Invoice" }, { text: "Sample", value: "Sample" }];
    const productOptions = transformData(products, { text: 'product_name', value: 'product_name' });
    const customerOptions = transformData(customer, { text: 'company_name', value: 'company_name' });
    const supplierOptions = transformData(supplier, { text: 'company_name', value: 'id' });

    // Append suppliers in product filter
    if (productOptions.length > 0) {
        const supplierGroup = {
            text: <span className="fw-semibold">Suppliers</span>,
            value: 'Suppliers',
            children: supplierOptions
        };
        productOptions.unshift(supplierGroup);
    }

    // Update filters when user applies them
    const handleTableOnFilter = (pagination, newFilters, sorter, extra) => {
        const filterQuery = { ...newFilters, dateFilter: filters.dateFilter };
        setFilters(filterQuery);
    };

    const dataTableColumn = [
        {
            title: <div className="fs-md fw-semibold text-center">Invoice</div>,
            key: "salesInvoice",
            dataIndex: "sales_invoice",
            fixed: "left",
            width: 100,
            filters: invoiceOptions,
            // filteredValue: filteredInfo.salesInvoice || null,
            onFilter: (value, record) => {
                const regex = /[a-zA-Z]/i;
                if (value === "Without Invoice" && regex.test(record.sales_invoice)) {
                    return true
                }
                if (value === "With Invoice" && !regex.test(record.sales_invoice)) {
                    return true
                }
                return false
            },
            filterSearch: true,
            render: (text, record) => {
                return (
                    <div
                        className={`fs-md fw-semibold text-uppercase ${record.sales_status == "PAID" ? "paid" : "unpaid"
                            } text-center`}
                    >
                        {<RenderText text={text} maxLength={4} />}
                    </div>
                );
            },
        },
        {
            title: <div className="fs-md fw-semibold text-center">DR</div>,
            key: "salesDR",
            dataIndex: "sales_dr",
            width: 80,
            render: (text, record) => {
                return (
                    <div
                        className={`fs-md fw-semibold text-uppercase ${record.sales_status == "PAID" ? "paid" : "unpaid"
                            } text-center`}
                    >
                        {<RenderText text={text} maxLength={4} />}
                    </div>
                );
            },
        },
        {
            title: <div className="fs-md fw-semibold text-center">Sale Date</div>,
            key: "salesDate",
            dataIndex: "sales_date",
            width: 125,
            render: (date, record) => {
                return (
                    <div
                        className={`fs-md fw-semibold ${record.sales_status == "PAID" ? "paid" : "unpaid"
                            } text-center text-nowrap`}
                    >
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
            width: 200,
            filters: productOptions,
            // filteredValue: filteredInfo.productName || null,
            onFilter: (value, record) => {
                if (typeof (value) === 'number') {
                    return record.sales_transaction[0].supplier.id === value
                }
                if (typeof (value) === 'string') {
                    return record.product_name === value
                }
            },
            filterSearch: true,
            render: (text, record) => {
                return (
                    <div
                        className={`fs-md fw-semibold text-uppercase ${record.sales_status == "PAID" ? "paid" : "unpaid"
                            }`}
                    >
                        {<RenderText text={text} maxLength={17} />}
                    </div>
                );
            },
        },
        {
            title: <div className="fs-md fw-semibold text-center">Customer</div>,
            key: "customer",
            dataIndex: "customer",
            width: 200,
            filters: customerOptions,
            // filteredValue: filteredInfo.customer || null,
            onFilter: (value, record) => record.customer.includes(value),
            filterSearch: true,
            render: (text, record) => {
                return (
                    <div
                        className={`fs-md fw-semibold text-uppercase ${record.sales_status == "PAID" ? "paid" : "unpaid"
                            }`}
                    >
                        {<RenderText text={text} maxLength={17} />}
                    </div>
                );
            },
        },
        {
            title: <div className="fs-md fw-semibold text-center">Quantity</div>,
            key: "salesQuantity",
            dataIndex: "sales_quantity",
            width: 150,
            render: (text, record) => {
                return (
                    <div
                        className={`fs-md fw-semibold text-uppercase ${record.sales_status == "PAID" ? "paid" : "unpaid"
                            } text-center`}
                    >
                        {<NumberFormatter amount={record.sales_quantity} />}
                    </div>
                );
            },
        },
        {
            title: <div className="fs-md fw-semibold text-center">Total Cost</div>,
            key: "totalCost",
            dataIndex: "sales_total_cost",
            width: 200,
            render: (text, record) => {
                return (
                    <div
                        className={`fs-md fw-semibold text-uppercase ${record.sales_status == "PAID" ? "paid" : "unpaid"
                            } text-end`}
                    >
                        {<MoneyFormatter amount={record.sales_total_cost} />}
                    </div>
                );
            },
        },
        {
            title: <div className="fs-md fw-semibold text-center">Gross Price</div>,
            key: "grossPrice",
            dataIndex: "sales_gross_price",
            width: 200,
            render: (text, record) => {
                return (
                    <div
                        className={`fs-md fw-semibold text-uppercase ${record.sales_status == "PAID" ? "paid" : "unpaid"
                            } text-end`}
                    >
                        {<MoneyFormatter amount={record.sales_gross_price} />}
                    </div>
                );
            },
        },
        {
            title: <div className="fs-md fw-semibold text-center">Margin</div>,
            key: "salesMargin",
            dataIndex: "sales_margin",
            width: 200,
            render: (text, record) => {
                return (
                    <div
                        className={`fs-md fw-semibold text-uppercase ${record.sales_status == "PAID" ? "paid" : "unpaid"
                            } text-end`}
                    >
                        {<MoneyFormatter amount={record.sales_margin} />}
                    </div>
                );
            },
        },
        {
            title: <div className="fs-md fw-semibold text-center">VAT</div>,
            key: "vat",
            dataIndex: "sales_VAT",
            width: 200,
            render: (text, record) => {
                return (
                    <div
                        className={`fs-md fw-semibold text-uppercase ${record.sales_status == "PAID" ? "paid" : "unpaid"
                            } text-end`}
                    >
                        {<MoneyFormatter amount={record.sales_VAT} />}
                    </div>
                );
            },
        },
        {
            title: <div className="fs-md fw-semibold text-center">Status</div>,
            key: "salesStatus",
            dataIndex: "sales_status",
            width: 100,
            render: (text, record) => {
                return (
                    <div className="text-center">
                        <span
                            style={{ fontSize: "12px" }}
                            className={`px-2 py-1 ${record.sales_status == "PAID"
                                ? "paid-status"
                                : "unpaid-status"
                                }`}
                        >
                            {text}
                        </span>
                    </div>
                );
            },
        },
        {
            title: <div className="fs-md fw-semibold text-center">Date Paid</div>,
            key: "datePaid",
            dataIndex: "sales_paid_date",
            width: 125,
            render: (text, record) => {
                return (
                    <>
                        {record.sales_status == "PAID" ? (
                            <div className="fs-md fw-semibold">
                                {dayjs(record.sales_paid_date).format(
                                    "MMM DD, YYYY"
                                )}
                            </div>
                        ) : (
                            <div className="unpaid text-center">---</div>
                        )}
                    </>
                );
            },
        },
        {
            title: "",
            key: "action",
            dataIndex: ["id", "type"],
            width: 50,
            fixed: "right",
            render: (text, record) => {
                return (
                    <div className="px-auto">
                        <DropDown
                            link1={`default`}
                            cardHeader={
                                <SalesCardModalTitle cardData={record} />
                            }
                            ShowCard={<SalesCard data={record} />}
                            link2={`/sales/transaction/${record.pk}/edit`}
                            deleteConfig={{
                                link3: `sales/transaction/${record.pk}/edit`,
                                message: `Product: ${record?.product_name?.substr(0, 12)}${record?.product_name?.length > 12 ? "\u2026" : ""}, 
                                            Invoice: ${record?.sales_invoice?.substr(0, 12)}${record?.sales_invoice?.length > 7 ? "\u2026" : ""}, 
                                            Quantity: ${record.sales_quantity}`,
                                notAllowed: false,
                                api_url: "sales/",
                                setData: (data) => setData(data),
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    console.log(sales_list)
    console.log(sales_totals)
    console.log(sales_cummulative)

    return (
        <div className="app-table company-data-table mt-4">
            <div className="d-flex justify-content-center align-items-center">
                <h5
                    className="fw-semibold text-center px-3  mb-2"
                    style={{ marginLeft: "auto" }}
                >
                    {dayjs(
                        data_title
                    ).format("MMMM YYYY")}
                </h5>
                <div
                    className="flex-row-reverse"
                    style={{ marginLeft: "auto" }}
                >
                    <CSVExportByMonth
                        title={data_title}
                        body={sales_list}
                        foot={sales_totals}
                        endFoot={sales_cummulative}
                        dateFilter={filters.dateFilter}
                    />
                </div>
            </div>
            <Table
                columns={dataTableColumn}
                dataSource={sales_list}
                onChange={handleTableOnFilter}
                rowKey={data => data.pk}
                scroll={{ x: 'max-content' }}
                pagination={false}
                summary={() => <SalesTableSummary sales_totals={sales_totals} sales_cummulative={sales_cummulative} />}
            />
        </div>
    )
}

export default SalesTable;