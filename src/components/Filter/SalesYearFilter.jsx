import { memo } from "react";
import dayjs from "dayjs";
import { DatePicker } from 'antd';

const YEAR_MONTH_FORMAT = 'YYYY';
const YEAR = dayjs().year();
const DEFAULT_DATE = `${YEAR}`;
const SalesYearFilter = ({ setSalesFilter }) => {
    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <DatePicker
                defaultValue={dayjs(DEFAULT_DATE)}
                picker="year"
                onChange={(date, dateString) =>
                    setSalesFilter(dateString)}
            />
        </div>
    )
}

export default memo(SalesYearFilter);
