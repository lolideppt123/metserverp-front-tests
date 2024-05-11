import dayjs from 'dayjs';
import MoneyFormatter, { NumberFormatter } from '../../settings/MoneyFormatter';
import { Table } from 'antd';

export default function SalesSummaryDataTable({ config }) {
    const {
        dataTableColumn,
        table,
        totals,
        defaultDate,
        options,
        setOptions,
    } = config

    if (table) {
        var footer_data = table[table.length - 1];
        var body_data = table.slice(0, table.length - 1);
    }
console.log(footer_data)
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

                    // <table className="table table-striped table-hover table-sm my-3">
                    //     <thead>
                    //         <tr>
                    //             <th className='text-center'>No.</th>
                    //             {options !== "CUSTOMERS" ? (
                    //                 <th className='text-center'>Product</th>
                    //             ) : (
                    //                 <th className='text-center'>Customer</th>
                    //             )}
                    //             <th className='text-center'>Gross Sales</th>
                    //             <th className='text-center'>Cost of Sales</th>
                    //             <th className='text-center'>Margin</th>
                    //             <th className='text-center'>%Margin</th>
                    //         </tr>
                    //     </thead>
                    //     <tbody>
                    //         {body_data?.map((item, index) => (
                    //             <tr key={index}>
                    //                 <td className='text-center'>{index + 1}</td>
                    //                 {options !== "CUSTOMERS" ? (
                    //                     <td className='text-center'>{item?.product?.substr(0, 17)}{item?.product?.length > 17 ? '\u2026' : ""}</td>
                    //                 ) : (
                    //                     <td className='text-center'>{item?.customer?.substr(0, 17)}{item?.customer?.length > 17 ? '\u2026' : ""}</td>
                    //                 )}
                    //                 <td className={`text-end`}><MoneyFormatter amount={item.sales_gross} /></td>
                    //                 <td className={`text-end`}><MoneyFormatter amount={item.sales_cost} /></td>
                    //                 <td className={`text-end`}><MoneyFormatter amount={item.sales_margin} /></td>
                    //                 <td className={`text-end`}><NumberFormatter amount={item.profit_margin} />%</td>
                    //             </tr>
                    //         ))}
                    //     </tbody>

                    //     <tfoot style={{ borderTop: "2px solid black" }}>
                    //         <tr>
                    //             <td className='text-center fw-bold bg-light'>Total</td>
                    //             <td className='bg-light'></td>
                    //             <td className={`text-end fw-bold bg-light`}><MoneyFormatter amount={footer_data?.cumm_sales_price} /></td>
                    //             <td className={`text-end fw-bold bg-light`}><MoneyFormatter amount={footer_data?.cumm_sales_cost} /></td>
                    //             <td className={`text-end fw-bold bg-light`}><MoneyFormatter amount={footer_data?.cumm_sales_margin} /></td>
                    //             <td className='text-end fw-bold bg-light'><NumberFormatter amount={(footer_data?.cumm_sales_margin / footer_data?.cumm_sales_cost) * 100} />%</td>
                    //         </tr>
                    //     </tfoot>

                    // </table>

                    <Table
                        columns={dataTableColumn}
                        rowKey={data => data.pk}
                        dataSource={body_data}
                        pagination={false}
                        summary={(data) => {
                            let totalCost = 0;
                            let grossSales = 0;
                            let margin = 0;

                            data.forEach(({sales_gross, sales_cost, sales_margin}) => {
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
