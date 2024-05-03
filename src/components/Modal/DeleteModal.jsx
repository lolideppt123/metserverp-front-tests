import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Modal } from "antd";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import useAxiosFunction from "../../hooks/useAxiosFunction";

// redux
import { useSelector, useDispatch } from "react-redux";
import { selectModalDelete, modalDelete } from "../../features/modal/modalSlice";

export default function DeleteModal({ deleteConfig }) {
    const {
        link3,
        linkExt,
        message,
        buttonText,
        notAllowed,
        api_url,
        setData,
        setDestroy
    } = deleteConfig;
    const myModal = useSelector(selectModalDelete);
    const dispatch = useDispatch();

    const { axiosFetch: dataFetch } = useAxiosFunction();
    const { success, setSuccess, response: customer, axiosFetch: customerFetch } = useAxiosFunction();
    const [loading, setLoading] = useState(false);

    const showModal = () => {
        if (notAllowed) return
        dispatch(modalDelete(true));
    };

    const handleOk = async () => {
        setLoading(true);
        const configObj = {
            url: `${link3}${linkExt ? linkExt : ""}`,
            method: `delete`,
        }

        setTimeout(async () => {
            await dataFetch(configObj);
            await customerFetch({
                url: `${api_url}`,
                method: 'get'
            });

        }, 1500);
    };
    const handleCancel = () => {
        dispatch(modalDelete(false));
        setLoading(false);
    };

    useEffect(() => {
        if (success) {
            setData(customer);
            dispatch(modalDelete(false));
            setLoading(false);
            setSuccess(false);
        }
    }, [success])

    return (
        <>
            <NavLink className={`DD-link ${notAllowed && 'not-allowed'}`} onClick={showModal}>
                <div className={`DD-link ${notAllowed && "not-allowed text-muted"} DD-item-text`}>
                    {buttonText}
                </div>
            </NavLink>
            <Modal
                title={
                    <div className="d-flex align-items-center mb-4">
                        <FiAlertTriangle className="text-danger" style={{ width: '25', height: '25', marginRight: '8px' }} />
                        <h5 className="d-flex align-items-center m-0">Delete Confirmation</h5>
                    </div>
                }
                closeIcon={<FiX style={{ height: '24px', width: '24px', color: 'var(--bs-link-color)' }} />}
                open={myModal}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleOk} className="btn-danger">
                        Delete
                    </Button>,
                ]}
                afterClose={() => setDestroy(true)}
                destroyOnClose
            >
                <div className="d-flex flex-wrap align-items-center m-0">
                    <span className="h6">Are you sure you want to delete&nbsp;</span>
                    <span className="text-danger h6"> {message} </span>
                    <span className="h6"> ?</span>
                </div>
            </Modal>
        </>
    )
}

