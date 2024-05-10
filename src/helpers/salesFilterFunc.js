import React, { useState } from 'react'

function salesFilterFunc() {
    const initialData = {
        get_title: [],
        get_totals: [],
        get_cumm_totals: [],
        get_body: [],
    }
    const [CSVData, setCSVData] = useState(initialData);

    const GenerateCSVData = (dataArray) => {

        if (dataArray) {

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
    }

    return { GenerateCSVData, CSVData };
}

export default salesFilterFunc