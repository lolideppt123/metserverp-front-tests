import { useState } from 'react';
import { Flex, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import { salesFormReset } from '../../features/sales/salesSlice';


export default function ConfirmationModal({ children, isOpen = false, loadData }) {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(isOpen);
    const [confirmLoading, setConfirmLoading] = useState(false);

    // const showPopconfirm = () => {
    //     setOpen(true);
    // };

    const handleOk = () => {
        setConfirmLoading(true);

        setTimeout(() => {
            setOpen(false);
            setConfirmLoading(false);
            loadData();
        }, 2000);
    };

    const handleCancel = () => {
        console.log('Clicked cancel button');
        dispatch(salesFormReset());
        setOpen(false);
    };

    return (
        <Flex vertical >
            <Popconfirm
                title="Sales Form."
                description="Do you want to load previous form saved draft?"
                open={open}
                onConfirm={handleOk}
                okButtonProps={{ loading: confirmLoading }}
                onCancel={handleCancel}
            >
                {children}
            </Popconfirm>
        </Flex>
    )

}