import moment from 'moment';
import { NavLink } from 'react-router-dom';

import DropDownMenu from '../../components/DropDown/DropDownMenu';
import DropDownItem from '../../components/DropDown/DropDownItem';
import { NumberFormatter } from '../../settings/MoneyFormatter';

import { FiEye, FiEdit, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';

export default function InventoryHistoryDataTable({ config }) {
    const { dataTableColumn, data } = config;
    console.log(data.length)
    console.log(data)
    return (
        <>
            {/* {console.log(data.length)} */}
            <div className="container">
                <div className="app-table">
                    {!data.length ? ("hello") : (
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
                                        <td className='col col-lg-3'>{item.cust_supp}</td>
                                        <td className='col col-lg-3'>{item.product_name} </td>
                                        <td className='text-center'>
                                            {item.type == "inv" ? (
                                                <NumberFormatter amount={item.quantity} />
                                            ) : (
                                                <>(<NumberFormatter amount={item.quantity} />)</>
                                            )}
                                        </td>
                                        <td className='text-center'><NumberFormatter amount={item.running_quantity} /></td>
                                        <td>
                                            {item.type == "inv" ? (
                                                <DropDownMenu mainicon={<FiMoreHorizontal style={{ height: '20px', width: '20px' }} />} >
                                                    <DropDownItem icon={<FiEye />} text={"Show"} />
                                                    <NavLink className="link-underline-opacity-0" to={`/inventory/transaction/${item.id}/edit`}>
                                                        <DropDownItem icon={<FiEdit />} text={"Edit"} />
                                                    </NavLink>
                                                    <DropDownItem icon={<FiTrash2 />} text={"Delete"} optionTextStyle={"text-center text-muted"} />
                                                </DropDownMenu>
                                            ) : (
                                                <DropDownMenu mainicon={<FiMoreHorizontal style={{ height: '20px', width: '20px' }} />} >
                                                    <DropDownItem icon={<FiEye />} text={"Show"} />
                                                    <NavLink className="link-underline-opacity-0" to={`/sales/transaction/${item.id}/edit`}>
                                                        <DropDownItem icon={<FiEdit />} text={"Status"} optionTextStyle={"text-center"} />
                                                    </NavLink>
                                                    <DropDownItem icon={<FiTrash2 />} text={"Delete"} optionTextStyle={"text-center text-muted"} />
                                                </DropDownMenu>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div >
        </>
    )
}
