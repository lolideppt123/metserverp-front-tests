import TableToggleButton from '../../components/CustomFields/TableToggleButton';
import Spinner from '../../components/Fallback/Spinner';
import { Table } from "antd";

export default function InventoryDataTable({ config }) {
    const { newDataColumn, data, loading, tableWidth, tableSize, setTableSize } = config;
    return (
        <div className="container-fluid app-table-container">
            {loading ? (
                <Spinner />
            ) : (
                <>
                    {!data?.length ? (
                        <div className="py-4">
                            <h6 className="text-center px-3 mt-4 mb-1"><i>Nothing to display yet</i></h6>
                        </div>
                    ) : (

                        <div className="app-table product-inventory-data-table">
                            <Table
                                dataSource={data}
                                columns={newDataColumn}
                                rowKey={(data) => data.product_pk}
                                scroll={{
                                    x: tableWidth ? tableWidth : 'max-content',
                                    // y: tableSize ? 500 : 'none'
                                }}
                                // pagination={false}
                            />
                        </div>
                    )}
                </>
            )}
        </div>
    )
}
