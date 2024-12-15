import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import Spinner from '../../components/Fallback/Spinner';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { FiPlus } from 'react-icons/fi';
import { useAddMaterialMutation, useUpdateMaterialMutation } from '../../features/materials/materialApiSlice';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

export default function MaterialForm({ config }) {
    const {
        id = null,
        Labels,
        material = "",
        unit,
        category,
        isLoading
    } = config;

    // Redux
    const [addMaterial] = useAddMaterialMutation();
    const [updateMaterial] = useUpdateMaterialMutation();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();
    const [FormLoading, setFormLoading] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        setError: formSetError,
        clearErrors: formClearError,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        defaultValues: {
            material_name: '',
            material_min_stock: 0
        }
    });

    useEffect(() => {
        if (material == null) {
            console.log("material does not exists");
        }
        else {
            if (Labels.METHOD === 'post') {
                console.log('Silence is golden');
            }
            if (Labels.METHOD === 'put') {
                [   
                    {name: 'id', value: id},
                    { name: 'material_name', value: material.material_name },
                    { name: 'material_min_stock', value: parseFloat(material.material_min_stock) },
                    { name: 'material_unit', value: material.material_unit_name },
                    { name: 'material_note', value: material.material_note },
                ].forEach(({ name, value }) => setValue(name, value));
            }
        }

    }, [material])

    const onSubmit = async (data) => {
        setFormLoading(true);

        let message = "";
        let variant = "";

        setTimeout( async () => {
            try {
                var response = null;
                if(Labels.METHOD === 'post') {
                    response = await addMaterial(data).unwrap();
                    message = response?.message;
                } else if (Labels.METHOD === 'put') {
                    response = await updateMaterial(data).unwrap();
                    message = response?.message;
                }
                variant = "success";
                if(response) {
                    navigate(-1);
                    reset();
                }
            }
            catch (err) {
                console.log(`${Labels.METHOD === 'put' ? "Adding" : "Updating"} material error: `, err);
                message = err?.data?.message || err?.data?.detail || `${err?.status} Code: ${err?.originalStatus || "Call Master Joseph"}` || "An error occurred";
                variant = "error";
            }
            finally {
                enqueueSnackbar(message, {variant: variant, autoHideDuration: 5000});
                setFormLoading(false);
            }
        }, 1500);

    }

    return (
        <div className="container">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <form id={`add${Labels.PAGE_ENTITY}Form`} onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-7">
                                <div className="form-group mb-2">
                                    <label htmlFor="material_name" className="text-md text-gray-500">Material Name</label>
                                    <input type="text" className={`form-control form-control-sm`} autoComplete='off'
                                        {
                                        ...register("material_name", {
                                            required: "Material Name is required",
                                            maxLength: { value: 100 }
                                        }
                                        )} />
                                    {errors.material_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.material_name.message}</p>)}
                                </div>
                                <div className="d-flex gap-3">
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="material_min_stock">Minimum Stock</label>
                                        <input type="number" className="form-control form-control-sm" id='material_min_stock' min={0} step={0.01}
                                            {
                                            ...register("material_min_stock", {
                                                required: "Minimum Stock is required",
                                                valueAsNumber: true
                                            }
                                            )} />
                                        {errors.material_min_stock && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.material_min_stock.message}</p>)}
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="material_unit">Unit</label>
                                        <select className="form-select form-select-sm" autoComplete='off' id='material_unit'
                                            {
                                            ...register("material_unit", {
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
                                        {errors.material_unit && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.material_unit.message}</p>)}
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="material_note">Note</label>
                                    <textarea className="form-control form-control-sm" rows="3" cols="50" style={{ resize: 'none' }} id='material_note'
                                        {
                                        ...register("material_note", {
                                            maxLength: 200
                                        }
                                        )}></textarea>
                                </div>
                            </div>
                            <div className="col-md-5">

                            </div>
                        </div>
                    </form>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                        <button 
                            type='submit'
                            className='btn btn-primary col-2 submit-form-btn' 
                            form={`add${Labels.PAGE_ENTITY}Form`} 
                            disabled={isSubmitting || !isDirty}
                        >
                            {FormLoading ? (
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
                            Save
                        </button>
                        <button type='button' onClick={() => navigate(-1)} className='btn btn btn-outline-secondary'>Cancel</button>
                    </div>
                </>
            )}
        </div>
    )
}
