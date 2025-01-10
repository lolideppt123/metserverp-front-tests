import { memo, useMemo } from 'react';
import { Table } from 'antd';
import dayjs from "dayjs";
import MoneyFormatter from "../../settings/MoneyFormatter";
import CSVExportByMonth from '../../components/Exports/CSVExportByMonth';
import TableToggleButton from '../../components/CustomFields/TableToggleButton';


const SalesTable = ({ salesData, data_title, column, filters, setFilters, tableSize, setTableSize }) => {

    const {
        sales_list = [],
        sales_totals = {},
        sales_cummulative = {}
    } = salesData;

    const summary = useMemo(() => {
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
                                amount={sales_totals?.sales_cost || 0}
                            // amount={totalCost}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                        {
                            <MoneyFormatter
                                amount={sales_totals?.sales_price || 0}
                            // amount={grossPrice}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                        {
                            <MoneyFormatter
                                amount={sales_totals?.sales_total_margin || 0}
                            // amount={margin}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                        {
                            <MoneyFormatter
                                amount={sales_totals?.sales_vat || 0}
                            // amount={vat}
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
                                amount={sales_cummulative?.cumm_sales_cost || 0}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                        {
                            <MoneyFormatter
                                amount={sales_cummulative?.cumm_sales_price || 0}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                        {
                            <MoneyFormatter
                                amount={sales_cummulative?.cumm_sales_margin || 0}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                        {
                            <MoneyFormatter
                                amount={sales_cummulative?.cumm_sales_vat || 0}
                            />
                        }
                    </Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                    <Table.Summary.Cell className="bg-light"></Table.Summary.Cell>
                </Table.Summary.Row>
            </Table.Summary>
        )
    })

    return (
            <div className="app-table multi-app-table mt-5">
                <div className="d-flex justify-content-center align-items-center">
                    <h5
                        className="sales-table-header-title fw-semibold text-center px-3 mb-2"
                        style={{ marginLeft: "auto" }}
                    >
                        {dayjs(
                            data_title
                        ).isValid() && dayjs(data_title).format("MMMM YYYY")}
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
                    columns={column}
                    dataSource={sales_list}
                    onChange={setFilters}
                    rowKey={data => data.pk}
                    scroll={{ x: 'max-content', y: tableSize ? 600 : 'none' }}
                    pagination={false}
                    summary={() => summary}
                />

                {/* Shows only when isMobile is true */}
                <div className="sales-table-summary d-none mt-3">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="sales-card-footer-right card card-header m-0 p-2 px-3 align-items-center justify-content-end" style={{ flex: '1 1 0' }}>
                            <div className="w-100 text-end mb-1">
                                <span className="h6 fw-semibold m-0 float-start">Total Cost:</span>
                                <span className="fw-semibold ms-2"><MoneyFormatter amount={sales_totals.sales_cost} /></span><br />
                            </div>
                            <div className="w-100 text-end mb-1">
                                <span className="h6 fw-semibold m-0 float-start">Total Gross:</span>
                                <span className="fw-semibold ms-2"><MoneyFormatter amount={sales_totals.sales_price} /></span><br />
                            </div>
                            <div className="w-100 text-end mb-1">
                                <span className="h6 fw-semibold m-0 float-start">Total Margin:</span>
                                <span className="fw-semibold ms-2"><MoneyFormatter amount={sales_totals.sales_total_margin} /></span>
                            </div>
                            <div className="w-100 text-end mb-1">
                                <span className="h6 fw-semibold m-0 float-start">Total VAT:</span>
                                <span className="fw-semibold ms-2"><MoneyFormatter amount={sales_totals.sales_vat} /></span>
                            </div>
                        </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center mt-2">
                        <div className="sales-card-footer-right card card-header m-0 p-2 px-3 align-items-center justify-content-end" style={{ flex: '1 1 0' }}>
                            <div className="w-100 text-end mb-1">
                                <span className="h6 fw-semibold m-0 float-start">Cummulative Cost:</span>
                                <span className="fw-semibold ms-2"><MoneyFormatter amount={sales_cummulative.cumm_sales_cost} /></span><br />
                            </div>
                            <div className="w-100 text-end mb-1">
                                <span className="h6 fw-semibold m-0 float-start">Cummulative Gross:</span>
                                <span className="fw-semibold ms-2"><MoneyFormatter amount={sales_cummulative.cumm_sales_price} /></span><br />
                            </div>
                            <div className="w-100 text-end mb-1">
                                <span className="h6 fw-semibold m-0 float-start">Cummulative Margin:</span>
                                <span className="fw-semibold ms-2"><MoneyFormatter amount={sales_cummulative.cumm_sales_margin} /></span>
                            </div>
                            <div className="w-100 text-end mb-1">
                                <span className="h6 fw-semibold m-0 float-start">Cummulative VAT:</span>
                                <span className="fw-semibold ms-2"><MoneyFormatter amount={sales_cummulative.cumm_sales_vat} /></span>
                            </div>
                        </div>
                    </div>
                </div>

                <TableToggleButton tableSize={tableSize} setTableSize={setTableSize} />
            </div>

    )
}

export default memo(SalesTable);