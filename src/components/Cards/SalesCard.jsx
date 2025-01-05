import { Divider } from 'antd';
import MoneyFormatter from '../../settings/MoneyFormatter';
import RenderText from '../Tooltip/RenderText';

export default function SalesCard({ data }) {
    console.log(data)
    return (
        <>
            <div className="sales-card-record-id d-flex flex-wrap align-items-center m-0 p-1">
                <span className="h6 fw-semibold m-0">Record No:</span>
                <span className="fw-semibold ms-2"> {data?.pk ? data.pk : data.id}</span>
            </div>
            <div className="sales-card-sub-header d-flex flex-wrap align-items-center m-0 p-1">
                <div className="sales-card-dr d-flex flex-fill align-items-center">
                    <span className="h6 fw-semibold m-0">Delivery Receipt:</span>
                    <span className="fw-semibold ms-2"> {data.sales_dr ? data.sales_dr : "####"}</span>
                </div>
                <div className="sales-card-invoice d-flex flex-fill align-items-center">
                    <span className="h6 fw-semibold m-0">Sales Invoice:</span>
                    <span className="fw-semibold ms-2">
                        {data?.sales_invoice == "" ? "####" : (
                            <RenderText text={data?.sales_invoice} maxLength={7} />
                        )}
                    </span>
                </div>
            </div>
            <div className="card card-header">
                <div className="sales-card-detail-content d-flex justify-content-between align-items-center">
                    <div className="m-0 p-1 flex-fill">
                        <span className="h6 fw-semibold m-0">Product:</span>
                        <span className="fw-semibold ms-2">
                            <RenderText text={data?.product_name} maxLength={22} />
                        </span>
                    </div>
                    <div className="m-0 p-1 flex-fill">
                        <span className="h6 fw-semibold m-0">Quantity:</span>
                        <span className="fw-semibold ms-2"> {data.sales_quantity}</span>
                    </div>
                </div>
                <div className="sales-card-detail-content-2">
                    <div className="m-0 p-1">
                        <span className="h6 fw-semibold m-0">Supplier:</span>
                        <span className="fw-semibold ms-2">
                            <RenderText text={data?.sales_transaction[0].supplier.company_name} maxLength={22} />
                        </span>
                    </div>
                </div>
            </div>
            <div className="sales-card-pricing-container d-flex flex-column mt-2 px-3 border border-1 border-dark rounded-3">
                <div className="sales-card-pricing-left d-flex justify-content-between align-items-center">
                    <div className="m-0 p-1 unit-cost">
                        <span className="h6 fw-semibold m-0 border-right">Unit Cost:</span>
                        <span className="fw-semibold ms-2"><MoneyFormatter amount={data.sales_unit_cost} /></span>
                    </div>
                    <div className="m-0 p-1 gross-price">
                        <span className="h6 fw-semibold m-0">Gross Price:</span>
                        <span className="fw-semibold ms-2"><MoneyFormatter amount={data.sales_unit_price / (data.tax_percent / 100 + 1)} /></span>
                    </div>
                </div>
                <div className="sales-card-pricing-right d-flex justify-content-between align-items-center">
                    <div className="m-0 p-1 total-cost">
                        <span className="h6 fw-semibold m-0">Total Cost:</span>
                        <span className="fw-semibold ms-2"><MoneyFormatter amount={data.sales_total_cost} /></span>
                    </div>
                    <div className="m-0 p-1 selling-price">
                        <span className="h6 fw-semibold m-0">Selling Price:</span>
                        <span className="fw-semibold ms-2"><MoneyFormatter amount={data.sales_unit_price} /></span>
                    </div>
                </div>
            </div>
            <div className="sales-card-footer d-flex flex-column mt-2">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="sales-card-footer-left m-0 p-1 flex-fill"></div>
                    <div className="sales-card-footer-right card card-header m-0 p-2 px-3 align-items-center justify-content-end" style={{ flex: '1 1 0' }}>
                        <div className="w-100 text-end mb-1">
                            <span className="h6 fw-semibold m-0 float-start">Total Gross:</span>
                            <span className="fw-semibold ms-2"><MoneyFormatter amount={data?.sales_gross_price} /></span><br />
                        </div>
                        <div className="w-100 text-end mb-1">
                            <span className="h6 fw-semibold m-0 float-start">VAT:</span>
                            <span className="fw-semibold ms-2"><MoneyFormatter amount={data?.sales_VAT} /></span><br />
                        </div>
                        <div className="w-100 text-end mb-1">
                            <span className="h6 fw-semibold m-0 float-start">Total Selling Price:</span>
                            <span className="fw-semibold ms-2"><MoneyFormatter amount={data?.sales_total_price} /></span>
                        </div>
                        <div className="w-100 text-end mb-1">
                            <span className="h6 fw-semibold m-0 float-start">Margin:</span>
                            <span className="fw-semibold ms-2"><MoneyFormatter amount={data?.sales_margin} /></span>
                        </div>
                        <div className="w-100 text-end mb-1">
                            <span className="h6 fw-semibold m-0 float-start">Margin%:</span>
                            <span className="fw-semibold ms-2">{data?.sales_margin_percent}%</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
