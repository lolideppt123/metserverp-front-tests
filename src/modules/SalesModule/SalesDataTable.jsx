import dayjs from "dayjs";
import Spinner from "../../components/Fallback/Spinner";
import DropDown from "../../components/DropDown/DropDown";
import SalesCard from "../../components/Cards/SalesCard";
import SalesCardModalTitle from "../../components/ModalTitle/SalesCardModalTitle";
import CSVExportByMonth from "../../components/Exports/CSVExportByMonth";

import salesFilterFunc from "../../helpers/salesFilterFunc";
import { memo, useEffect, useMemo } from "react";
import MemoizedTable from "../../components/Table/SalesTableMemoized";


const SalesDataTable = ({ config }) => {
    const {
        dataTableColumn,
        data,
        CSVData,
        loading,
        Labels,
        setData,
        handleOnFilter,
    } = config;

    const { CSVData: newData, GenerateCSVData, CSVLoading } = salesFilterFunc();

    const primaryData = useMemo(() => {
        console.log("primaryData");
        // This only generates for the initial sales data which is filtered by year by default
        GenerateCSVData(data)
    }, [data])

    const cummulatives = [];

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
                                message: `Product: ${record?.product_name?.substr(0, 12)}${record?.product_name?.length > 12 ? "\u2026" : ""}, 
                                            Invoice: ${record?.sales_invoice?.substr(0, 12)}${record?.sales_invoice?.length > 7 ? "\u2026" : ""}, 
                                            Quantity: ${record.sales_quantity}`,
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

    // const isLoading = loading || customerLoading || productLoading || supplierLoading || CSVLoading;
    // if (isLoading) return <Spinner />

    // console.log("SalesTable rendered");

    return (
        <div className="container">
            {loading || CSVLoading ? (
                <Spinner />
            ) : (
                !data ? (
                    // !data?.length ? ( 
                    <Spinner />
                ) : (
                    <div className="app-table">
                        {newData?.get_body?.map((item, index) => (
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
                                            newData?.get_title[index]?.data_title
                                        ).format("MMMM YYYY")}
                                    </h5>
                                    <div
                                        className="flex-row-reverse"
                                        style={{ marginLeft: "auto" }}
                                    >
                                        <CSVExportByMonth
                                            title={CSVData.get_title[index]}
                                            body={CSVData.get_body[index]}
                                            foot={CSVData.get_totals[index]}
                                            endFoot={CSVData.get_cumm_totals[index]}
                                        />
                                    </div>
                                </div>

                                {/* Memoized Table so render only once if data didn't change */}
                                <MemoizedTable
                                    dataSource={newData?.get_body[index]}
                                    dataColumn={columnData}
                                    summaryDataSource={[CSVData?.get_totals[index], CSVData?.get_cumm_totals[index]]}
                                    // summaryDataSource={CSVData?.get_body[index]}
                                    onChange={handleOnFilter}
                                    xAxis={1500}
                                    yAxis={500}
                                    pagination={false}
                                    index={index}
                                    cummulatives={cummulatives}
                                />

                                {/* <Table
                                    columns={columnData}
                                    rowKey={(data) => data.pk}
                                    dataSource={newData?.get_body[index]}
                                    onChange={handleOnFilter}
                                    scroll={{
                                        x: 1500,
                                        y: 500,
                                    }}
                                    pagination={false}
                                    summary={(data) => {
                                        console.log("table rendered")
                                        let totalCost = 0;
                                        let grossPrice = 0;
                                        let margin = 0;
                                        let vat = 0;
                                        let cum_totalCost = 0;
                                        let cum_grossPrice = 0;
                                        let cum_margin = 0;
                                        let cum_vat = 0;

                                        data.forEach(
                                            ({
                                                sales_total_cost,
                                                sales_gross_price,
                                                sales_margin,
                                                sales_VAT,
                                            }) => {
                                                totalCost +=
                                                    Number(
                                                        sales_total_cost
                                                    );
                                                grossPrice +=
                                                    Number(
                                                        sales_gross_price
                                                    );
                                                margin +=
                                                    Number(sales_margin);
                                                vat += Number(sales_VAT);
                                            }
                                        );
                                        if (index === 0) {
                                            cummulatives[index] = {
                                                cum_totalCost: totalCost,
                                                cum_grossPrice: grossPrice,
                                                cum_margin: margin,
                                                cum_vat: vat,
                                            };
                                        } else {
                                            cum_totalCost =
                                                totalCost +
                                                cummulatives[index - 1]
                                                    .cum_totalCost;
                                            cum_grossPrice =
                                                grossPrice +
                                                cummulatives[index - 1]
                                                    .cum_grossPrice;
                                            cum_margin =
                                                margin +
                                                cummulatives[index - 1]
                                                    .cum_margin;
                                            cum_vat =
                                                vat +
                                                cummulatives[index - 1]
                                                    .cum_vat;

                                            item = {
                                                cum_totalCost:
                                                    cum_totalCost,
                                                cum_grossPrice:
                                                    cum_grossPrice,
                                                cum_margin: cum_margin,
                                                cum_vat: cum_vat,
                                            };

                                            cummulatives.splice(
                                                index,
                                                0,
                                                item
                                            );
                                        }

                                        return (
                                            <Table.Summary fixed>
                                                <Table.Summary.Row>
                                                    <Table.Summary.Cell
                                                        index={0}
                                                        colSpan={2}
                                                        className="text-start fw-bold bg-light h6"
                                                    >
                                                        Total
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    totalCost
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    grossPrice
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    margin
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={vat}
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
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

                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    cummulatives[
                                                                        index
                                                                    ]
                                                                        ?.cum_totalCost
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    cummulatives[
                                                                        index
                                                                    ]
                                                                        ?.cum_grossPrice
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    cummulatives[
                                                                        index
                                                                    ]
                                                                        ?.cum_margin
                                                                }
                                                            />
                                                        }
                                                    </Table.Summary.Cell>
                                                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                                        {
                                                            <MoneyFormatter
                                                                amount={
                                                                    cummulatives[
                                                                        index
                                                                    ]
                                                                        ?.cum_vat
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
                                        );
                                    }}
                                /> */}
                            </div>
                        ))}
                    </div>
                ))}
        </div>
    );
}

export default SalesDataTable