import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import SalesEditForm from '../../modules/SalesModule/SalesEditForm';

export default function EditSales() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const { id } = useParams();
    const Labels = {
        PAGE_ENTITY: 'Sales',
        PAGE_ENTITY_URL: 'sales',
        ADD_NEW_ENTITY: 'Edit Sales',
    }

    const [customer, setCustomer] = useState([])
    const [product, setProduct] = useState([])
    const [data, setData] = useState([]);

    useEffect(() => {
        let endpoints = [
            `${API_BASE_URL}customer/`,
            `${API_BASE_URL}products/`,
            `${API_BASE_URL}sales/transaction/${id}/edit/`,
        ]

        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then(axios.spread((data1, data2, data3) => {
                setCustomer(data1.data)
                setProduct(data2.data)
                setData(data3.data)
            }))
            .catch((err) => {
                console.log(err)
            })

        // axios.all([
        //     axios.get('http://127.0.0.1:8000/customer/'),
        //     axios.get('http://127.0.0.1:8000/products/'),
        //     axios.get(`http://127.0.0.1:8000/sales/transaction/${id}/edit`),
        // ])
        //     .then(axios.spread((data1, data2, data3) => {
        //         setCustomer(data1.data)
        //         setProduct(data2.data)
        //         setData(data3.data)
        //     }))
        //     .catch((err) => {
        //         console.log(err)
        //     })
    }, [])

    const config = {
        Labels,
        customer,
        product,
        data,
        id,
    }
    return (
        <>
            <AddFormPageHeader config={config} />
            <SalesEditForm config={config} />
        </>
    )
}
