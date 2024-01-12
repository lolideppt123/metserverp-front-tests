import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import SalesForm from '../../modules/SalesModule/SalesForm';

export default function AddSales() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const Labels = {
        PAGE_ENTITY: 'Sales',
        PAGE_ENTITY_URL: 'sales',
        ADD_NEW_ENTITY: 'Add New Sales',
    }

    const [customer, setCustomer] = useState([])
    const [product, setProduct] = useState([])

    useEffect(() => {
        let endpoints = [
            `${API_BASE_URL}customer/`,
            `${API_BASE_URL}products/`,
        ]

        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then(axios.spread((data1, data2) => {
                setCustomer(data1.data)
                setProduct(data2.data)
            }))
            .catch((err) => {
                console.log(err)
            })

    }, [])

    const config = {
        Labels,
        customer,
        product,
    }
    return (
        <>
            <AddFormPageHeader config={config} />
            <SalesForm config={config} />
        </>
    )
}
