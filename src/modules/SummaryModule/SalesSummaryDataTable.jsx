import dayjs from 'dayjs';
import MoneyFormatter, { NumberFormatter } from '../../settings/MoneyFormatter';
import { Table } from 'antd';

export default function SalesSummaryDataTable({ config }) {
    const {
        dataTableColumn,
        table,
        defaultDate,
        options,
        setOptions,
    } = config

    if (table) {
        var footer_data = table[table.length - 1];
        var body_data = table.slice(0, table.length - 1);
    }

    return (
        <div className='container mt-3 p-4 border-top'>
            <div className="row">
                <div className="col-lg text-center">
                    <h4><u>Sales Breakdown</u></h4>
                </div>

            </div>
            <div className="row">
                <div className="col-lg-3 text-end">
                    <div className="input-group">
                        <select className='form-select form-select-sm' value={options} onChange={(e) => setOptions(e.target.value)}>
                            <option value="ALL">All</option>
                            <option value="PRODUCTS">Product Sales</option>
                            <option value="CUSTOMERS">Customer Sales</option>
                        </select>
                    </div>
                </div>
                <div className="col-lg-3"></div>
                <div className="col-lg-6">
                    <div className="d-flex flex-row-reverse bd-highlight">
                        <h6><i>{dayjs(defaultDate[0]).format('MMMM DD, YYYY')} ~ {dayjs(defaultDate[1]).format('MMMM DD, YYYY')}</i></h6>
                    </div>
                </div>
            </div>

            <div className="app-table mt-3">
                {table == undefined ? (
                    <h6 className="text-center px-3 mt-4 mb-1"><i>Nothing to display yet</i></h6>
                ) : (

                    <Table
                        columns={dataTableColumn}
                        rowKey={data => data.pk}
                        dataSource={body_data}
                        pagination={false}
                        scroll={{ x: 'max-content' }}
                        summary={(data) => {
                            let totalCost = 0;
                            let grossSales = 0;
                            let margin = 0;

                            data.forEach(({ sales_gross, sales_cost, sales_margin }) => {
                                totalCost += Number(sales_cost);
                                grossSales += Number(sales_gross);
                                margin += Number(sales_margin);
                            })

                            let profitMargin = Number(margin / totalCost) * 100;

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
                                        <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                            <MoneyFormatter
                                                amount={grossSales}
                                            />
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                            <MoneyFormatter
                                                amount={totalCost}
                                            />
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                            <MoneyFormatter
                                                amount={margin}
                                            />
                                        </Table.Summary.Cell>
                                        <Table.Summary.Cell className="bg-light text-end fw-bold h6">
                                            <NumberFormatter
                                                amount={profitMargin}
                                            />%
                                        </Table.Summary.Cell>
                                    </Table.Summary.Row>
                                </Table.Summary>
                            )
                        }}
                    />
                )}
            </div>
        </div>
    )
}
