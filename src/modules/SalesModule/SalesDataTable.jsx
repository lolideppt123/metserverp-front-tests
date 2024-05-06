import dayjs from "dayjs";
import Spinner from "../../components/Fallback/Spinner";
import DropDown from "../../components/DropDown/DropDown";
import { Table } from "antd";
import SalesCard from "../../components/Cards/SalesCard";

import MoneyFormatter from "../../settings/MoneyFormatter";
import SalesCardModalTitle from "../../components/ModalTitle/SalesCardModalTitle";
import CSVExportByMonth from "../../components/Exports/CSVExportByMonth";

export default function SalesDataTable({ config }) {
    const { dataTableColumn, data, loading, customerLoading, Labels, setData } =
        config;
    // console.log(data)
    const get_title = [];
    const get_totals = [];
    const get_cumm_totals = [];
    const get_body = [];

    data?.map((item, index) => {
        get_title.push(item[item.length - 1]);
        get_cumm_totals.push(item[item.length - 2]);
        get_totals.push(item[item.length - 3]);
        if (item.length <= 3) {
            get_body.push([]);
        } else {
            get_body.push(item.slice(0, item.length - 3));
        }
    });

    const columnData = [
        ...dataTableColumn,
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
                                message: `Product: ${record?.product_name?.substr(
                                    0,
                                    12
                                )}${
                                    record?.product_name?.length > 12
                                        ? "\u2026"
                                        : ""
                                }, 
                                                Invoice: ${record?.sales_invoice?.substr(
                                                    0,
                                                    12
                                                )}${
                                    record?.sales_invoice?.length > 7
                                        ? "\u2026"
                                        : ""
                                }, 
                                                Quantity: ${
                                                    record.sales_quantity
                                                }`,
                                notAllowed: false,
                                api_url: Labels.API_URL,
                                setData: (data) => setData(data),
                            }}
                        />
                    </div>
                );
            },
        },
    ];
    return (
        <div className="container">
            {loading || customerLoading ? (
                <Spinner />
            ) : (
                <>
                    {!data?.length ? (
                        <Spinner />
                    ) : (
                        <div className="app-table">
                            {get_body?.map((item, index) => (
                                <div
                                    className="app-table multi-app-table mt-5"
                                    key={index}
                                >
                                    <div className="d-flex justify-content-center align-items-center">
                                        <h5
                                            className="fw-semibold text-center px-3  mb-2"
                                            style={{ marginLeft: "auto" }}
                                        >
                                            {dayjs(
                                                get_title[index]?.data_title
                                            ).format("MMMM YYYY")}
                                        </h5>
                                        <div
                                            className="flex-row-reverse"
                                            style={{ marginLeft: "auto" }}
                                        >
                                            <CSVExportByMonth
                                                title={get_title[index]}
                                                body={get_body[index]}
                                                foot={get_totals[index]}
                                                endFoot={get_cumm_totals[index]}
                                            />
                                        </div>
                                    </div>
                                    <Table
                                        columns={columnData}
                                        rowKey={(data) => data.pk}
                                        dataSource={get_body[index]}
                                        scroll={{
                                            x: 1500,
                                            y: 500,
                                        }}
                                        pagination={false}
                                        summary={(data) => (
                                            <Table.Summary fixed={"bottom"}>
                                                <Table.Summary.Row>
                                                    <Table.Summary.Cell
                                                        index={0}
                                                        colSpan={2}
                                                        className="text-start fw-bold bg-light h6"
                                                    >
                                                        Total
                                                    </Table.Summary.Cell>
                                                    {/* <Table.Summary.Cell></Table.Summary.Cell> */}
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    get_totals[
                                                                        index
                                                                    ]
                                                                        ?.sales_cost
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    get_totals[
                                                                        index
                                                                    ]
                                                                        ?.sales_price
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    get_totals[
                                                                        index
                                                                    ]
                                                                        ?.sales_total_margin
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    get_totals[
                                                                        index
                                                                    ]?.sales_vat
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                </Table.Summary.Row>
                                                <Table.Summary.Row>
                                                    <Table.Summary.Cell
                                                        index={0}
                                                        colSpan={2}
                                                        className="text-start fw-bold bg-light h6"
                                                    >
                                                        Cumulative
                                                    </Table.Summary.Cell>
                                                    {/* <Table.Summary.Cell></Table.Summary.Cell> */}
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    get_cumm_totals[
                                                                        index
                                                                    ]
                                                                        ?.cumm_sales_cost
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    get_cumm_totals[
                                                                        index
                                                                    ]
                                                                        ?.cumm_sales_price
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    get_cumm_totals[
                                                                        index
                                                                    ]
                                                                        ?.cumm_sales_margin
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    get_cumm_totals[
                                                                        index
                                                                    ]
                                                                        ?.cumm_sales_vat
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                </Table.Summary.Row>
                                            </Table.Summary>
                                        )}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
