import AuthContainer from "../../../components/Containers/AuthContainer";
import LoginForm from "./LoginForm";

export default function Login() {

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
