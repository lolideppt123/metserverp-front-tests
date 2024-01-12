import React, { useState, useEffect } from 'react';
import axiosInstance from '../../helpers/axios';
import useFetch from '../../hooks/useFetch';

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import SalesDataTable from '../../modules/SalesModule/SalesDataTable';

export default function Sales() {
    const Labels = {
        BASE_ENTITY: 'Sales',
        TABLE_TITLE: 'Sales',
        ADD_NEW_ENTITY: 'Add New Sales',
        NEW_ENTITY_URL: 'sales/add',
    }
    const dataTableColumn = [
        // {
        //     title: 'Delivery Receipt',
        //     key: 'salesDR'
        // },
        // {
        //     title: 'Invoice',
        //     key: 'salesInvoice'
        // },
        {
            title: 'Sale Date',
            key: 'salesDate'
        },
        {
            title: 'Product Name',
            key: 'productName'
        },
        {
            title: 'Customer',
            key: 'customer'
        },
        {
            title: 'Quantity',
            key: 'salesQuantity'
        },
        // {
        //     title: 'U/Cost',
        //     key: 'unitCost'
        // },
        {
            title: 'Total Cost',
            key: 'totalCost'
        },
        // {
        //     title: 'U/Price',
        //     key: 'unitPrice'
        // },
        {
            title: 'Total Price',
            key: 'totalPrice'
        },
        {
            title: 'Margin',
            key: 'salesMargin'
        },
        // {
        //     title: '%Margin',
        //     key: 'salesMarginPercent'
        // },
        {
            title: 'Status',
            key: 'salesStatus'
        },
        {
            title: 'Date Paid',
            key: 'datePaid'
        },
        {
            title: '',
            key: 'actions'
        },
    ]

    const { data, loading, error } = useFetch('sales/');
    const config = {
        dataTableColumn,
        Labels,
        data,
        loading,
        error,
    }
    return (
        <>
            <DataTablePageHeader Labels={Labels} />
            <SalesDataTable config={config} />
        </>

    )
}
