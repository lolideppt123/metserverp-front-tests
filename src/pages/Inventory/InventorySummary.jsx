import axiosInstance from "../../helpers/axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import BarChartSummary from "../../components/Charts/BarChartSummary"
import SummaryPageHeader from "../../modules/SummaryModule/SummaryPageHeader";

const DATE_FORMAT = 'YYYY-MM-DD';
const today = dayjs().format(DATE_FORMAT)
const last30Days = dayjs().subtract(360, 'days').format(DATE_FORMAT);

export default function InventorySummary() {
    const Labels = {
        BASE_ENTITY: 'Inventory Summary',
        TABLE_TITLE: 'Inventory Summary',
    }

    const [defaultDate, setDefaultDate] = useState([last30Days, today]);
    const [IsLoading, setIsLoading] = useState(false);
    const [errors, setError] = useState()
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        setIsLoading(true)
        axiosInstance
            .post('inventory/inventory-summary', { "start": defaultDate[0], "end": defaultDate[1] }, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                console.log(response.data)
                setInventoryData(response.data)
                // enqueueSnackbar(response.data.message, { variant: 'success' });
                // reset();
                // history.back();
                setIsLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setError(err)
                // console.log(err.response.data)
                // setError(`${err.response.data.label}`, {
                //     type: "manual",
                //     message: `${err.response.data.message}`
                // })
                setIsLoading(false)
            })
    }, [defaultDate])

    return (
        <>
            <SummaryPageHeader defaultDate={defaultDate} Labels={Labels} setDate={setDefaultDate} />
            {
                IsLoading ?
                    (
                        <Spinner />
                    ) : (
                        errors ?
                            (
                                <NoServerResponse error={errors} />
                            ) : (
                                <BarChartSummary data={inventoryData} type={"inventory"} />
                            )
                    )
            }

        </>
    )
}
