import { useEffect, useState } from "react";
import useAxiosFunction from '../../hooks/useAxiosFunction';
import dayjs from 'dayjs';
import MoneyFormatter, {NumberFormatter} from "../../settings/MoneyFormatter";

import BarChartSummary from "../../components/Charts/BarChartSummary"
import SummaryPageHeader from "../../modules/SummaryModule/SummaryPageHeader";
import SalesSummaryDataTable from "../../modules/SummaryModule/SalesSummaryDataTable";

import Spinner from "../../components/Fallback/Spinner";
import NoServerResponse from "../../components/Errors/NoServerResponse";

const DATE_FORMAT = 'YYYY-MM-DD';
const today = dayjs().format(DATE_FORMAT)
const last30Days = dayjs().subtract(1, 'year').format(DATE_FORMAT);

export default function SalesSummary() {
    const { loading: chartLoad, response: chart, error: chartErr, axiosFetch: chartFetch } = useAxiosFunction();
    const { loading: tableLoad, response: table, error: tableErr, axiosFetch: tableFetch } = useAxiosFunction();
    const { loading: totalsLoad, response: totals, error: totalsErr, axiosFetch: totalsFetch } = useAxiosFunction();

    const Labels = {
        BASE_ENTITY: 'Sales Summary',
        TABLE_TITLE: 'Sales Summary',
    }

    const [defaultDate, setDefaultDate] = useState([last30Days, today])
    const [options, setOptions] = useState("ALL")

    const postData = {
        "start": defaultDate[0],
        "end": defaultDate[1],
        "query": options,
    }

    const dataTableColumn = [
        {
            title: <div className='fs-md fw-bold text-center'>No.</div>,
            key: 'no',
            dataIndex: 'id',
            width: 65,
            render: (text, record, index) => <div className='fs-md fw-semibold text-center'>{index + 1}</div>
        },
        {
            title: <div className='fs-md fw-bold text-start'>{options !== "CUSTOMERS" ? "Product" : "Customer"}</div>,
            key: 'product_customer',
            dataIndex: ['product', 'customer'],
            width: 200,
            render: (text, record) => {
                return (
                    <div className={`fs-md fw-semibold text-uppercase`}>
                        {options !== "CUSTOMERS" ? (
                            <>
                                {record?.product?.substr(0, 17)}{record?.product?.length > 17 && '\u2026'}
                            </>
                        ) : (
                            <>
                                {record?.customer?.substr(0, 17)}{record?.customer?.length > 17 && '\u2026'}
                            </>
                        )}
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Gross Sales</div>,
            key: 'grossSales',
            dataIndex: 'sales_gross',
            sorter: (a, b) => a.sales_gross - b.sales_gross,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-end`}><MoneyFormatter amount={text} /></div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Cost of Sales</div>,
            key: 'costSales',
            dataIndex: 'sales_cost',
            sorter: (a, b) => a.sales_cost - b.sales_cost,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-end`}><MoneyFormatter amount={text} /></div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Margin</div>,
            key: 'marginSales',
            dataIndex: 'sales_margin',
            sorter: (a, b) => a.sales_margin - b.sales_margin,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-end`}><MoneyFormatter amount={text} /></div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>%Margin</div>,
            key: 'profitMargin',
            dataIndex: 'profit_margin',
            sorter: (a, b) => a.profit_margin - b.profit_margin,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-end`}><NumberFormatter amount={text} />%</div>
            }
        },
    ]

    useEffect(() => {
        const getData = async () => {
            await chartFetch({
                url: `sales/sales-summary/data-chart`,
                method: 'post',
                data: postData
            });
            await tableFetch({
                url: 'sales/sales-summary/data-table',
                method: 'post',
                data: postData
            });
            await totalsFetch({
                url: 'sales/sales-summary/data-table-totals',
                method: 'post',
                data: postData
            });
        }
        getData();
    }, [defaultDate, options])

    const config = {
        dataTableColumn,
        table,
        totals,
        defaultDate,
        options,
        setOptions,
    }

    return (
        <>
            <SummaryPageHeader defaultDate={defaultDate} Labels={Labels} setDate={setDefaultDate} />
            {
                chartLoad || tableLoad || totalsLoad ? (
                    <Spinner />
                ) : (
                    chartErr || tableErr || totalsErr ? (
                        <NoServerResponse error={chartErr} />
                    ) : (
                        <>
                            <BarChartSummary data={chart} type={"sales"} options={options} />
                            <SalesSummaryDataTable config={config} />
                        </>
                    )
                )

            }
        </>


    )
}
