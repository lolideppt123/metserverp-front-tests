
import { FiX } from 'react-icons/fi';

export default function ModalFormItem() {
    return (
        <div onClick={(e) => { e.stopPropagation() }} className="modal-form-item-wrapper">
            <div className="bg-white">

                <FiX className='modal-close-btn' />
                <span>Helloworld</span>
            </div>
        </div>
    )
}
