import moment from 'moment';
import dayjs from 'dayjs'
import { NavLink } from 'react-router-dom';
import { Spin, Flex } from 'antd';

import DropDownMenu from '../../components/DropDown/DropDownMenu';
import DropDownItem from '../../components/DropDown/DropDownItem';
import ModalForm from '../../components/Modal/ModalForm';
import ModalFormItem from '../../components/Modal/ModalForm';
import { NumberFormatter } from '../../settings/MoneyFormatter';

import { FiEye, FiEdit, FiTrash2, FiMoreHorizontal } from 'react-icons/fi';

export default function SalesDataTable({ config }) {
    const { dataTableColumn, data, loading } = config;

    return (
        <div className="container">
            {loading ? (
                <div className="py-5">
                    <Flex vertical>
                        <Spin />
                    </Flex>
                </div>
            ) : (
                <>
                    {!data.length ? (
                        <div className="py-4">
                            <h6 className="text-center px-3 mt-4 mb-1"><i>Nothing to display yet</i></h6>
                        </div>
                    ) : (
                        <div className="app-table">
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr key='1000'>
                                        {dataTableColumn.map((value) => (
                                            <th key={value.key}>{value.title}</th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((item, index) => (

                                        <tr key={index}>
                                            {/* <td className='col col-lg-4'>{item.sales_dr}</td>
                                        <td className='col col-lg-4'>{item.sales_invoice}</td> 
                                    */}
                                            <td className={`${item.sales_status == "PAID" ? "paid" : "unpaid"}`}>{(dayjs(item.sales_date)).format("MMM DD, YYYY")}</td>
                                            <td className={`col col-lg-3 ${item.sales_status == "PAID" ? "paid" : "unpaid"}`}>{item.product_name}</td>
                                            <td className={` ${item.sales_status == "PAID" ? "paid" : "unpaid"}`}>{item.customer}</td>
                                            <td className={`${item.sales_status == "PAID" ? "paid" : "unpaid"} text-end`}>{item.sales_quantity}</td>
                                            {/* <td className={`${item.sales_status == "PAID" ? "paid" : "unpaid"}`}><NumberFormatter amount={item.sales_unit_cost} /></td>*/}
                                            <td className={`${item.sales_status == "PAID" ? "paid" : "unpaid"} text-end`}><NumberFormatter amount={item.sales_total_cost} /></td>
                                            {/* <td className={`${item.sales_status == "PAID" ? "paid" : "unpaid"}`}><NumberFormatter amount={item.sales_unit_price} /></td> */}
                                            <td className={`${item.sales_status == "PAID" ? "paid" : "unpaid"} text-end`}><NumberFormatter amount={item.sales_total_price} /></td>
                                            <td className={`${item.sales_status == "PAID" ? "paid" : "unpaid"} text-end`}><NumberFormatter amount={item.sales_margin} /></td>
                                            {/* <td className={`${item.sales_status == "PAID" ? "paid" : "unpaid"} text-end`}>{item.sales_margin_percent}%</td> */}
                                            <td><span className={`px-2 py-1 ${item.sales_status == "PAID" ? "paid-status" : "unpaid-status"}`}>{item.sales_status}</span></td>
                                            {item.sales_status == "PAID" ? (
                                                <td className="paid">{(dayjs(item.sales_paid_date)).format("MMM DD, YYYY")}</td>
                                            ) : (
                                                <td className="unpaid text-center">---</td>
                                            )}
                                            <td className='pe-4'>
                                                <DropDownMenu mainicon={<FiMoreHorizontal style={{ height: '20px', width: '20px' }} />} >
                                                    {/* <NavLink className="link-underline-opacity-0" to={`/sales/transaction/${item.pk}/show`}>
                                                <DropDownItem icon={<FiEye />} text={"Show"} />
                                            </NavLink> */}
                                                    <ModalForm icon={<FiEye />} text={"Show"} />
                                                    {/* <ModalFormItem /> */}
                                                    {/* </ModalForm> */}
                                                    <NavLink className="link-underline-opacity-0" to={`/sales/transaction/${item.pk}/edit`}>
                                                        <DropDownItem icon={<FiEdit />} text={"Status"} optionTextStyle={"text-center"} />
                                                    </NavLink>
                                                    <DropDownItem icon={<FiTrash2 />} text={"Delete"} optionTextStyle={"text-center text-muted"} />
                                                </DropDownMenu>
                                            </td>
                                        </tr>

                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div >
    )
}
