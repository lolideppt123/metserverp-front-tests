import { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';
import { FiDownload } from 'react-icons/fi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function CSVExport({ data, year = "", month = "" }) {

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
        if (data) {
            setDataCopy(data);
            if (dataCopy) {
                const csvExport = [];
                dataCopy.map((item, index) => {
                    let title = item.splice(-1);
                    let cumm = item.splice(-1);
                    let totals = item.splice(-1);

                    csvExport.push([title[0]['data_title']]);
                    csvExport.push(header);
                    let totalRow = [];
                    let cummRow = [];
                    item.map((entry) => {
                        let entryRow = [];
                        headerKeys.map(key => {
                            entry[key] ? entryRow.push(entry[key]) : entryRow.push("")
                        })
                        csvExport.push(entryRow);
                    })
                    headerKeys.map(key => {
                        if (key === 'sales_total_cost') {
                            // sales_costt
                            totalRow.push(totals[0]['sales_cost'] ? totals[0]['sales_cost'] : "")
                            cummRow.push(cumm[0]['cumm_sales_cost'])
                        }
                        else if (key === 'sales_gross_price') {
                            // sales_price
                            totalRow.push(totals[0]['sales_price'] ? totals[0]['sales_price'] : "")
                            cummRow.push(cumm[0]['cumm_sales_price'])
                        }
                        else if (key === 'sales_margin') {
                            // sales_total_margin
                            totalRow.push(totals[0]['sales_total_margin'] ? totals[0]['sales_total_margin'] : "")
                            cummRow.push(cumm[0]['cumm_sales_margin'])
                        }
                        else if (key === 'sales_VAT') {
                            // sales_vat
                            totalRow.push(totals[0]['sales_vat'] ? totals[0]['sales_vat'] : "")
                            cummRow.push(cumm[0]['cumm_sales_vat'])
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
                    csvExport.push([]);
                    totalRow = [];
                    cummRow = [];
                    // console.log("==============NEW LINE===================")
                })
                setCSVDATA(csvExport);
            }
        }
    }, [data])

    return (
        <>
            {dataCopy ? (
                CSVDATA.length > 0 ? (
                    <CSVLink
                        data={CSVDATA}
                        filename={`${year}_Sales`}
                        target='_blank'
                        style={{ textDecoration: 'none !important' }}
                    >
                        <div>
                            <FiDownload className='nav-link-icon' />{`${year}_Sales`}
                        </div>
                    </CSVLink>
                ) : (
                    <></>
                )
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
