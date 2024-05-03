import moment from 'moment';
import DropDown from '../../components/DropDown/DropDown';
import Spinner from '../../components/Fallback/Spinner';

import MoneyFormatter, { NumberFormatter } from '../../settings/MoneyFormatter';

export default function MaterialHistoryDataTable({ config }) {
    const {
        Labels,
        dataTableColumn,
        data,
        setData,
        loading
    } = config;
    console.log(data)
    return (
        <>
            <div className="container">
                {
                    loading ? (
                        <Spinner />
                    ) : (
                        <div className="app-table">
                            {!data?.length ? (
                                <div className="py-4">
                                    <h6 className="text-center px-3 mt-4 mb-1"><i>No result found.</i></h6>
                                </div>
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
                                                <td className='col col-lg-2'>{(moment(item.transaction_date)).format("MMM DD, YYYY")}</td>
                                                <td className='col col-lg-2'>{item.supplier}</td>
                                                {item?.type == "prod" ? (
                                                    <>
                                                        <td className='col col-lg-2 text-danger'>{item.product} </td>
                                                        <td className={`col col-lg text-danger`}>(<NumberFormatter amount={item.quantity} />)</td>
                                                        <td className='text-center'>---</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td className='col col-lg-2'>{item.material} </td>
                                                        <td className={`col col-lg`}><NumberFormatter amount={item.quantity} /></td>
                                                        <td className={`col col-lg`}><NumberFormatter amount={item.stock} /></td>
                                                    </>
                                                )}
                                                <td className={`col col-lg-1 ${item?.type == "prod" && "text-danger"}`}><MoneyFormatter amount={item.uprice} /></td>
                                                <td className='col col-lg-1'><NumberFormatter amount={item.running_total} /> </td>
                                                <td className='pe-4'>
                                                    {item?.type == "mat" ? (
                                                        <DropDown
                                                            name={`${item.material} : Record ${index + 1}`}
                                                            link2={`/inventory/materials/transaction/${item.id}/edit`}
                                                            link3={`inventory/materials/${item.id}`}
                                                            api_url={`${Labels.API_URL}`}
                                                            setData={(data) => setData(data)}
                                                        />
                                                    ) : (
                                                        // <DropDown
                                                        //     link2={`/inventory/products/transaction/${item.id}/edit`}
                                                        // />
                                                        <></>
                                                    )}

                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )
                }
            </div>
        </>
    )
}
