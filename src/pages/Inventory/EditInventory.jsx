import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import InventoryEditForm from '../../modules/InventoryModule/InventoryEditForm';

export default function EditInventory() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const { id } = useParams();
    const Labels = {
        PAGE_ENTITY: 'Product Inventory',
        PAGE_ENTITY_URL: 'inventory/products',
        ADD_NEW_ENTITY: 'Edit Product Inventory',
    }
    const [supplier, setSupplier] = useState([]);
    const [products, setProducts] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        let endpoints = [
            `${API_BASE_URL}supplier/`,
            `${API_BASE_URL}products/`,
            `${API_BASE_URL}inventory/transaction/${id}/edit`,
        ]
        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then(axios.spread((data1, data2, data3) => {
                setSupplier(data1.data)
                setProducts(data2.data)
                setData(data3.data)
            }))
            .catch((err) => {
                console.log(err)
            })
    }, [])

    const config = {
        Labels,
        supplier,
        products,
        data,
        id,
    }

    return (
        <>
            <AddFormPageHeader config={config} />
            <InventoryEditForm config={config} />
        </>
    )
}
