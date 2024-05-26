import dayjs from 'dayjs';
import { Table } from 'antd';

export default function InventorySummaryDataTable({ config }) {
    const {
        dataTableColumn,
        dataTable,
        defaultDate
    } = config;
    return (
        <div className='container mt-3 p-4 border-top'>
            <div className="row">
                <div className="col-lg text-center">
                    <h4><u>Inventory Breakdown</u></h4>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                    <div className="d-flex flex-row-reverse bd-highlight">
                        <h6><i>{dayjs(defaultDate[0]).format('MMMM DD, YYYY')} ~ {dayjs(defaultDate[1]).format('MMMM DD, YYYY')}</i></h6>
                    </div>
                </div>
            </div>

            <div className="app-table mt-3">
                <Table
                    columns={dataTableColumn}
                    rowKey={data => data.pk}
                    dataSource={dataTable}
                    pagination={false}
                    scroll={{ x: 'max-content' }}
                />
            </div>
        </div>
    )
}
