import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { useForm } from 'react-hook-form';
import { FiPlus } from 'react-icons/fi';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';

export default function AddCompanyModalForm({ config, loading, setLoading, OpenModal, setOpenModal, setData }) {
    const { axiosFetch } = useAxiosFunction();
    const { success, setSuccess, response: data, axiosFetch: dataFetch } = useAxiosFunction();
    const { FORM_ENTITY, METHOD, MAIN_URL, SECOND_URL } = config;

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        reset: reset2,
        setError: setError2,
        clearErrors: clearError2,
        formState: { errors: errors2 },
    } = useForm();

    const onSubmit2 = async (data) => {
        setLoading(true);
        // console.log(data);
        const configObj = {
            url: MAIN_URL,
            method: METHOD,
            data: data,
            formSetError: setError2
        }

        setTimeout(async () => {
            await axiosFetch(configObj);
            await dataFetch({
                url: SECOND_URL,
                method: 'get'
            })
            setLoading(false);
        }, 2000);

    };

    useEffect(() => {
        // Check if there's errors and setSuccess to false
        if (Object.values(errors2).length) {
            setSuccess(false);
        }

        if (success && !Object.values(errors2).length) {
            setData(data);
            reset2();
            clearError2();
            setOpenModal(false);
            setSuccess(false);
        }
    }, [success])

    return (
        <div className="container">
            <form id={`add${FORM_ENTITY}Form`} onSubmit={handleSubmit2(onSubmit2)}>
                <div className="form-group mb-2">
                    <label htmlFor="company_name" className="text-md text-gray-500">Company Name</label>
                    <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='company_name' {...register2("company_name", { required: "Company Name is required", maxLength: { value: 50 } })} />
                    {errors2.company_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors2.company_name.message}</p>)}
                </div>
                <div className="d-flex gap-3">
                    <div className="flex-fill mb-2">
                        <label htmlFor="contact_person" className="text-md text-gray-500">Contact Person</label>
                        <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='contact_person' {...register2("contact_person", { maxLength: { value: 50 } })} />
                    </div>
                    <div className="flex-fill mb-2">
                        <label htmlFor="contact_number" className="text-md text-gray-500">Contact Number</label>
                        <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='contact_number' {...register2("contact_number", { maxLength: { value: 50 } })} />
                    </div>
                </div>
                <div className="form-group mb-2">
                    <label htmlFor="company_address" className="text-md text-gray-500">Company Address</label>
                    <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='company_address' {...register2("company_address", { maxLength: { value: 100 } })} />
                </div>
            </form>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-4">
                <button className='btn btn btn-outline-secondary' onClick={() => setOpenModal(false)}>
                    Cancel
                </button>
                <button className='btn btn-primary' form={`add${FORM_ENTITY}Form`} >
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
        </div>
    )
}
