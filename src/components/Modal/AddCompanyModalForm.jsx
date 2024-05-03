import axiosInstance from '../../helpers/axios';
import { useForm } from 'react-hook-form';
import useAxiosFunction from '../../hooks/useAxiosFunction';

export default function AddCompanyModalForm(props) {
    const { axiosFetch: dataFetch } = useAxiosFunction();
    const {
        PAGE_ENTITY,
        PAGE_ENTITY_URL,
    } = props.config;

    const {
        register: register2,
        handleSubmit: handleSubmit2,
        reset: reset2,
        setError: setError2,
        formState: { errors: errors2 },
    } = useForm();

    const onSubmit2 = async (data) => {
        axiosInstance
            .post(`${PAGE_ENTITY_URL}`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((response) => {
                console.log(response);
                axiosInstance
                    .get(`${PAGE_ENTITY_URL}/`)
                    .then((response) => {
                        props.setData(response.data);
                    })
                    .catch((err) => {
                        setError2(`${err.response.data.label}`, {
                            type: "manual",
                            message: `${err.response.data.message}`
                        })
                    })
                reset2();
                props.closeModal();
            })
            .catch((err) => {
                setError2(`${err.response.data.label}`, {
                    type: "manual",
                    message: `${err.response.data.message}`
                })
            })
    }

    return (
        <div className="container pt-3">
            <form id={`add${PAGE_ENTITY}Form`} onSubmit={handleSubmit2(onSubmit2)}>
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
        </div>
    )
}
