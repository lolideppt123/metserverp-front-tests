import { memo } from "react";
import dayjs from "dayjs";
import { DatePicker } from 'antd';

const FORMAT = 'YYYY-MM';
const YEAR = dayjs().year();
const MONTH = dayjs().month() + 1;
const MONTH_FORMATTED = MONTH < 10 ? `0${MONTH}` : MONTH;
const DEFAULT_DATE = `${YEAR}-${MONTH_FORMATTED}`;

const SalesYearMonthFilter = ({ setSalesFilter }) => {
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <DatePicker
                defaultValue={dayjs(DEFAULT_DATE, FORMAT)}
                picker="month"
                format={FORMAT}
                onChange={(date, dateString) =>
                    setSalesFilter(prev => ({
                        ...prev,
                        dateFilter: dateString
                    }))}
            />
        </div>
    )
}

export default memo(SalesYearMonthFilter);
