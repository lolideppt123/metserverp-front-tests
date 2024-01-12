import { useEffect } from "react";
import moment from 'moment';

import { NumberFormatter } from '../../settings/MoneyFormatter';

export default function MaterialHistoryDataTable({ config }) {
    const { dataTableColumn, data } = config;

    return (
        <>
            <div className="container">
                <div className="app-table">
                    {typeof (data) == "undefined" || !data.length ? "No data yet. Spinner here" : (
                        <table className="table table-striped table-hover text-center">
                            <thead>
                                <tr>
                                    {dataTableColumn.map((value) => (
                                        <th key={value.key}>{value.title}</th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item, index) => (
                                    <tr key={index}>
                                        <td>{(moment(item.transaction_date)).format("MMM DD, YYYY")}</td>
                                        <td className='col col-lg-3'>{item.supplier}</td>
                                        <td className='col col-lg-3'>{item.product} </td>
                                        <td className='col col-lg-3'><NumberFormatter amount={item.quantity} /></td>
                                        <td className='col col-lg-3'>{item.portion != "" && <NumberFormatter amount={item.portion} />} </td>
                                        <td className='col col-lg-3'>{item.portion == "" ? <NumberFormatter amount={item.total} />: <>(<NumberFormatter amount={item.total} />)</>}</td>
                                        <td className='col col-lg-3'><NumberFormatter amount={item.running_total} /> </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </>
    )
}
