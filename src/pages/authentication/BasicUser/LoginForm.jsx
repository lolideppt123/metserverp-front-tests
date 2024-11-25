import { useForm } from 'react-hook-form';
import InputField from '../../../components/CustomFields/InputField';
import { FiMail, FiLock } from "react-icons/fi";
import { useLoginMutation } from '../../../features/auth/authApiSlice';
import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { Spin } from 'antd';
import {LoadingOutlined} from '@ant-design/icons';

const LoginForm = () => {
    const [login, { isLoading, isError, error }] = useLoginMutation();
    const [FormLoading, setFormLoading] = useState(false);
    const { enqueueSnackbar } = useSnackbar();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setFormLoading(true);

        setTimeout( async () => {
            try {
                const userToken = await login(data).unwrap();
                reset();
                enqueueSnackbar("Login Successful", {variant: 'success', autoHideDuration: 5000});
                console.log(userToken);
            } catch (err) {
                let message = err?.data?.message || `${err?.status} Code: ${err?.originalStatus || "Call Master Joseph"}` || "An error occurred";
                enqueueSnackbar(message, {variant: 'error', autoHideDuration: 5000});
                console.log("Login failed: ", err);
            }
            finally {
                setFormLoading(false);
            }
        }, 1500);
    }

    return (
        <form id='loginForm' onSubmit={handleSubmit(onSubmit)}>
            <h3 className="fs-1 fw-bold card-title login-form-title form-title">Sign In</h3>
            <p className="fs-5 text-black-50 mt-5 mb-0 text-nowrap login-form-subtitle form-subtitle">
                Please enter your credentials
            </p>

            {isError && (
                <div className="alert alert-danger p-2" role="alert">
                    <span className="h6 text-danger">{error?.data?.detail}</span>
                </div>
            )}

            <div className="form-field-container">
                <InputField
                    type="email"
                    placeholder="Enter your email"
                    autoComplete="off"
                    register={register("email", {
                        required: "Email is required",
                        pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Please enter a valid email",
                        },
                    })}
                    errors={errors.email}
                    icon={FiMail}
                />
                <InputField
                    type="password"
                    placeholder="Enter your password"
                    autoComplete="off"
                    register={register("password", {
                        required: "Password is required",
                    })}
                    errors={errors.password}
                    icon={FiLock}
                />
                <div className="d-block-inline mb-2 mt-3">
                    <button className="btn form-control-lg btn-primary w-100 fw-normal mt-3 p-2 login-submit-btn">
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
                    ): (
                        "Sign In"
                    )}
                    </button>
                </div>
            </div>
        </form>
    )
}

export default LoginForm