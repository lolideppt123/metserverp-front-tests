import { Modal } from "antd";
import { FiX } from "react-icons/fi";

export default function FormModal({ config, children, OpenModal, setOpenModal }) {

    return (
        <>
            <Modal
                title={
                    <div className="d-flex align-items-center mb-4">
                        <h5 className="d-flex align-items-center m-0">{config?.FORM_ENTITY} Form</h5>
                    </div>
                }
                width={600}
                closeIcon={<FiX style={{ height: '24px', width: '24px', color: 'var(--bs-link-color)' }} />}
                open={OpenModal}
                onCancel={() => setOpenModal(false)}
                footer={[

                ]}
            >
                {children}
            </Modal>
        </>

    )
}
