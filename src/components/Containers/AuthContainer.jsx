import loginImage from '../../7088807.jpg'
import { useState, useEffect } from 'react';

export default function AuthContainer(props) {
    const [loadForm, setLoadForm] = useState(false);

    useEffect(() => {

        let timer = setTimeout(() => {
            console.log('loadForm');
            setLoadForm(true);
        }, 1000);
        return () => {
            clearTimeout(timer);
        };
    }, [])

    return (
        <div className={`form-body ${loadForm ? "form-loaded" : ""}`}>
            <div className={`form-body-contents`}>
                {props.left}
            </div>
            <div className="vh-100 w-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "#f3f1f6" }}>
                <img
                    className={`login-metserv-image ${loadForm ? "image-shrink" : ""}`}
                    src={loginImage}
                    alt="metserverp-main-image"
                />
            </div>
        </div>
    )
}
