import React from 'react';
import axiosInstance from '../../helpers/axios';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';

import { FiPlus } from 'react-icons/fi';

export default function AddCompanyForm({ config }) {
    const { Labels } = config;
    const { enqueueSnackbar } = useSnackbar();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        // console.log(data)
        axiosInstance
            .post(`supplier/`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response)
                enqueueSnackbar(response.data.message, { variant: response.data.variant });
                reset()
                history.back()
            })
            .catch((err) => {
                setError(`${err.response.data.label}`, {
                    type: "manual",
                    message: `${err.response.data.message}`
                })
            })

    }
    return (
        <div className="container pt-3">

            <form id='addProductForm' onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group mb-2">
                    <label htmlFor="company_name" className="text-md text-gray-500">Company Name</label>
                    <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='company_name' {...register("company_name", { required: "Company Name is required", maxLength: { value: 50 } })} />
                    {errors.company_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.company_name.message}</p>)}
                </div>
                <div className="d-flex gap-3">
                    <div className="flex-fill mb-2">
                        <label htmlFor="contact_person" className="text-md text-gray-500">Contact Person</label>
                        <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='contact_person' {...register("contact_person", { maxLength: { value: 50 } })} />
                    </div>
                    <div className="flex-fill mb-2">
                        <label htmlFor="contact_number" className="text-md text-gray-500">Contact Number</label>
                        <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='contact_number' {...register("contact_number", { maxLength: { value: 50 } })} />
                    </div>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="company_address" className="text-md text-gray-500">Company Address</label>
                    <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='company_address' {...register("company_address", { maxLength: { value: 100 } })} />
                </div>
            </form>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                <button className='btn btn-primary col-2' form='addProductForm' disabled={isSubmitting}><FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />Save</button>
                <button className='btn btn btn-outline-secondary'>Cancel</button>
            </div>
        </div>
    )
}
