import { Table } from 'antd';
import Spinner from '../../components/Fallback/Spinner';


export default function CompanyDataTable({ config }) {
    const {
        dataTableColumn,
        data,
        isLoading
    } = config;

    return (
        <div className="container-fluid">
            {isLoading ? (
                <Spinner />
            ) : (
                !data?.length ? (
                    <div className="py-4">
                        <h6 className="text-center px-3 mt-4 mb-1"><i>Nothing to display yet</i></h6>
                    </div>
                ) : (
                    <div className="app-table company-data-table">
                        <Table
                            columns={dataTableColumn}
                            dataSource={data}
                            rowKey={data => data.id}
                            scroll={{ x: 'max-content' }}
                        // pagination={{
                        //     pageSize: 10,
                        //     showSizeChanger: true
                        // }}
                        />
                    </div>
                )
            )}
        </div>
    )
}
