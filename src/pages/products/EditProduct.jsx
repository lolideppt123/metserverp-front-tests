import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ProductEditForm from '../../modules/ProductsModule/ProductEditForm';
import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';

export default function EditProduct() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const { id } = useParams();
    const Labels = {
        PAGE_ENTITY: 'Products',
        ADD_NEW_ENTITY: 'Edit Product',
    }

    const [unit, setUnit] = useState([]);
    const [category, setCategory] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        let endpoints = [
            `${API_BASE_URL}products/unit`,
            `${API_BASE_URL}products/unitcategory`,
            `${API_BASE_URL}products/update/${id}`,
        ]
        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then(axios.spread((data1, data2, data3) => {
                setUnit(data1.data);
                setCategory(data2.data);
                setData(data3.data)
                // console.log(data1)
                // console.log(data2)
                // console.log(data3)
            }))
            .catch((error) => {
                console.log(error)
            })

    }, [])

    const config = {
        Labels,
        unit,
        category,
        data,
        id,
    }
    return (
        <>
            <AddFormPageHeader config={config} onBack />
            <ProductEditForm config={config} />
        </>
    )
}
