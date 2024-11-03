import { useState, useMemo } from 'react'

function salesFilterFunc() {
    const initialData = {
        get_title: [],
        get_totals: [],
        get_cumm_totals: [],
        get_body: [],
    }
    const [CSVData, setCSVData] = useState(initialData);
    const [CSVLoading, setCSVLoading] = useState(false);

    const GenerateCSVData = (dataArray) => {

        setCSVLoading(true)
        if (dataArray) {
            // const titles = [];
            // const bodies = [];
            // const totals = [];
            // const cumulativeTotals = [];

            // console.log(dataArray)

            // dataArray['monthly_details'].forEach((item) => {
            //     titles.push({ data_title: item.month });
            //     bodies.push(item['transactions']);
            //     totals.push({
            //         sales_cost: item.total_cost,
            //         sales_price: item.total_gross,
            //         sales_total_margin: item.total_margin,
            //         sales_vat: item.total_VAT,
            //     });
            //     cumulativeTotals.push({
            //         cumm_sales_cost: item.cumulative_total_cost,
            //         cumm_sales_margin: item.cumulative_margin,
            //         cumm_sales_price: item.cumulative_total_gross,
            //         cumm_sales_vat: item.cumulative_total_VAT,
            //     });
            // });

            // setCSVData({
            //     get_title: titles,
            //     get_body: bodies,
            //     get_totals: totals,
            //     get_cumm_totals: cumulativeTotals,
            // });
            console.log("Generating CSV Data")
            // console.log(dataArray)

            setCSVData(initialData);

            dataArray?.map((item, index) => {
                setCSVData(prev => ({
                    get_title: [...prev.get_title, item[item.length - 1]],
                    get_cumm_totals: [...prev.get_cumm_totals, item[item.length - 2]],
                    get_totals: [...prev.get_totals, item[item.length - 3]],
                    get_body: [...prev.get_body]
                }))

                if (item.length <= 3) {

                    setCSVData(prev => ({
                        get_title: [...prev.get_title],
                        get_cumm_totals: [...prev.get_cumm_totals],
                        get_totals: [...prev.get_totals],
                        get_body: [...prev.get_body, []],
                    }))
                } else {

                    setCSVData(prev => ({
                        get_title: [...prev.get_title],
                        get_cumm_totals: [...prev.get_cumm_totals],
                        get_totals: [...prev.get_totals],
                        get_body: [...prev.get_body, item.slice(0, item.length - 3)],
                    }))
                }
            });
        }
        setCSVLoading(false);
    }

    return { GenerateCSVData, CSVData, CSVLoading };
}

export default salesFilterFunc