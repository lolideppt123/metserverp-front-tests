import AuthContainer from "../../../components/Containers/AuthContainer";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";

import { FiMail, FiLock } from "react-icons/fi";
import useAuth from "../../../hooks/useAuth";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    setCredentials,
    selectUser,
    selectToken,
} from "../../../features/auth/authSlice";
import { useLoginMutation } from "../../../features/auth/authApiSlice";

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login, { isLoading }] = useLoginMutation();
    // console.log(useLoginMutation())
    // const USER = useSelector(selectUser);
    // const { access, refresh } = useSelector(selectToken);

    const { loginUser, user, errMsg } = useAuth();
    // const { errMsg } = useAuth();
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const onSubmit = async (data) => {
        const { email } = data;
        // console.log(email)
        try {
            const userToken = await login(data).unwrap();
            console.log(userToken);
            dispatch(setCredentials({ token: userToken, user: email }));
            reset();
            navigate("/");
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <AuthContainer
            left={
                <div className="form-container-left">
                    {/* <h6>{USER}</h6>
                    <p>{(Token.access).slice(0, 9)}...</p> */}
                    <form id="loginForm" onSubmit={handleSubmit(loginUser)}>
                        {errMsg && (
                            // <p className='text-danger'>{errMsg}</p>
                            <div className="alert alert-danger" role="alert">
                                <span className="h6">{errMsg}</span>
                            </div>
                        )}
                        <h3 className="fs-1 fw-bold card-title login-form-title form-title">Sign In</h3>
                        <p className="fs-5 text-black-50 mt-5 mb-0 text-nowrap login-form-subtitle form-subtitle">
                            Please enter your credentials
                        </p>
                        <div className="form-field-container">
                            <div className="input-wrapper login-email-field email-field">
                                <input
                                    type="email"
                                    className="input-item form-control-lg"
                                    placeholder="Enter your email"
                                    autoComplete="off"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                                            message:
                                                "Please enter a valid email",
                                        },
                                    })}
                                />
                                <FiMail className="input-item-icon" />
                            </div>
                            {errors.email && (
                                <p
                                    className="text-danger px-1 mt-1 mb-2"
                                    style={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                    }}
                                >
                                    {errors.email.message}
                                </p>
                            )}
                            <div className="input-wrapper login-password-field password-field">
                                <input
                                    type="password"
                                    {...register("password", {
                                        required: "Password is required",
                                    })}
                                    className="input-item form-control-lg"
                                    placeholder="Enter your password"
                                />
                                <FiLock className="input-item-icon" />
                            </div>
                            {errors.password && (
                                <p
                                    className="text-danger px-1 mt-1 mb-2"
                                    style={{
                                        fontWeight: "600",
                                        fontSize: "13px",
                                    }}
                                >
                                    {errors.password.message}
                                </p>
                            )}
                            <div className="d-block-inline mb-2 mt-3">
                                <button className="btn form-control-lg btn-primary w-100 fw-normal mt-3 p-2 login-submit-btn">
                                    Sign In
                                </button>
                            </div>
                            {/* <div className="signup-wrapper d-flex flex-row mt-4 flex justify-content-center align-items-center">
                                <p className="font-medium text-base mb-0">Don't have an account?</p>
                                <NavLink to={'/signup'} className="signup-link">Signup</NavLink>
                            </div> */}
                        </div>
                    </form>
                </div>
            }
        ></AuthContainer>
    );
}
