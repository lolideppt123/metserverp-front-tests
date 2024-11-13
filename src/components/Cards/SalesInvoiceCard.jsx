import React from 'react';
import { Divider, Tooltip } from 'antd';
import MoneyFormatter from '../../settings/MoneyFormatter';

export default function SalesInvoiceCard({ data }) {
    return (
        <>
            <div className="card card-body pb-3">
                <div className="row px-3">
                    <div className="col-md-5 m-0 p-1">
                        <span className="h6 fw-bold m-0">Product</span>
                    </div>
                    <div className="col-md-2 m-0 p-1 text-center">
                        <span className="h6 fw-bold m-0">Quantity</span>
                    </div>
                    <div className="col-md-2 m-0 p-1 text-center">
                        <span className="h6 fw-bold m-0">U/Price</span>
                    </div>
                    <div className="col-md-3 m-0 p-1 text-center">
                        <span className="h6 fw-bold m-0">Amount</span>
                    </div>
                </div>
                <Divider className='mb-2' type="horizontal" style={{ borderColor: "rgba(0,0,0,0.175)", marginTop: '0' }} />
                <div className="sales-orders sales-orders-products">
                    {data['sales_data']?.map((item, index) => (
                            <div className="row px-3" key={index}>
                                <div className="col-md-5 m-0 p-1" style={{ border: '1px solid rgba(0,0,0,0.175)' }}>
                                    <span className="h6 m-0 fw-semibold ms-2">
                                        {item?.product?.substr(0, 25)}{item?.product?.length > 25 ? (
                                            <Tooltip className="pointer" title={item.product}>{'\u2026'}</Tooltip>
                                        ) : (
                                            <></>
                                        )}
                                    </span>
                                </div>
                                <div className="col-md-2 m-0 p-1 text-center" style={{ border: '1px solid rgba(0,0,0,0.175)' }}>
                                    <span className="h6 m-0 fw-semibold ms-2">{item.quantity}</span>
                                </div>
                                <div className="col-md-2 m-0 p-1 text-end" style={{ border: '1px solid rgba(0,0,0,0.175)' }}>
                                    <span className="h6 m-0 fw-semibold ms-2"><MoneyFormatter amount={item.gross_uprice} /></span>
                                </div>
                                <div className="col-md-3 m-0 p-1 text-end" style={{ border: '1px solid rgba(0,0,0,0.175)' }}>
                                    <span className="h6 m-0 fw-semibold ms-2"><MoneyFormatter amount={item.gross_tprice} /></span>
                                </div>
                            </div>
                    ))}
                </div>
            </div>
            <div className="d-flex flex-column mt-2">
                <div className="row gap-2 px-2">
                    <div className="m-0 p-1 col col-md-6 card">
                        <div className="card-body p-0">
                            <span className='h6 fw-semibold card-title'>Note:</span>
                            <p className='px-2 m-0'>{data.invoice_note}</p>
                        </div>
                    </div>
                    <div className="card card-header m-0 p-2 px-3 col col-md-6" style={{ flex: '1 1 0' }}>
                        <div className="w-100 text-end mb-1">
                            <span className="h6 fw-semibold m-0 float-start">Subtotal:</span>
                            <span className="fw-semibold ms-2"><MoneyFormatter amount={data.invoice_gross} /></span><br />
                        </div>
                        <div className="w-100 text-end mb-1">
                            <span className="h6 fw-semibold m-0 float-start">VAT {data.tax_rate}%:</span>
                            <span className="fw-semibold ms-2"><MoneyFormatter amount={data.invoice_vat} /></span><br />
                        </div>
                        <div className="w-100 text-end mb-1 border-top">
                            <span className="h6 fw-semibold m-0 float-start">Total Selling Price:</span>
                            <span className="h6 fw-bold ms-2"><MoneyFormatter amount={data.invoice_total} /></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
