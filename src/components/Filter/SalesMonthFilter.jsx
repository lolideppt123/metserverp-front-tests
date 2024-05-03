import dayjs from "dayjs";
import { DatePicker } from 'antd';
import { useEffect } from "react";

const YEAR_FORMAT = 'YYYY';
const CURRENT_YEAR = (dayjs().year()).toString();
export default function SalesMonthFilter({ setSalesFilter }) {
    useEffect(() => {
        setSalesFilter(CURRENT_YEAR);
    }, [])
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <DatePicker defaultValue={dayjs(CURRENT_YEAR, YEAR_FORMAT)} picker="year" onChange={(date, dateString) => setSalesFilter(dateString)} />
        </div>
    )
}
