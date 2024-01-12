import { useState, useEffect } from 'react';
import axios from 'axios';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import InventoryForm from '../../modules/InventoryModule/InventoryForm';

export default function AddInventory() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const Labels = {
        PAGE_ENTITY: 'Product Inventory',
        PAGE_ENTITY_URL: 'inventory/products',
        ADD_NEW_ENTITY: 'Add New Inventory',
    }

    const [supplier, setSupplier] = useState([])
    const [data, setData] = useState([])

    useEffect(() => {
        let endpoints = [
            `${API_BASE_URL}supplier/`,
            `${API_BASE_URL}products/`,
        ]
        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then(axios.spread((data1, data2) => {
                setSupplier(data1.data)
                setData(data2.data)
            }))
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const config = {
        Labels,
        supplier,
        data,
    }

    return (
        <>
            <AddFormPageHeader config={config} />
            <InventoryForm config={config} />
        </>
    )
}
