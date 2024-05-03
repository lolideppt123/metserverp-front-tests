import { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';
import { FiDownload } from 'react-icons/fi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export default function CSVExportByMonth({ title, body, foot, endFoot }) {

    const HEADER = [
        { label: "DR", key: "sales_dr" },
        { label: "INV", key: "sales_invoice" },
        { label: "CUSTOMERS", key: "customer" },
        { label: "QUANTITY", key: "sales_quantity" },
        { label: "U/PRICE", key: "sales_unit_price" },
        { label: "SALES", key: "sales_total_price" },
        { label: "GROSS SALES", key: "sales_gross_price" },
        { label: "U/COST", key: "sales_unit_cost" },
        { label: "TOTAL COST", key: "sales_total_cost" },
        { label: "TAX", key: "sales_VAT" },
        { label: "MARGIN", key: "sales_margin" },
        { label: "%MARGIN", key: "sales_margin_percent" },
        { label: "DATE PAID", key: "sales_paid_date" },
    ]



    const [dataCopy, setDataCopy] = useState();
    const [CSVDATA, setCSVDATA] = useState([]);

    const header = HEADER.map(item => item.label);
    const headerKeys = HEADER.map(item => item.key);

    useEffect(() => {
        if (body) {
            setDataCopy(body);
            if (dataCopy) {
                const csvExport = [];
                csvExport.push(title['data_title'] ? [title['data_title']] : [""]);
                csvExport.push(header);
                dataCopy.map((item, index) => {
                    let entryRow = [];

                    headerKeys.map(key => {
                        item[key] ? entryRow.push(item[key]) : entryRow.push("")
                    })
                    csvExport.push(entryRow);


                    //             totalRow = [];
                    //             cummRow = [];
                    //             console.log("==============NEW LINE===================")
                })
                let totalRow = [];
                let cummRow = [];
                headerKeys.map(key => {
                    if (key === 'sales_total_cost') {
                        // sales_costt
                        totalRow.push(foot['sales_cost'] ? foot['sales_cost'] : "")
                        cummRow.push(endFoot['cumm_sales_cost'])
                    }
                    else if (key === 'sales_gross_price') {
                        // sales_price
                        totalRow.push(foot['sales_price'] ? foot['sales_price'] : "")
                        cummRow.push(endFoot['cumm_sales_price'])
                    }
                    else if (key === 'sales_margin') {
                        // sales_total_margin
                        totalRow.push(foot['sales_total_margin'] ? foot['sales_total_margin'] : "")
                        cummRow.push(endFoot['cumm_sales_margin'])
                    }
                    else if (key === 'sales_VAT') {
                        // sales_vat
                        totalRow.push(foot['sales_vat'] ? foot['sales_vat'] : "")
                        cummRow.push(endFoot['cumm_sales_vat'])
                    }
                    else {
                        totalRow.push("")
                        cummRow.push("")
                    }
                })
                totalRow[0] = "Total";
                cummRow[0] = "Cummulative";
                csvExport.push(totalRow);
                csvExport.push(cummRow);
                csvExport.push([]);
                setCSVDATA(csvExport);
            }
        }
    }, [body])

    return (
        <>
            {dataCopy ? (
                CSVDATA.length > 0 ? (
                    <CSVLink
                        data={CSVDATA}
                        filename={`${dayjs(title['data_title']).format("MMMM YYYY")}_Sales`}
                        target='_blank'
                        style={{ textDecoration: 'none !important' }}
                    >
                        <div>
                            <FiDownload className='nav-link-icon' style={{ fontSize: '1.35em' }} />
                        </div>
                    </CSVLink>
                ) : (<></>)
            ) : (
                <Spin
                    style={{ minWidth: '90px' }}
                    indicator={
                        <LoadingOutlined
                            style={{
                                fontSize: 18,
                                color: '#6610f2',
                                margin: '0 8px 3px 0'
                            }}
                            spin
                        />
                    }
                />
            )}
        </>
    )
}
