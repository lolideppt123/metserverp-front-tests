import { Spin, Flex } from 'antd';

export default function CompanyDataTable({ config }) {
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
                                            <td className='col col-lg-5'>{item.company_name}</td>
                                            <td className='col col-lg-2'>{item.contact_person ? item.contact_person : "---"}</td>
                                            <td className='col col-lg-2'>{item.contact_number ? item.contact_number : "---"}</td>
                                            <td className='col col-lg-3'>{item.company_address ? item.company_address : "---"}</td>
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
