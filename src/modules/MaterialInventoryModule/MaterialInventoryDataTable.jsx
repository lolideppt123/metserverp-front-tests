import { Table } from 'antd';
import Spinner from '../../components/Fallback/Spinner';

export default function MaterialInventoryDataTable({ config }) {
    const { newDataColumn, data, loading, tableWidth } = config;
    return (
        <div className="contianer-fluid app-table-container">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {!data?.length ? (
                        <div className="py-4">
                            <h6 className="text-center px-3 mt-4 mb-1"><i>Nothing to display yet</i></h6>
                        </div>
                    ) : (
                        <div className="app-table material-inventory-data-table">
                            <Table
                                dataSource={data}
                                columns={newDataColumn}
                                rowKey={(data) => data.pk}
                                scroll={{
                                    x: tableWidth ? tableWidth : 900,
                                    y: null
                                }}
                                pagination={{
                                    pageSize: 10,
                                    showSizeChanger: true
                                }}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
