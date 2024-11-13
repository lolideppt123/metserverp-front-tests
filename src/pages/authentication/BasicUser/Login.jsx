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
import LoginForm from "./LoginForm";

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
                    <LoginForm />
                </div>
            }
        />
    );
}
