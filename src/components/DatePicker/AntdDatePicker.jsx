import dayjs from 'dayjs';
import { DatePicker, Space } from 'antd';

const { RangePicker } = DatePicker;
const DATE_FORMAT_UI = 'MMMM DD, YYYY';


export default function AntdDatePicker({ defaultDate, setDate }) {

    // console.log(defaultDate)

    const handleDateChange = (values) => {
        const start = dayjs(values[0].$d).format('YYYY-MM-DD')
        const end = dayjs(values[1].$d).format('YYYY-MM-DD')
        // console.log(start, "---", end)
        setDate([start, end])
    }

    return (
        <Space direction="vertical" size={12}>
            <RangePicker
                format={DATE_FORMAT_UI}
                onChange={(values) => values !== null && handleDateChange(values)}
                defaultValue={[dayjs(defaultDate[0]), dayjs(defaultDate[1])]}
            />
        </Space>

    )
}
