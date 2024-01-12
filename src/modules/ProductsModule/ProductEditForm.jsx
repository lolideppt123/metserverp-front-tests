import axiosInstance from '../../helpers/axios';
import { useSnackbar } from 'notistack';

import { FiPlus } from 'react-icons/fi';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';

export default function ProductEditForm({ config }) {
    const { category, unit, data, id } = config;
    const { enqueueSnackbar } = useSnackbar();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        setValue,
        formState: { errors, isSubmitting },
    } = useForm();

    useEffect(() => {
        if (data === undefined || data.length == 0) {
            console.log("data does not exists")
        }
        else {
            console.log(data);
            [
                { name: 'product_name', value: data.product_name },
                { name: 'product_min_stock', value: data.product_min_stock },
                { name: 'product_unit', value: data.product_unit_name },
                { name: 'product_note', value: data.product_note },
            ].forEach(({ name, value }) => setValue(name, value))

        }
    }, [data])



    const onSubmit = async (data) => {
        // console.log(data)
        axiosInstance
            .put(`products/update/${id}`, data, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                console.log(response)
                enqueueSnackbar(response.data.message, { variant: 'success' });
                reset()
                history.back()
            }).catch((err) => {
                console.log(err)
                setError(`${err.response.data.label}`, {
                    type: "manual",
                    message: `${err.response.data.message}`
                })
            })
    }

    return (
        <div className="container pt-3">
            {/* <div className="spinner-border text-primary" role="status">

            </div> */}
            <form id='addProductForm' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-2">
                    <label htmlFor="product_name" className="text-md text-gray-500">Product Name</label>
                    <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='product_name' {...register("product_name", { required: "Product Name is required", maxLength: { value: 100 } })} />
                    {errors.product_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.product_name.message}</p>)}
                </div>
                <div className="d-flex gap-3">
                    <div className="flex-fill mb-2">
                        <label htmlFor="product_min_stock">Minimum Stock</label>
                        <input type="number" className="form-control form-control-sm" id='product_min_stock' min={0} step="0.01" {...register("product_min_stock", { required: "Minimum Stock is required" })} />
                    </div>
                    <div className="flex-fill mb-2">
                        <label htmlFor="product_unit">Unit</label>
                        <select className="form-select form-select-sm" autoComplete='off' id='product_unit' {...register("product_unit", { required: "Product Unit is required" })}>
                            {category.map((item, index) => (
                                <optgroup label={item.unit_category} key={index}>
                                    {
                                        unit.map((unit, index) => {
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
                    </div>
                </div>

                <div className="form-group mb-2">
                    <label htmlFor="product_note">Note</label>
                    <textarea className="form-control form-control-sm" rows="3" cols="50" style={{ resize: 'none' }} id='product_note' {...register("product_note", { maxLength: 200 })}></textarea>
                </div>
            </form>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                <button className='btn btn-primary col-2' form='addProductForm' disabled={isSubmitting}><FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />Save</button>
                <button className='btn btn btn-outline-secondary'>Cancel</button>
            </div>
        </div >
    )
}
