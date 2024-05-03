import { Divider } from 'antd';
import MoneyFormatter from '../../settings/MoneyFormatter';

export default function SalesCard({ data }) {
    return (
        <>
            <div className="d-flex flex-wrap align-items-center m-0 p-1">
                <span className="h6 fw-semibold m-0">Record No:</span>
                <span className="fw-semibold ms-2"> {data.pk}</span>
            </div>
            <div className="d-flex flex-wrap align-items-center m-0 p-1">
                <div className="d-flex flex-fill">
                    <span className="h6 fw-semibold m-0">Delivery Receipt:</span>
                    <span className="fw-semibold ms-2"> {data.sales_dr ? data.sales_dr : "####"}</span>
                </div>
                <div className="d-flex flex-fill">
                    <span className="h6 fw-semibold m-0">Sales Invoice:</span>
                    <span className="fw-semibold ms-2">{data?.sales_invoice == "" ? "####" : (
                        <>
                            {`${data.sales_invoice.substr(0, 7)}${data.sales_invoice.length > 7 ? '\u2026' : ""}`}
                        </>
                    )}
                    </span>
                </div>
            </div>
            <div className="card card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="m-0 p-1">
                        <span className="h6 fw-semibold m-0">Product:</span>
                        <span className="fw-semibold ms-2"> {`${data?.product_name?.substr(0, 15)}${data?.product_name?.length > 15 ? '\u2026' : ""}`}</span>
                    </div>
                    <Divider type="vertical" style={{ borderColor: 'black' }} />
                    <div className="m-0 p-1">
                        <span className="h6 fw-semibold m-0">Quantity:</span>
                        <span className="fw-semibold ms-2"> {data.sales_quantity}</span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column mt-2 px-3 border border-1 border-dark rounded-3">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="m-0 p-1">
                        <span className="h6 fw-semibold m-0 border-right">Unit Cost:</span>
                        <span className="fw-semibold ms-2"><MoneyFormatter amount={data.sales_unit_cost} /></span>
                    </div>
                    <div className="m-0 p-1">
                        <span className="h6 fw-semibold m-0">Gross Unit Price:</span>
                        <span className="fw-semibold ms-2"><MoneyFormatter amount={data.sales_unit_price / (data.tax_percent / 100 + 1)} /></span>
                    </div>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div className="m-0 p-1">
                        <span className="h6 fw-semibold m-0">Total Cost:</span>
                        <span className="fw-semibold ms-2"><MoneyFormatter amount={data.sales_total_cost} /></span>
                    </div>
                    <div className="m-0 p-1">
                        <span className="h6 fw-semibold m-0">Gross Total Price:</span>
                        <span className="fw-semibold ms-2"><MoneyFormatter amount={data.sales_gross_price} /></span>
                    </div>
                </div>
            </div>
            <div className="d-flex flex-column mt-2">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="m-0 p-1 flex-fill"></div>
                    <div className="card card-header m-0 p-2 px-3 align-items-center justify-content-end" style={{ flex: '1 1 0' }}>
                        <div className="w-100 text-end mb-1">
                            <span className="h6 fw-semibold m-0 float-start">VAT:</span>
                            <span className="fw-semibold ms-2"><MoneyFormatter amount={data.sales_VAT} /></span><br />
                        </div>
                        <div className="w-100 text-end mb-1">
                            <span className="h6 fw-semibold m-0 float-start">Total Selling Price:</span>
                            <span className="fw-semibold ms-2"><MoneyFormatter amount={data.sales_total_price} /></span>
                        </div>
                        <div className="w-100 text-end mb-1">
                            <span className="h6 fw-semibold m-0 float-start">Margin:</span>
                            <span className="fw-semibold ms-2"><MoneyFormatter amount={data.sales_margin} /></span>
                        </div>
                        <div className="w-100 text-end mb-1">
                            <span className="h6 fw-semibold m-0 float-start">Margin%:</span>
                            <span className="fw-semibold ms-2">{data.sales_margin_percent}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
