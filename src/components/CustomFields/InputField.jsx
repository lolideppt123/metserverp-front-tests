import React from 'react';
import { FiAlertCircle } from 'react-icons/fi'; // Alert icon for error indication

const InputField = ({ type, placeholder, autoComplete = 'on', register, errors, icon: Icon }) => {
    return (
        <>
            <div className={`input-wrapper ${errors ? 'input-wrapper-error' : ''}`}>
                <input
                    type={type}
                    className={`input-item form-control-lg ${errors ? 'input-error' : ''}`} // Add error class
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    {...register} // Spread the register object to bind it to the input
                />
                {Icon && <Icon className={`input-item-icon ${errors ? 'input-icon-error' : ''}`} />} {/* Render the icon if provided */}

            </div>
            {errors && (
                <div className="error-message">
                    <FiAlertCircle className="error-icon fw-bold" />
                    <span className="text-danger">{errors.message}</span>
                </div>
            )}
        </>
    );
}

export default InputField