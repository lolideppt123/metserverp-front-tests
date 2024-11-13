import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Spinner from '../Fallback/Spinner';
import { FiPlus } from 'react-icons/fi';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useGetDictionaryQuery } from '../../features/utils/dictionaryApiSlice';
import { useAddMaterialMutation } from '../../features/materials/materialApiSlice';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { modalForm } from '../../features/modal/modalSlice';

export default function AddMaterialModalForm({ config }) {
    const { FORM_ENTITY } = config;
    const [FormLoading, setFormLoading] = useState(false);

    // Redux
    const {data: {
        categories: category = [],
        units: unit = [],
    } = {}, isLoading, isError, error, isSuccess} = useGetDictionaryQuery();
    const [addMaterial] = useAddMaterialMutation();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();

    const {
        reset,
        clearErrors,
        register: registerMaterial,
        handleSubmit: handleSubmitMaterial,
        formState: { errors: errorsMaterial, isSubmitting: isSubmittingMaterial },
    } = useForm({
        defaultValues: {
            material_name: "",
            material_min_stock: 0,
            material_unit: "Piece",
            material_note: ""
        }
    });

    const handleCloseModal = () => {
        dispatch(modalForm(false));
    }

    const onSubmitMaterial = async (data) => {
        setFormLoading(true);

        let message = "";
        let variant = "";

        setTimeout( async () => {
            try {
                const response = await addMaterial(data).unwrap();
                message = response?.message;
                variant = "success";
                reset();
                clearErrors();
            } catch (err) {
                console.log(`Adding material error: `, err);
                message = err?.data?.message || err || "An error occurred";

                variant = "error";
            } finally {
                enqueueSnackbar(message, {variant: variant, autoHideDuration: 5000})
                setFormLoading(false);
                handleCloseModal();
            }
        }, 1500);
    }

    return (
        <div className="container">
            {isLoading && isSuccess ? (
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
                        <button className='btn btn-primary' form={`add${FORM_ENTITY}Form`}>
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
                            Submit
                        </button>
                        <button className='btn btn btn-outline-secondary' onClick={handleCloseModal}>
                            Cancel
                        </button>
                    </div>
                </>
            )}
        </div>
    )
}
