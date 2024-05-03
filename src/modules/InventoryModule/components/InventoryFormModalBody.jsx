import MoneyFormatter from "../../../settings/MoneyFormatter";

export default function InventoryFormModalBody({ invData = [], avgCost = 0, calcCost = 0, production_uprice = 0 }) {
    console.log(invData)
    return (
        <div className="col-md-12 mb-4 overflow-auto">
            {invData.map((item, index) => (
                <div key={`${item[0]?.product}.${index}`}>
                    <h6 className="fw-semibold text-center px-3 mt-4 mb-1">{item[0]?.product}</h6>
                    <table key={index} className="table table-sm mb-3">
                        <thead>
                            <tr>
                                <th scope='col col-sm'>Date</th>
                                <th scope='col col-sm'>Bought</th>
                                <th scope='col col-sm'>Remaining</th>
                                <th scope='col col-sm'>Deduct</th>
                                <th scope='col col-sm'>Left</th>
                                <th scope='col col-sm'>Unit Cost</th>
                                <th scope='col col-sm'>Total Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {item?.map((elem, i) => (

                                <tr key={`${i}.${elem.date}`}>
                                    <td>{elem.date}</td>
                                    <td>{elem.quantity_bought}</td>
                                    <td>{elem.quantity_remaining}</td>
                                    <td>({elem.quantity_deduct})</td>
                                    <td>{elem.quantity_left}</td>
                                    <td><MoneyFormatter amount={elem.unit_cost} /></td>
                                    <td><MoneyFormatter amount={elem.total_cost} /></td>
                                </tr>
                            ))}
                        </tbody>

                        <tfoot style={{ borderTop: "2px solid black" }}>
                            <tr>
                                <td colSpan={2} className='fw-bold bg-light h6'>Avg Cost</td>
                                <td className='bg-light'></td>
                                <td className='bg-light'></td>
                                <td className='bg-light'></td>
                                <td className='bg-light'></td>
                                <td className={`fw-bold bg-light h6`}><MoneyFormatter amount={avgCost[index]?.unit_cost} /></td>
                            </tr>
                            <tr>
                                <td colSpan={2} className='fw-bold bg-light h6'>Unit Price</td>
                                <td className='bg-light'></td>
                                <td className='bg-light'></td>
                                <td className='bg-light'></td>
                                <td className='bg-light'></td>
                                <td className={`fw-bold bg-light h6`}><MoneyFormatter amount={avgCost[index]?.unit_price} /></td>
                            </tr>
                            <tr>
                                <td colSpan={2} className='fw-bold bg-light h6'>Production Cost</td>
                                <td className='bg-light'></td>
                                <td className='bg-light'></td>
                                <td className='bg-light'></td>
                                <td className='bg-light'></td>
                                <td className={`fw-bold bg-light h6`}><MoneyFormatter amount={production_uprice[index]?.unit_price} /></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            ))}
        </div>
    )
}
