import { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv';
import { FiDownload } from 'react-icons/fi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

export default function CSVExportByMonth({ title, body, foot, endFoot, dateFilter }) {
    const [CSVDATA, setCSVDATA] = useState([]);
    const HEADER = [
        { label: "DELIVERY RECEIPT", key: "sales_dr" },
        { label: "INVOICE", key: "sales_invoice" },
        { label: "CUSTOMERS", key: "customer" },
        { label: "PRODUCTS", key: "product_name" },
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
    ];

    useEffect(() => {
        if (body && body.length) {
            const csvExport = [];
            csvExport.push(title['data_title'] ? [title['data_title']] : [""]);
            csvExport.push(HEADER.map(item => item.label));

            body.forEach(item => {
                const entryRow = HEADER.map(key => item[key.key] || ""); // Using the key property from HEADER
                csvExport.push(entryRow);
            });

            // Prepare total and cumulative rows
            const totalRow = Array(HEADER.length).fill("");
            const cummRow = Array(HEADER.length).fill("");

            totalRow[0] = "Total";
            cummRow[0] = "Cummulative";

            // Add totals if available
            if (foot) {
                totalRow[HEADER.findIndex(item => item.key === 'sales_total_cost')] = foot['sales_cost'] || "";
                totalRow[HEADER.findIndex(item => item.key === 'sales_gross_price')] = foot['sales_price'] || "";
                totalRow[HEADER.findIndex(item => item.key === 'sales_margin')] = foot['sales_total_margin'] || "";
                totalRow[HEADER.findIndex(item => item.key === 'sales_VAT')] = foot['sales_vat'] || "";
            }

            // Add cumulative totals if available
            if (endFoot) {
                cummRow[HEADER.findIndex(item => item.key === 'sales_total_cost')] = endFoot['cumm_sales_cost'] || "";
                cummRow[HEADER.findIndex(item => item.key === 'sales_gross_price')] = endFoot['cumm_sales_price'] || "";
                cummRow[HEADER.findIndex(item => item.key === 'sales_margin')] = endFoot['cumm_sales_margin'] || "";
                cummRow[HEADER.findIndex(item => item.key === 'sales_VAT')] = endFoot['cumm_sales_vat'] || "";
            }

            csvExport.push(totalRow);
            csvExport.push(cummRow);
            setCSVDATA(csvExport);
        }

    }, [title, body, foot, endFoot]);

    useEffect(() => {
        // Reset CSV data whenever the selected month changes
        setCSVDATA([]);
    }, [dateFilter]);


    return (
        <>
            {CSVDATA.length > 0 ? (
                <CSVLink
                    data={CSVDATA}
                    filename={`${dayjs(title).format("MMMM YYYY")}_Sales.csv`}
                    target='_blank'
                    style={{ textDecoration: 'none' }}
                >
                    <div>
                        <FiDownload className='nav-link-icon' style={{ fontSize: '1.35em' }} />
                    </div>
                </CSVLink>
            ) : body && body.length === 0 ? (
                <span style={{ opacity: 0.5, cursor: 'not-allowed' }}>
                    <FiDownload className='nav-link-icon' style={{ fontSize: '1.35em' }} />
                </span>
            ) : (
                <Spin
                    style={{ minWidth: '90px' }}
                    indicator={<LoadingOutlined style={{ fontSize: 18, color: '#6610f2', margin: '0 8px 3px 0' }} spin />}
                />
            )}
        </>
    )
}