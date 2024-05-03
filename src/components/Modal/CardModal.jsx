import { Modal } from "antd";
import { FiX } from "react-icons/fi";

import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function CardModal({ notAllowed, classList, buttonText, children, titleProp, modalWidth, setDestroy }) {
    const [open, setopen] = useState(false);

    const handleCancel = () => {
        setopen(false);
    };

    return (
        <>
            <NavLink className={`DD-link ${notAllowed && 'not-allowed'}`} onClick={() => {
                if (notAllowed) return
                setopen(true)
            }
            }>
                <div className={classList}>
                    {buttonText}
                </div>
            </NavLink>
            <Modal
                title={
                    titleProp
                }
                width={modalWidth}
                closeIcon={<FiX style={{ height: '24px', width: '24px', color: 'var(--bs-link-color)' }} />}
                open={open}
                onCancel={handleCancel}
                afterClose={() => setDestroy(true)}
                destroyOnClose
                footer={[

                ]}
            >
                {children}
            </Modal>
        </>
    )
}
