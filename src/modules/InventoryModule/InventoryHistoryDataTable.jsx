import moment from 'moment';
import MoneyFormatter, { NumberFormatter } from '../../settings/MoneyFormatter';
import DropDown from '../../components/DropDown/DropDown';
import Spinner from '../../components/Fallback/Spinner';
import { Table } from 'antd';

export default function InventoryHistoryDataTable({ config }) {
    const {
        Labels,
        dataTableColumn,
        data,
        setData,
        loading
    } = config;
    const columnData = [
        ...dataTableColumn,
        {
            title: '',
            key: 'action',
            dataIndex: ['id', 'type'],
            render: (text, record) => {
                return (
                    <DropDownMenu mainicon={<FiMoreHorizontal style={{ height: '20px', width: '20px' }} />} >
                        <NavLink className="link-underline-opacity-0 not-allowed">
                            <DropDownItem icon={<FiEye className='text-muted' />} text={"Show"} optionTextStyle={"text-center text-muted"} />
                        </NavLink>
                        {record.type == 'inv' ? (
                            <NavLink className="link-underline-opacity-0" to={`/inventory/products/transaction/${record.id}/edit`}>
                                <DropDownItem icon={<FiEdit />} text={"Edit"} />
                            </NavLink>
                        ) : (
                            <NavLink className="link-underline-opacity-0" to={`/sales/transaction/${record.id}/edit`}>
                                <DropDownItem icon={<FiEdit />} text={"Edit"} />
                            </NavLink>
                        )}
                        <NavLink className="link-underline-opacity-0 not-allowed">
                            <DropDownItem icon={<FiTrash2 className='text-muted' />} text={"Delete"} optionTextStyle={"text-center text-muted"} />
                        </NavLink>
                    </DropDownMenu>
                )
            }
        }
    ]

    return (
        <>
            {/* {console.log(data.length)} */}
            <div className="container">
                <div className="app-table">
                    {!data?.length ? (
                        // <Spinner />
                        <Table />
                    ) : (
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
                                        <td className='col col-lg'>{index + 1}</td>
                                        <td>{(moment(item.transaction_date)).format("MMM DD, YYYY")}</td>
                                        <td className={`col col-lg ${item.type !== "inv" && "text-danger"}`}>{item.cust_supp}</td>
                                        <td className={`col col-lg ${item.type !== "inv" && "text-danger"}`}>{item.product_name}</td>
                                        <td className={`text-center ${item.type !== "inv" && "text-danger"}`}>(<NumberFormatter amount={item.quantity} />)</td>
                                        {item.type == "inv" ? (
                                            <>
                                                <td className='text-center'><NumberFormatter amount={item.stock} /></td>
                                                <td className='text-center'><MoneyFormatter amount={item.u_cost} /></td>
                                                <td className='text-center'>---</td>
                                            </>
                                        ) : (
                                            <>
                                                <td className='text-center'>---</td>
                                                <td className='text-center text-danger'><MoneyFormatter amount={item.u_cost} /></td>
                                                <td className={`text-center ${item?.u_price > item.u_cost ? "text-success" : "text-danger"}`}><MoneyFormatter amount={item.u_price} /></td>
                                            </>
                                        )}
                                        <td className='text-center'><NumberFormatter amount={item.running_quantity} /></td>
                                        <td>
                                            {item.type == "inv" ? (
                                                <DropDown
                                                    name={`${item.product_name} : Record ${index + 1}`}
                                                    link2={`/inventory/products/transaction/${item.id}/edit`}
                                                    link3={`inventory/transaction/${item.id}/edit`}
                                                    api_url={`${Labels.API_URL}`}
                                                    setData={(data) => setData(data)}
                                                />
                                            ) : (
                                                // <DropDown
                                                //     name={`Record ${index + 1}`}
                                                //     link2={`/sales/transaction/${item.id}/edit`}
                                                //     link3={`sales/transaction/${item.id}/edit`}
                                                //     api_url={`${Labels.API_URL}`}
                                                //     setData={(data) => setData(data)}
                                                // />
                                                <></>
                                            )}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        // <Table
                        //     columns={columnData}
                        //     rowKey={data => data.pk}
                        //     dataSource={data}
                        // />
                    )}
                </div>
            </div >
        </>
    )
}
