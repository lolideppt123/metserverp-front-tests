import dayjs from 'dayjs';
import { NumberFormatter } from '../../settings/MoneyFormatter';

export default function SalesSummaryDataTable({ defaultDate, setOptions, data }) {
    console.log(data)

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
                        <select className='form-select form-select-sm' onChange={(e) => setOptions(e.target.value)}>
                            <option defaultValue={"ALL"} value="ALL">All</option>
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

            <div className="app-table">
                {data['serialized'] == undefined ? (
                    <h6 className="text-center px-3 mt-4 mb-1"><i>Nothing to display yet</i></h6>
                ) : (

                    <table className="table table-striped table-hover table-sm my-3">
                        <thead>
                            <tr>
                                <th className='text-center'>Date</th>
                                <th>Product</th>
                                <th>Customer</th>
                                <th className='text-center'>Sales</th>
                                <th className='text-center'>Cost of Sales</th>
                                <th className='text-center'>Margin</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data['serialized'].map((item, index) => (
                                <tr key={index}>
                                    <td className='text-center'>{(dayjs(item.sales_date)).format("MMM DD, YYYY")}</td>
                                    <td>{item.product_name}</td>
                                    <td>{item.customer}</td>
                                    <td className={`text-end`}><NumberFormatter amount={item.sales_total_price} /></td>
                                    <td className={`text-end`}><NumberFormatter amount={item.sales_total_cost} /></td>
                                    <td className={`text-end`}><NumberFormatter amount={item.sales_margin} /></td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot style={{ borderTop: "2px solid black" }}>
                            {data['sales_totals'].map((item, index) => (
                                <tr key={index}>
                                    <td className='text-start fw-bold bg-light'>Total</td>
                                    <td className='bg-light'></td>
                                    <td className='bg-light'></td>
                                    <td className={`text-end fw-bold bg-light`}><NumberFormatter amount={item.sales_price} /></td>
                                    <td className={`text-end fw-bold bg-light`}><NumberFormatter amount={item.sales_cost} /></td>
                                    <td className={`text-end fw-bold bg-light`}><NumberFormatter amount={item.sales_margin} /></td>
                                </tr>
                            ))}
                        </tfoot>

                    </table>
                )}
            </div>
        </div>
    )
}
