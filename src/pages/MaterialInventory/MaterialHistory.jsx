import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../helpers/axios';


import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import MaterialHistoryDataTable from "../../modules/MaterialInventoryModule/MaterialHistoryDataTable";

export default function MaterialHistory() {
    const { material_name } = useParams();
    const Labels = {
        PAGE_ENTITY: 'Material Inventory',
        PAGE_ENTITY_URL: 'inventory/materials',
        TABLE_TITLE: material_name,
        ADD_NEW_ENTITY: material_name,
    }

    const dataTableColumn = [
        {
            title: 'Date',
            key: 'date'
        },
        {
            title: 'Supplier',
            key: 'supplier'
        },
        {
            title: 'Product',
            key: 'product'
        },
        {
            title: 'Quantity',
            key: 'quantity'
        },
        {
            title: 'Per Unit',
            key: 'perUnit'
        },
        {
            title: 'Total Quantity',
            key: 'totalQuantity'
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
            .get(`inventory/materials/transaction/${material_name}`)
            .then((response) => {
                console.log(response.data)
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
            <MaterialHistoryDataTable config={config} />
        </>
    )
}
