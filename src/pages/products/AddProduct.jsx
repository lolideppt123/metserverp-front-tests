import React, { useState, useEffect } from 'react'
import axios from 'axios';

import ProductForm from '../../modules/ProductsModule/ProductForm';
import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';

export default function AddProduct() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const Labels = {
        PAGE_ENTITY: 'Products',
        PAGE_ENTITY_URL: 'products',
        ADD_NEW_ENTITY: 'Add New Product',
    }

    const [unit, setUnit] = useState([]);
    const [category, setCategory] = useState([]);
    const [material, setMaterial] = useState([])

    useEffect(() => {
        let endpoints = [
            `${API_BASE_URL}products/unit`,
            `${API_BASE_URL}products/unitcategory`,
            `${API_BASE_URL}materials/`,
        ]

        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then(axios.spread((data1, data2, data3) => {
                setUnit(data1.data);
                setCategory(data2.data);
                setMaterial(data3.data)
            }))
            .catch((error) => {
                console.log(error)
            })

    }, [])

    const config = {
        Labels,
        unit,
        category,
        material
    }


    return (
        <>
            <AddFormPageHeader config={config} onBack />
            <ProductForm config={config} />
        </>
    )
}
