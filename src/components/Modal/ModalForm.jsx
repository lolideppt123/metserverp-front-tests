import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import { FiX } from 'react-icons/fi';

export default function ModalForm(props, { child }) {
    const [openModal, setOpenModal] = useState(false);
    const iconRef = useRef();
    return (
        <>

            <NavLink className="link-underline-opacity-0" onClick={() => setOpenModal(!openModal)}>
                {/* <span>{props.mainicon}</span>
                <span>{props.maintext}</span> */}

                <li className='d-flex'>
                    <div className="flex-shrink-1 DD-item-icon">
                        {props.icon}
                    </div>
                    <div className="flex-fill DD-item-text text-center">
                        <span>{props.text}</span>
                    </div>
                </li >

                {/* <span>Helloworld</span> */}
            </NavLink>
            {openModal && (
                <div onClick={() => setOpenModal(!openModal)} className='modal-form-container'>
                    <div onClick={(e) => { e.stopPropagation() }} className="modal-form-item-wrapper">
                        {/* <div className="bg-white w-100 h-100">

                        </div> */}
                            <FiX className='modal-close-btn' onClick={() => setOpenModal(!openModal)} />
                            <span>Helloworld</span>
                    </div>
                    {/* {child} */}
                </div>
            )}
        </>
    )
}
