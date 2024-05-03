import { NavLink } from 'react-router-dom';
import { FiX } from 'react-icons/fi';

export default function ModalForm(props) {
    return (
        <div className="modal-form-container" onClick={props.closeModal}>
            <div className="modal-form-item-wrapper" onClick={(e) => { e.stopPropagation() }}>
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-4 mb-4 border-bottom">
                    <div className="title">
                        <h2>{props.title} Form</h2>
                    </div>
                    <div className="btn-group">
                        <NavLink onClick={props.closeModal}><FiX style={{ height: '24px', width: '24px', margin: '0 6px 3px 0', color: '#8540f5' }} /> </NavLink>
                    </div>
                </div>
                <div className="modalBody">
                    {props.modalBody}
                </div>
                <div className="modalFooter">
                    {props.modalFooter}
                </div>
            </div>
        </div>
    )
}
