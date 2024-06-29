import dayjs from "dayjs";
import { DatePicker } from 'antd';

const YEAR_FORMAT = 'YYYY';
const CURRENT_YEAR = (dayjs().year()).toString();
export default function SalesMonthFilter({ setSalesFilter }) {
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <DatePicker defaultValue={dayjs(CURRENT_YEAR, YEAR_FORMAT)} picker="year" onChange={(date, dateString) => setSalesFilter(dateString)} />
        </div>
    )
}
