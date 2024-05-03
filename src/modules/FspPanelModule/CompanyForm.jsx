import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { FiPlus } from 'react-icons/fi';

export default function CompanyForm({ config }) {
    const { loading, response, success, error, axiosFetch } = useAxiosFunction();
    const {
        id = null,
        Labels,
        company = null,
        companyLoad = false,
        companyErr = false
    } = config;

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
            company_name: "",
            contact_person: "",
            contact_number: "",
            company_address: "",
        }
    });

    useEffect(() => {
        if (company == null) {
            console.log("company does not exists");
        }
        else {
            if (Labels.METHOD === 'post') {
                console.log('Silence is golden');
            }
            if (Labels.METHOD === 'put') {
                console.log(company);
                [
                    { name: 'company_name', value: company.company_name },
                    { name: 'contact_person', value: company.contact_person },
                    { name: 'contact_number', value: company.contact_number },
                    { name: 'company_address', value: company.company_address },
                ].forEach(({ name, value }) => setValue(name, value));
            }
        }
    }, [company])

    const onSubmit = async (data) => {
        setFormLoading(true);
        const configObj = {
            url: `${Labels.API_URL}`,
            method: `${Labels.METHOD}`,
            data: data,
            formSetError: formSetError
        }
        setTimeout(async () => {
            axiosFetch(configObj);
            // setFormLoading(false);
        }, 1500);
    }

    useEffect(() => {
        if (success) {
            setFormLoading(false);
            reset();
            formClearError();
            history.back();
        }
    }, [success])

    return (
        <div className="container pt-3">
            {
                companyLoad ? (
                    <Spinner />
                ) : (
                    <>
                        <form id={`add${Labels.PAGE_ENTITY}Form`} onSubmit={handleSubmit(onSubmit)}>
                            <div className="form-group mb-2">
                                <label htmlFor="company_name" className="text-md text-gray-500">Company Name</label>
                                <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='company_name'
                                    {
                                    ...register("company_name", {
                                        required: "Company Name is required",
                                        maxLength: { value: 50 }
                                    })
                                    } />
                                {errors.company_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.company_name.message}</p>)}
                            </div>
                            <div className="d-flex gap-3">
                                <div className="flex-fill mb-2">
                                    <label htmlFor="contact_person" className="text-md text-gray-500">Contact Person</label>
                                    <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='contact_person'
                                        {
                                        ...register("contact_person", {
                                            maxLength: { value: 50 }
                                        })
                                        } />
                                </div>
                                <div className="flex-fill mb-2">
                                    <label htmlFor="contact_number" className="text-md text-gray-500">Contact Number</label>
                                    <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='contact_number'
                                        {
                                        ...register("contact_number", {
                                            maxLength: { value: 50 }
                                        })
                                        } />
                                </div>
                            </div>
                            <div className="form-group mb-2">
                                <label htmlFor="company_address" className="text-md text-gray-500">Company Address</label>
                                <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='company_address'
                                    {
                                    ...register("company_address", {
                                        maxLength: { value: 100 }
                                    }
                                    )} />
                            </div>
                            {errors.company_address && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.company_address.message}</p>)}
                        </form>
                        <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                            <button type='submit' className='btn btn-primary col-2' form={`add${Labels.PAGE_ENTITY}Form`} disabled={isSubmitting || !isDirty}>
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
                            <button type="button" onClick={() => history.back()} className='btn btn btn-outline-secondary'>Cancel</button>
                        </div>
                    </>
                )
            }
        </div>
    )
}
