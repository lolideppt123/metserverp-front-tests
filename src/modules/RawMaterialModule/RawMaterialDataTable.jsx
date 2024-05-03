import { NavLink } from 'react-router-dom';
import { Spin, Flex } from 'antd';
import DropDown from '../../components/DropDown/DropDown';

export default function RawMaterialDataTable({ config }) {
    const {
        Labels,
        dataTableColumn,
        data,
        setData,
        loading
    } = config;
    console.log(data)
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
                    {!data?.length ? (
                        <div className="py-4">
                            <h6 className="text-center px-3 mt-4 mb-1"><i>Nothing to display yet</i></h6>
                        </div>
                    ) : (
                        <div className="app-table">
                            <table className="table table-striped table-hover">
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
                                            <td className='col col-lg-5'><NavLink to={`${item.id}`}>{item.material_name}</NavLink></td>
                                            <td className='col col-lg-2 text-center'>{item.material_min_stock} {item.material_unit_abbv}</td>
                                            <td className='col col-lg-2'>{item.material_unit_name}</td>
                                            <td className='col col-lg-3'>{item.material_note}</td>
                                            <td className='pe-4'>
                                                <DropDown
                                                    name={item.material_name}
                                                    id={item.id}
                                                    link2={`${item.id}`}
                                                    api_url={`${Labels.API_URL}`}
                                                    setData={(data) => setData(data)}
                                                    link3={`${Labels.API_URL}${item.id}`}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
