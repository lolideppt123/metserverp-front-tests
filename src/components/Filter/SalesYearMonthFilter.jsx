import { memo } from "react";
import dayjs from "dayjs";
import { DatePicker } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { selectSalesFilters, updateSalesFilters } from "../../features/sales/salesSlice";

const FORMAT = 'YYYY-MM';
const YEAR = dayjs().year();
const MONTH = dayjs().month() + 1;
const MONTH_FORMATTED = MONTH < 10 ? `0${MONTH}` : MONTH;
const DEFAULT_DATE = `${YEAR}-${MONTH_FORMATTED}`;

const SalesYearMonthFilter = () => {

    const dispatch = useDispatch();
    const salesFilter = useSelector(selectSalesFilters);

    const dateFilter = salesFilter?.dateFilter || DEFAULT_DATE;

    return (
        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center">
            <DatePicker
                defaultValue={dayjs(DEFAULT_DATE, FORMAT)}
                picker="month"
                format={FORMAT}
                value={dayjs(dateFilter, FORMAT)}
                onChange={(date, dateString) => {
                    // Dispatch only if date is valid
                    if(dayjs(dateString, "YYYY-MM").isValid()) {
                        dispatch(updateSalesFilters({dateFilter: dateString || DEFAULT_DATE}));
                    }
                }}
            />
        </div>
    )
}

export default memo(SalesYearMonthFilter);
