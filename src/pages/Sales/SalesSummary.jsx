import axios from "axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';

import BarChartSummary from "../../components/Charts/BarChartSummary"
import SummaryPageHeader from "../../modules/SummaryModule/SummaryPageHeader";
import SalesSummaryDataTable from "../../modules/SummaryModule/SalesSummaryDataTable";

const DATE_FORMAT = 'YYYY-MM-DD';
const today = dayjs().format(DATE_FORMAT)
const last30Days = dayjs().subtract(360, 'days').format(DATE_FORMAT);

export default function SalesSummary() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const Labels = {
        BASE_ENTITY: 'Sales Summary',
        TABLE_TITLE: 'Sales Summary',
    }

    const [defaultDate, setDefaultDate] = useState([last30Days, today])
    const [salesData, setSalesData] = useState([]);
    const [salesData2, setSalesData2] = useState([]);
    const [options, setOptions] = useState("ALL")

    const postData = {
        "start": defaultDate[0],
        "end": defaultDate[1],
        "query": options,
    }

    useEffect(() => {
        let endpoints = [
            `${API_BASE_URL}sales/sales-summary/data-chart`,
            `${API_BASE_URL}sales/sales-summary/data-table`,
        ]

        axios.all(endpoints.map((endpoint) => axios.post(endpoint, postData, { headers: { 'Content-Type': 'application/json' } })))
            .then(axios.spread((data1, data2) => {
                // console.log(data1)
                // console.log(data2)
                setSalesData(data1.data)
                setSalesData2(data2.data)
            }))
            .catch((err) => {
                console.log(err.response)
            })
    }, [defaultDate, options])

    return (
        <>
            <SummaryPageHeader defaultDate={defaultDate} Labels={Labels} setDate={setDefaultDate} />
            {!salesData.length || !salesData2.length ? (
                <h6 className="text-center px-3 mt-4 mb-1"><i>Nothing to display yet</i></h6>
            ) : (
                <>
                    <BarChartSummary data={salesData} type={"sales"} options={options} />
                    <SalesSummaryDataTable data={salesData2} defaultDate={defaultDate} setOptions={setOptions} />
                </>
            )
            }
        </>


    )
}
