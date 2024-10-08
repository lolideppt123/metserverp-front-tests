import { memo } from "react";
import dayjs from "dayjs";
import { DatePicker } from 'antd';

const YEAR_MONTH_FORMAT = 'YYYY/MM';
const YEAR = dayjs().year();
const MONTH = "0" + (dayjs().month() + 1);
const DEFAULT_DATE = `${YEAR}/${MONTH}`;
const SalesMonthFilter = ({ setSalesFilter }) => {
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <DatePicker
                defaultValue={dayjs(DEFAULT_DATE, YEAR_MONTH_FORMAT)}
                picker="month"
                onChange={(date, dateString) =>
                    setSalesFilter(dateString)}
            />
        </div>
    )
}

export default memo(SalesMonthFilter);
