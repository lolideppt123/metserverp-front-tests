import { useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { NumberFormatter } from '../../settings/MoneyFormatter';

export default function BarChartSummary({ data, type, options }) {
    console.log(data)
    useEffect(() => {
        if (data.length) {
            data.forEach((item) => {
                item.total_cost = parseFloat(item.total_cost)
            })
        }

    }, [data])

    const CustomTooltip = ({ active, payload, label }) => {
        // console.log(payload)
        // payload.map((item) => console.log(item))
        // console.log(label)
        if (active && payload && payload.length) {
            return (
                <div className="custom-tooltip bg-light p-3 border border-dark">
                    {type == "sales" ? (
                        options == "ALL" ? (
                            <>
                                <p className="intro">{payload[0].payload.start_date} ~ {payload[0].payload.end_date}</p>
                                <p className="desc" style={{ color: "#4bc0c0" }}>{`Total Sales: `} {<NumberFormatter amount={payload[0].payload.sales_price} />}</p>
                                <p className="desc" style={{ color: "#ff6565" }}>{`Total Cost: `} {<NumberFormatter amount={payload[0].payload.sales_cost} />}</p>
                                <p className="desc" style={{ color: "#73a839" }}>{`Total Margin: `} {<NumberFormatter amount={payload[0].payload.sales_margin} />}</p>
                            </>
                        ) : (
                            options == "CUSTOMERS" ? (
                                <>
                                    <p className="intro">{`${payload[0].payload.customer}`}</p>
                                    <p className="desc" style={{ color: "#4bc0c0" }}>{`Total Sales: `} {<NumberFormatter amount={payload[0].payload.sales_price} />}</p>
                                    <p className="desc" style={{ color: "#ff6565" }}>{`Total Cost: `} {<NumberFormatter amount={payload[0].payload.sales_cost} />}</p>
                                    <p className="desc" style={{ color: "#73a839" }}>{`Total Margin: `} {<NumberFormatter amount={payload[0].payload.sales_margin} />}</p>
                                </>
                            ) : (
                                <>
                                    <p className="intro">{`${payload[0].payload.product}`}</p>
                                    <p className="desc" style={{ color: "#4bc0c0" }}>{`Total Sales: `} {<NumberFormatter amount={payload[0].payload.sales_price} />}</p>
                                    <p className="desc" style={{ color: "#ff6565" }}>{`Total Cost: `} {<NumberFormatter amount={payload[0].payload.sales_cost} />}</p>
                                    <p className="desc" style={{ color: "#73a839" }}>{`Total Margin: `} {<NumberFormatter amount={payload[0].payload.sales_margin} />}</p>
                                </>
                            )
                        )
                    ) : (
                        <>
                            <p className="intro">{`${payload[0].payload.product_name}`}</p>
                            <p className="desc" style={{ color: "#4bc0c0" }}>{`Total Cost: `} {<NumberFormatter amount={payload[0].payload.total_cost} />}</p>
                        </>
                    )
                    }
                </div >
            )
        }

        return null;
    };

    return (
        <>
            {!data.length ? (
                <h6 className="text-center px-3 mt-4 mb-1"><i>Nothing to display yet</i></h6>
            ) : (
                <BarChart
                    width={1150}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        left: 20,
                        right: 20,
                        bottom: 10,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <YAxis />
                    <Legend verticalAlign="top" height={36} />
                    {type == "inventory" ? (
                        <>
                            <Bar type='monotone' dataKey={'total_price'} fill='#4bc0c0' strokeWidth={1} />
                            <XAxis dataKey={"product_name"} />
                            <Tooltip content={<CustomTooltip />} />
                        </>

                    ) : (
                        // IF
                        options == "ALL" ? (
                            <>
                                <Bar type='monotone' dataKey={'sales_price'} fill='#4bc0c0' strokeWidth={1} name='Total Sales' />
                                <Bar type='monotone' dataKey={'sales_cost'} fill='#ff6565' strokeWidth={1} name='Total Cost' />
                                <Bar type='monotone' dataKey={'sales_margin'} fill='#73a839' strokeWidth={1} name='Total Profit' />
                                <Tooltip content={<CustomTooltip />} />
                                <XAxis dataKey={'start_date'} />
                            </>
                        ) : (
                            // ELSE IF
                            options == "CUSTOMERS" ? (
                                <>
                                    <Bar type='monotone' dataKey={'sales_price'} fill='#4bc0c0' strokeWidth={1} name='Total Sales' />
                                    <Bar type='monotone' dataKey={'sales_cost'} fill='#ff6565' strokeWidth={1} name='Total Cost' />
                                    <Bar type='monotone' dataKey={'sales_margin'} fill='#73a839' strokeWidth={1} name='Total Profit' />
                                    <XAxis dataKey="customer" />
                                    <Tooltip content={<CustomTooltip />} />
                                </>
                            ) : (
                                // ELSE
                                <>
                                    <Bar type='monotone' dataKey={'sales_price'} fill='#4bc0c0' strokeWidth={1} name='Total Sales' />
                                    <Bar type='monotone' dataKey={'sales_cost'} fill='#ff6565' strokeWidth={1} name='Total Cost' />
                                    <Bar type='monotone' dataKey={'sales_margin'} fill='#73a839' strokeWidth={1} name='Total Profit' />
                                    <XAxis dataKey="customer" />
                                    <Tooltip content={<CustomTooltip />} />
                                </>

                            )
                        )
                    )}
                </BarChart >
            )
            }
        </>
    )
}

const renderLegend = (props) => {
    const { payload } = props;
    // console.log(payload)
    return (
        <ul>
            {
                payload.map((entry, index) => (
                    <li key={`item-${index}`}>Total Sales</li>
                ))
            }
        </ul>
    );
}

const func = (props) => {
    const { payload } = props;
    console.log(payload)
}