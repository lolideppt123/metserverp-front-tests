import { useState, useEffect } from "react";

import { useGetSalesFilteredDataQuery } from "../../features/sales/salesApiSlice";

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import dayjs from "dayjs";
import MoneyFormatter, {NumberFormatter} from "../../settings/MoneyFormatter";
import RenderText from "../../components/Tooltip/RenderText";
import { transformData } from "./utils/transformData";

// Components
import Spinner from "../../components/Fallback/Spinner";
import SalesTable from "./SalesTable";

import DropDown from "../../components/DropDown/DropDown";
import SalesCardModalTitle from "../../components/ModalTitle/SalesCardModalTitle";
import SalesCard from "../../components/Cards/SalesCard";
import { DeleteMessage } from "./utils/DeleteMessage";


const SalesDraft = () => {
    const currentYear = dayjs().year();
    const currentMonth = dayjs().month() + 1;
    const initialDateFilter = `${currentYear}-${currentMonth}`;

    const [tableSize, setTableSize] = useState(true);
    const [filters, setFilters] = useState({
        customer: null,
        productName: null,
        salesInvoice: null,
        dateFilter: initialDateFilter
    });

    // Grabs initial data only once
    const { data: {
        sales,
        products,
        customer,
        supplier,
        data_title
    } = {}, isLoading, isError, isSuccess } = useGetSalesFilteredDataQuery(filters);

    useEffect(() => {
        console.log('Current Filters:', filters);
    }, [filters]);

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
                            showConfig={{
                                showLink: "",
                                disabled: false,
                                cardHeader: <SalesCardModalTitle cardData={record} />,
                                cardWidth: null,
                                cardBody: <SalesCard data={record} />
                            }}
                            editConfig={{
                                editLink: `/sales/transaction/${record.pk}/edit`, // this path goes to react page url
                                disabled: false
                            }}
                            deleteConfig={{
                                message: <DeleteMessage record={record} />,
                                disabled: false,
                                component: "sales",
                                recordID: record.pk
                            }}
                        />
                    </div>
                );
            },
        },
    ];

    return (
        <>
            <DataTablePageHeader
                Labels={{
                    BASE_ENTITY: "Sales",
                    TABLE_TITLE: "Sales",
                    ADD_NEW_ENTITY: "Add New Sales",
                    NEW_ENTITY_URL: "sales/add",
                    API_URL: "sales/",
                }}
                salesFilter={filters.dateFilter}
                setSalesFilter={setFilters}
                type={"sales"}
            />
            {isLoading ? (
                <Spinner />
            ) : (
                isError && !isSuccess ? (
                    <div>Error loading sales data.</div>
                ) : (
                    <SalesTable
                        salesData={sales}
                        data_title={data_title}
                        filters={filters}
                        setFilters={setFilters}
                        tableSize={tableSize}
                        setTableSize={setTableSize}
                        column={dataTableColumn}
                    />
                )
            )}
        </>
    )
}

export default SalesDraft