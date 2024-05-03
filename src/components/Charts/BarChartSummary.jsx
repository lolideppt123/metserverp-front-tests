import { useEffect } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from 'recharts';
import { NumberFormatter } from '../../settings/MoneyFormatter';

export default function BarChartSummary({ data, type, options }) {
    console.log(data)
    useEffect(() => {
        if (data?.length) {
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
                            <>
                                <h6 className="intro text-center mb-4">{payload[0].payload.start_date} ~ {payload[0].payload.end_date}</h6>

                                <span className="desc" style={{ color: "#4bc0c0" }}>{`${options == "CUSTOMERS" ? "Customer:" : "Product"}`} {payload[0].payload.rank_0}</span><br />
                                <p className="desc" style={{ color: "#4bc0c0" }}>{`Profit Margin: `} {<NumberFormatter amount={payload[0].payload.rank_0_margin} />}</p>

                                <span className="desc" style={{ color: "#8884d8" }}>{`${options == "CUSTOMERS" ? "Customer:" : "Product"}`} {payload[0].payload.rank_1}</span><br />
                                <p className="desc" style={{ color: "#8884d8" }}>{`Profit Margin: `} {<NumberFormatter amount={payload[0].payload.rank_1_margin} />}</p>

                                <span className="desc" style={{ color: "#82ca9d" }}>{`${options == "CUSTOMERS" ? "Customer:" : "Product"}`} {payload[0].payload.rank_2}</span><br />
                                <p className="desc" style={{ color: "#82ca9d" }}>{`Total Margin: `} {<NumberFormatter amount={payload[0].payload.rank_2_margin} />}</p>
                            </>
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
            {!data?.length ? (
                <h6 className="text-center px-3 mt-4 mb-1"><i>Nothing to display yet</i></h6>
            ) : (
                <div className="chart-box">


                    <ResponsiveContainer width={"100%"} height={400}>
                        <BarChart
                            // width={1000}
                            // height={400}
                            data={data}
                            margin={{
                                top: 10,
                                left: 20,
                                right: 20,
                                bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <YAxis tickLine={false} fontSize={12} />
                            <XAxis dataKey="date_label" tickLine={false} fontSize={12} />
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
                                        {/* <defs>
                                            <linearGradient id="colorSalesPrice" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#4bc0c0" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#4bc0c0" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorSalesCost" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#ff6565" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#ff6565" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorSalesMargin" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#73a839" stopOpacity={0.8} />
                                                <stop offset="95%" stopColor="#73a839" stopOpacity={0} />
                                            </linearGradient>
                                        </defs> */}
                                        {/* <Bar type='monotone' dataKey={'sales_price'} fill="url(#colorSalesPrice)" strokeWidth={1} name='Total Sales' />
                                        <Bar type='monotone' dataKey={'sales_cost'} fill="url(#colorSalesCost)" strokeWidth={1} name='Total Cost' />
                                        <Bar type='monotone' dataKey={'sales_margin'} fill="url(#colorSalesMargin)" strokeWidth={1} name='Total Profit' /> */}
                                        <Bar type='monotone' dataKey={'sales_price'} fill="#4bc0c0" strokeWidth={1} name='Total Sales' />
                                        <Bar type='monotone' dataKey={'sales_cost'} fill="#ff6565" strokeWidth={1} name='Total Cost' />
                                        <Bar type='monotone' dataKey={'sales_margin'} fill="#73a839" strokeWidth={1} name='Total Profit' />
                                        <Tooltip content={<CustomTooltip />} />
                                    </>
                                ) : (
                                    <>
                                        <Bar type='monotone' dataKey={'rank_0_margin'} fill='#4bc0c0' strokeWidth={1} name='Rank 1' />
                                        <Bar type='monotone' dataKey={'rank_1_margin'} fill='#8884d8' strokeWidth={1} name='Rank 2' />
                                        <Bar type='monotone' dataKey={'rank_2_margin'} fill='#82ca9d' strokeWidth={1} name='Rank 3' />
                                        <Tooltip content={<CustomTooltip />} />
                                    </>
                                )
                            )}
                        </BarChart >
                    </ResponsiveContainer>
                </div>
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