import React from 'react';
import { useForm } from 'react-hook-form';
import useAuth from '../../../hooks/useAuth';
import InputField from '../../../components/CustomFields/InputField';
import { FiMail, FiLock } from "react-icons/fi";
import { useLoginMutation } from '../../../features/auth/authApiSlice';
import { setCredentials } from '../../../features/auth/authSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const { loginUser, errMsg } = useAuth();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        // await loginUser(data);
        // reset();
        const { email } = data;
        try {
            const userToken = await login(data).unwrap();
            dispatch(setCredentials({ token: userToken, user: email }));
            reset();
            navigate('/');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <form id='loginForm' onSubmit={handleSubmit(onSubmit)}>
            <h3 className="fs-1 fw-bold card-title login-form-title form-title">Sign In</h3>
            <p className="fs-5 text-black-50 mt-5 mb-0 text-nowrap login-form-subtitle form-subtitle">
                Please enter your credentials
            </p>

            {errMsg && (
                <div className="alert alert-danger" role="alert">
                    <span className="h6">{errMsg}</span>
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
                        Sign In
                    </button>
                </div>
            </div>
        </form>
    )
}

export default LoginForm