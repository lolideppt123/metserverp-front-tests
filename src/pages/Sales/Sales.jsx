import { useState, useEffect } from "react";
import useAxiosFunction from "../../hooks/useAxiosFunction";
import Spinner from "../../components/Fallback/Spinner";
import NoServerResponse from "../../components/Errors/NoServerResponse";
import GetStartedTemplate from "../../components/Fallback/GetStartedTemplate";
import dayjs from "dayjs";

import DataTablePageHeader from "../../modules/FspPanelModule/DataTablePageHeader";
import SalesDataTable from "../../modules/SalesModule/SalesDataTable";

import MoneyFormatter, { NumberFormatter } from "../../settings/MoneyFormatter";
import { Tooltip } from "antd";

import salesFilterFunc from "../../helpers/salesFilterFunc";

export default function Sales() {
    const [SalesFilter, setSalesFilter] = useState("");
    const [invoiceFilter, setInvoiceFilter] = useState([]);
    const [customerFilter, setCustomerFilter] = useState([]);
    const [productFilter, setProductFilter] = useState([]);
    const [supplierFilter, setSupplierFilter] = useState([]);
    const [filteredInfo, setFilteredInfo] = useState({});

    const {
        loading,
        setLoading: setDataLoading,
        response: data,
        setResponse: setData,
        error,
        axiosFetch: salesFetch,
    } = useAxiosFunction();

    const {
        loading: filteredDataLoading,
        response: filteredData,
        setResponse: setFilteredData,
        error: filteredDataError,
        axiosFetch: fetchFilteredData,
    } = useAxiosFunction();

    const {
        loading: customerLoading,
        response: customers,
        axiosFetch: fetchCustomers,
    } = useAxiosFunction();

    const {
        loading: productLoading,
        response: products,
        axiosFetch: fetchProducts,
    } = useAxiosFunction();

    const {
        loading: supplierLoading,
        response: suppliers,
        axiosFetch: fetchSupplier,
    } = useAxiosFunction();

    const {
        GenerateCSVData,
        CSVData
    } = salesFilterFunc();

    const Labels = {
        BASE_ENTITY: "Sales",
        TABLE_TITLE: "Sales",
        ADD_NEW_ENTITY: "Add New Sales",
        NEW_ENTITY_URL: "sales/add",
        API_URL: "sales/",
    };

    const dataTableColumn = [
        {
            title: <div className="fs-md fw-semibold text-center">Invoice</div>,
            key: "salesInvoice",
            dataIndex: "sales_invoice",
            fixed: "left",
            width: 100,
            filters: invoiceFilter,
            filteredValue: filteredInfo.salesInvoice || null,
            onFilter: (value, record) => record.sales_invoice.includes(value),
            filterSearch: true,
            render: (text, record) => {
                return (
                    <div
                        className={`fs-md fw-semibold text-uppercase ${record.sales_status == "PAID" ? "paid" : "unpaid"
                            } text-center`}
                    >
                        {text.length > 4 ? (
                            <Tooltip className="pointer" title={text}>
                                {text.substr(0, 4)}
                                {text.length > 4 && "\u2026"}
                            </Tooltip>
                        ) : (
                            <>{text}</>
                        )}
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
                        {text?.length > 4 ? (
                            <Tooltip className="pointer" title={text}>
                                {text.substr(0, 4)}
                                {text.length > 4 && "\u2026"}
                            </Tooltip>
                        ) : (
                            <>{text}</>
                        )}
                    </div>
                );
            },
        },
        {
            title: (
                <div className="fs-md fw-semibold text-center">Sale Date</div>
            ),
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
            title: (
                <div className={`fs-md fw-semibold text-center`}>
                    Product Name
                </div>
            ),
            key: "productName",
            dataIndex: "product_name",
            fixed: "left",
            width: 200,
            filters: productFilter,
            filteredValue: filteredInfo.productName || null,
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
                        {text.length > 17 ? (
                            <Tooltip className="pointer" title={text}>
                                {text.substr(0, 17)}
                                {text.length > 17 && "\u2026"}
                            </Tooltip>
                        ) : (
                            <>{text}</>
                        )}
                    </div>
                );
            },
        },
        {
            title: (
                <div className="fs-md fw-semibold text-center">Customer</div>
            ),
            key: "customer",
            dataIndex: "customer",
            width: 200,
            filters: customerFilter,
            filteredValue: filteredInfo.customer || null,
            onFilter: (value, record) => record.customer.includes(value),
            filterSearch: true,
            render: (text, record) => {
                return (
                    <div
                        className={`fs-md fw-semibold text-uppercase ${record.sales_status == "PAID" ? "paid" : "unpaid"
                            }`}
                    >
                        {text.length > 17 ? (
                            <Tooltip className="pointer" title={text}>
                                {text.substr(0, 17)}
                                {text.length > 17 && "\u2026"}
                            </Tooltip>
                        ) : (
                            <>{text}</>
                        )}
                    </div>
                );
            },
        },
        {
            // title: 'Quantity',
            title: (
                <div className="fs-md fw-semibold text-center">Quantity</div>
            ),
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
        // {
        //     title: 'U/Cost',
        //     key: 'unitCost'
        // },
        {
            // title: 'Total Cost',
            title: (
                <div className="fs-md fw-semibold text-center">Total Cost</div>
            ),
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
        // {
        //     title: 'U/Price',
        //     key: 'unitPrice'
        // },
        {
            // title: 'Gross Price',
            title: (
                <div className="fs-md fw-semibold text-center">Gross Price</div>
            ),
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
            // title: 'Margin',
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
            // title: 'VAT',
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
            // title: 'Status',
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
            // title: 'Date Paid',
            title: (
                <div className="fs-md fw-semibold text-center">Date Paid</div>
            ),
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
    ];

    const handleOnFilter = async (pagination, filters, sorter, extra) => {

        await fetchFilteredData({
            url: `sales-data-filter/`,
            method: "POST",
            data: { ...filters, SalesFilter }
        })
        console.log(filters);
        setFilteredInfo(filters);
    };

    const customMapper = (data, { text, value }, setter) => {
        setter([]);
        data.map((item) =>
            setter((prev) => [
                ...prev,
                { text: item[text], value: item[value] },
            ])
        );
    }

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const invoiceFilterList = [{ invoiceFilter: "With Invoice" }, { invoiceFilter: "Without Invoice" }];
        const getData = async () => {
            await salesFetch({
                url: `sales/${dayjs().year()}`,
                method: "get",
            });
            await fetchCustomers({
                url: "customers/",
                method: "GET",
            });
            await fetchProducts({
                url: "products/",
                method: "GET",
            });
            await fetchSupplier({
                url: "suppliers/",
                method: "GET",
            });
        };
        getData();
        customMapper(invoiceFilterList, { text: 'invoiceFilter', value: 'invoiceFilter' }, setInvoiceFilter);
    }, []);

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            if (SalesFilter !== "") {
                await salesFetch({
                    url: `sales/${SalesFilter}`,
                    method: "get",
                });
            }
        };
        getData();
    }, [SalesFilter]);

    useEffect(() => {
        if (data && !filteredData) {
            console.log("running data")
            GenerateCSVData(data);
        }
        if (customers) {
            customMapper(customers, { text: 'company_name', value: 'company_name' }, setCustomerFilter);
        }
        if (products) {
            customMapper(products, { text: 'product_name', value: 'product_name' }, setProductFilter);
        }
        if (suppliers) {
            customMapper(suppliers, { text: 'company_name', value: 'id' }, setSupplierFilter);
        }
        if (filteredData) {
            GenerateCSVData(filteredData);
        }
    }, [data, customers, products, suppliers, filteredData]);

    useEffect(() => {
        if (supplierFilter.length > 0) {
            setProductFilter(prev => [{
                text: <span className="fw-semibold">Suppliers</span>,
                value: 'Suppliers',
                children: supplierFilter
            }, ...productFilter])
        }
    }, [supplierFilter])

    const config = {
        dataTableColumn,
        Labels,
        data,
        CSVData,
        customerLoading,
        productLoading,
        supplierLoading,
        loading,
        error,
        setData,
        handleOnFilter,
    };

    // console.log(CSVData);

    return (
        <>
            <DataTablePageHeader
                Labels={Labels}
                salesFilter={SalesFilter}
                setSalesFilter={setSalesFilter}
                type={"sales"}
            // data={data}
            />
            {loading || customerLoading || productLoading || supplierLoading || filteredDataLoading ? (
                <Spinner />
            ) : error ? (
                <NoServerResponse error={error} />
            ) : data?.length == 0 ? (
                <GetStartedTemplate
                    customizedHeader={
                        <h2 className="fw-bold">
                            Get started by adding your first Sales!
                        </h2>
                    }
                    customizedStatement={
                        <>
                            <p>You are at the last step of MetservERP.</p>
                            <p>
                                You can view your performance at the Summary
                                section
                            </p>
                        </>
                    }
                />
            ) : (
                <SalesDataTable config={config} />
            )}
        </>
    );
}