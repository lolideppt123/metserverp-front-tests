import { useState, useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { useForm } from 'react-hook-form';
import Spinner from '../Fallback/Spinner';
import { FiPlus } from 'react-icons/fi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function AddMaterialModalForm({ config, loading, setLoading, OpenModal, setOpenModal, setData }) {
    const { FORM_ENTITY, METHOD, MAIN_URL, SECOND_URL } = config;
    // For loads
    const { loading: categoryLoad, response: category, error: categoryErr, axiosFetch: categoryFetch } = useAxiosFunction();
    const { loading: unitLoad, response: unit, error: unitErr, axiosFetch: unitFetch } = useAxiosFunction();
    // For post
    const { loading: materialLoad, response: material, success: materialSuccess, error: materialErr, axiosFetch: materialFetch } = useAxiosFunction();
    const { response: data, success, setSuccess, error, axiosFetch } = useAxiosFunction();

    const {
        register: registerMaterial,
        handleSubmit: handleSubmitMaterial,
        reset: resetMaterial,
        // getValues: getMaterialValues,
        // setValue: setMaterialValue,
        // watch: watchMaterial,
        setError: formMaterialSetError,
        clearErrors: formMaterialClearError,
        // control,
        formState: { errors: errorsMaterial, isSubmitting: isSubmittingMaterial },
    } = useForm({
        defaultValues: {
            material_name: "",
            material_min_stock: 0,
            material_unit: "Piece",
            material_note: ""
        }
    });

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            await categoryFetch({
                url: 'products/unitcategory',
                method: 'get'
            });
            await unitFetch({
                url: 'products/unit',
                method: 'get'
            });
        }
        getData();
    }, [])

    const onSubmitMaterial = async (data) => {
        setLoading(true);
        const configObj = {
            url: `${MAIN_URL}`,
            method: `${METHOD}`,
            data: data,
            formSetError: formMaterialSetError
        }
        setTimeout(async () => {
            await materialFetch(configObj);
            await axiosFetch({
                url: `${SECOND_URL}`,
                method: 'get'
            });
        }, 1500);
    }

    useEffect(() => {
        // Check if there's errors and setSuccess to false
        if (Object.values(errorsMaterial).length) {
            setSuccess(false);
        }
        if (success && !Object.values(errorsMaterial).length) {
            setData(data);
            resetMaterial();
            formMaterialClearError();
            setOpenModal(false);
            setLoading(false);
            setSuccess(false);
        }
    }, [success])

    return (
        <div className="container">
            {unitLoad || categoryLoad ? (
                <Spinner />
            ) : (
                <>
                    <form id={`add${FORM_ENTITY}Form`} onSubmit={handleSubmitMaterial(onSubmitMaterial)}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group mb-2">
                                    <label htmlFor="material_name" className="text-md text-gray-500">Material Name</label>
                                    <input type="text" className={`form-control form-control-sm`} autoComplete='off'
                                        {
                                        ...registerMaterial("material_name", {
                                            required: "Material Name is required",
                                            maxLength: { value: 100 }
                                        }
                                        )} />
                                    {errorsMaterial.material_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errorsMaterial.material_name.message}</p>)}
                                </div>
                                <div className="d-flex gap-3">
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="material_min_stock">Minimum Stock</label>
                                        <input type="number" className="form-control form-control-sm" id='material_min_stock' min={0} step={0.01}
                                            {
                                            ...registerMaterial("material_min_stock", {
                                                required: "Minimum Stock is required",
                                                valueAsNumber: true
                                            }
                                            )} />
                                        {errorsMaterial.material_min_stock && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errorsMaterial.material_min_stock.message}</p>)}
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="material_unit">Unit</label>
                                        <select className="form-select form-select-sm" autoComplete='off' id='material_unit'
                                            {
                                            ...registerMaterial("material_unit", {
                                                required: "Product Unit is required"
                                            }
                                            )}>
                                            {category?.map((item, index) => (
                                                <optgroup label={item.unit_category} key={index}>
                                                    {
                                                        unit?.map((unit, index) => {
                                                            if (item.unit_category == unit.unit_category) {
                                                                return (
                                                                    <option value={unit.unit_name} key={index}>{unit.unit_name}</option>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </optgroup>
                                            ))}
                                        </select>
                                        {errorsMaterial.material_unit && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errorsMaterial.material_unit.message}</p>)}
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="material_note">Note</label>
                                    <textarea className="form-control form-control-sm" rows="3" cols="50" style={{ resize: 'none' }} id='material_note'
                                        {
                                        ...registerMaterial("material_note", {
                                            maxLength: 200
                                        }
                                        )}></textarea>
                                </div>
                            </div>
                            <div className="col-md-5">

                            </div>
                        </div>
                    </form>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-4">
                        <button className='btn btn btn-outline-secondary' onClick={() => setOpenModal(false)}>
                            Cancel
                        </button>
                        <button className='btn btn-primary' form={`add${FORM_ENTITY}Form`}>
                            {loading ? (
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{
                                                fontSize: 18,
                                                color: 'white',
                                                margin: '0 8px 3px 0'
                                            }}
                                            spin
                                        />
                                    }
                                />
                            ) : (
                                <FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />
                            )}
                            Submit
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
