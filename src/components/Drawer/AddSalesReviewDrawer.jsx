import { Button, Drawer } from 'antd';
import React, { useState } from 'react'
import { FaChevronLeft } from 'react-icons/fa';

function AddSalesReviewDrawer({children}) {
    const [open, setOpen] = useState(false);

    const showDrawer = () => {
        setOpen(true);
    }

    const closeDrawer = () => {
        setOpen(false);
    }
    return (
        <div className="addSales-form-review-drawer d-none">
            <Button
                type='primary'
                shape='circle'
                icon={<FaChevronLeft className='DD-icon' />}
                onClick={showDrawer}
                className='addSales-drawer-toggle-btn align-items-center'
            />

            {/* Drawer Component */}
            <Drawer
                title="Review Stock"
                placement="right"
                closable
                destroyOnClose
                onClose={closeDrawer}
                open={open}
                width={500}
            >
                {children}
            </Drawer>
        </div>

    );
}

export default AddSalesReviewDrawer