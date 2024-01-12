import React, { useState, useEffect } from 'react';
import axios from 'axios';

import AddFormPageHeader from "../../modules/FspPanelModule/AddFormPageHeader"
import RawMaterialForm from "../../modules/RawMaterialModule/RawMaterialForm"

export default function AddRawMaterials() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const Labels = {
        PAGE_ENTITY: 'Materials',
        PAGE_ENTITY_URL: 'materials',
        ADD_NEW_ENTITY: 'Add New Material',
    }

    const [unit, setUnit] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        let endpoints = [
            `${API_BASE_URL}products/unit`,
            `${API_BASE_URL}products/unitcategory`,
        ]

        axios.all(endpoints.map((endpoint) => axios.get(endpoint)))
            .then(axios.spread((data1, data2) => {
                // console.log(data1)
                // console.log(data2)
                setUnit(data1.data);
                setCategory(data2.data);
            }))
            .catch((error) => {
                console.log(error)
            })

        // axios.all([
        //     axios.get('http://127.0.0.1:8000/products/unit'),
        //     axios.get('http://127.0.0.1:8000/products/unitcategory'),
        // ])
        //     .then(axios.spread((data1, data2, data3) => {
        //         setUnit(data1.data);
        //         setCategory(data2.data);
        //     }))
        //     .catch((error) => {
        //         console.log(error)
        //     })

    }, [])

    const config = {
        Labels,
        unit,
        category,
    }
    return (
        <div>
            <AddFormPageHeader config={config} />
            <RawMaterialForm config={config} />
        </div>
    )
}
