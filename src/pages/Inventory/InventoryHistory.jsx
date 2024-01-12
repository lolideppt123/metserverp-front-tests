import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import axiosInstance from '../../helpers/axios';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import InventoryHistoryDataTable from '../../modules/InventoryModule/InventoryHistoryDataTable';

export default function InventoryHistory() {
    const { product_name } = useParams();
    const Labels = {
        PAGE_ENTITY: 'Product Inventory',
        PAGE_ENTITY_URL: 'inventory/products',
        TABLE_TITLE: product_name,
        ADD_NEW_ENTITY: product_name,
    }
    const dataTableColumn = [
        {
            title: 'Date',
            key: 'date'
        },
        {
            title: 'Customer/Supplier',
            key: 'custSupp'
        },
        {
            title: 'Product Name',
            key: 'productName'
        },
        {
            title: 'Quantity',
            key: 'quantity'
        },
        {
            title: 'Running Quantity',
            key: 'runningQuantity'
        },
        {
            title: '',
            key: 'actions'
        },
    ]

    const [data, setData] = useState([]);

    useEffect(() => {
        axiosInstance
            .get(`inventory/products/transaction/${product_name}`)
            .then((response) => {
                // console.log(response)
                setData(response.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])


    const config = {
        Labels,
        dataTableColumn,
        data,
    }
    return (
        <>
            <AddFormPageHeader config={config} />
            <InventoryHistoryDataTable config={config} />
        </>

    )
}
