import AuthContainer from '../../../components/Containers/AuthContainer';
import { useForm } from 'react-hook-form';

import { NavLink } from 'react-router-dom';

export default function Register() {

    const {
        register,
        handleSubmit,
        watch,
        getValues,
        formState: { errors }
    } = useForm();
    return (
        <AuthContainer left={
            <div className="form-container-left" style={{ width: '50%' }}>
                <form action="">
                    <h3 className='fs-1 fw-bold card-title'>Signup</h3>
                    <p className='fs-5 text-black-50 mt-2 mb-5'>Please fill up the from</p>
                    <div>
                        <div className="d-flex gap-2">
                            <div className='flex-fill input-wrapper'>
                                <input type="text"
                                    {...register('username', { required: "Username is required" })}
                                    className='input-item form-control-lg'
                                    placeholder='First Name'
                                    autoComplete='off'
                                />
                                {/* <FiMail className='input-item-icon' /> */}
                            </div>
                            <div className='flex-fill input-wrapper'>
                                <input type="text"
                                    {...register('username', { required: "Username is required" })}
                                    className='input-item form-control-lg'
                                    placeholder='Last Name'
                                    autoComplete='off'
                                />
                                {/* <FiMail className='input-item-icon' /> */}
                            </div>
                        </div>
                        <div className='input-wrapper'>
                            <input type="text"
                                {...register('username', { required: "Username is required" })}
                                className='input-item form-control-lg w-100 w-100'
                                placeholder='Username'
                                autoComplete='off'
                            />
                            {/* <FiMail className='input-item-icon' /> */}
                        </div>
                        <div className='input-wrapper'>
                            <input type="text"
                                {...register('username', { required: "Username is required" })}
                                className='input-item form-control-lg w-100'
                                placeholder='Email'
                                autoComplete='off'
                            />
                            {/* <FiMail className='input-item-icon' /> */}
                        </div>
                        <div className='input-wrapper'>
                            <input type="password"
                                {...register('password', {
                                    required: "Password is required",
                                    minLength: {
                                        value: 6,
                                        message: "Password must have atleast 6 characters"
                                    },
                                }
                                )}
                                className='input-item form-control-lg w-100'
                                placeholder='Enter your password'
                            />
                            {/* <FiLock className='input-item-icon' /> */}
                        </div>
                        {errors.password && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.password.message}</p>)}
                        <div className='input-wrapper'>
                            <input type="password"
                                {...register('confirm', {
                                    required: "Confirm Password is required",
                                    validate: (value) => value === getValues("password") || "Passwords do not match"
                                }
                                )}
                                className='input-item form-control-lg w-100'
                                placeholder='Confirm password'
                            />
                        </div>
                        {errors.confirm && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.confirm.message}</p>)}
                        <div className='d-block-inline mb-2 mt-4'>
                            <button className='btn form-control-lg btn-primary w-100 mt-3 fw-bold p-2'>Signup</button>
                        </div>
                        <div className="signup-wrapper d-flex flex-row mt-4 flex justify-content-center align-items-center">
                            <p className="font-medium text-base mb-0">Already have an account?</p>
                            <NavLink to={'/'} className="signup-link">Login</NavLink>
                        </div>
                    </div>
                </form>
            </div>
        }
        />
    )
}
