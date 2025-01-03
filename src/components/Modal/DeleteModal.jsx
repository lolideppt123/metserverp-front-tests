import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Modal } from "antd";
import { FiAlertTriangle, FiX } from "react-icons/fi";
import useAxiosFunction from "../../hooks/useAxiosFunction";

import { useSnackbar } from "notistack";

// redux
import { useSelector, useDispatch } from "react-redux";
import { selectModalDelete, modalDelete } from "../../features/modal/modalSlice";
import { useDeleteSalesMutation } from "../../features/sales/salesApiSlice";
import { useDeleteInventoryProductMutation } from "../../features/inventory/inventoryApiSlice";
import { useDeleteSalesOrderMutation } from "../../features/sales/salesOrderApiSlice";
import { useDeleteInventoryMaterialMutation } from "../../features/inventory/materialInventoryApiSlice";
import { useDeleteMaterialMutation } from "../../features/materials/materialApiSlice";
import { useDeleteProductMutation } from "../../features/products/productApiSlice";

export default function DeleteModal({ deleteConfig }) {
    const {
        link3,
        linkExt,
        message,
        buttonText,
        notAllowed,
        api_url,
        setData,
        setDestroy,
        component = "",
        recordID = ""
    } = deleteConfig;

    const myModal = useSelector(selectModalDelete);
    const dispatch = useDispatch();
    const [deleteSales, {isLoading, isError, error}] = useDeleteSalesMutation();
    const [deleteInventory] = useDeleteInventoryProductMutation();
    const [deleteInvoice] = useDeleteSalesOrderMutation();
    const [deleteMaterialInventory] = useDeleteInventoryMaterialMutation();
    const [deleteRawMaterial] = useDeleteMaterialMutation();
    const [deleteProduct] = useDeleteProductMutation();

    const { axiosFetch: dataFetch } = useAxiosFunction();
    const { success, setSuccess, response: customer, axiosFetch: customerFetch } = useAxiosFunction();
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();

    const showModal = () => {
        if (notAllowed) return
        dispatch(modalDelete(true));
    };

    const handleDelete = async () => {

        if(!recordID) return;

        setLoading(true);

        let message = "";
        let variant = "";

        setTimeout(async () => {
            try {
                if (component === "sales") {   
                    const response = await deleteSales(recordID).unwrap();
                    message = response?.message;
                } else if (component === 'inventory') {
                    const response = await deleteInventory(recordID).unwrap();
                    message = response?.message;
                } else if (component === 'invoice') {
                    const response = await deleteInvoice(recordID).unwrap();
                    message = response?.message;
                } else if (component === 'material-inventory') {
                    const response = await deleteMaterialInventory(recordID).unwrap();
                    message = response?.message;
                } else if (component === 'raw-materials') {
                    const response = await deleteRawMaterial(recordID).unwrap();
                    message = response?.message;
                } else if (component === 'products') {
                    const response = await deleteProduct(recordID).unwrap();
                    message = response?.message;
                }
                variant = "success";
            }
            catch (err) {
                console.log(`Deleting ${component} error: `, err);
                message = err?.data?.message || err?.data?.detail || `${err?.status} Code: ${err?.originalStatus || "Call Master Joseph"}` || "An error occurred";
                variant = "error";
            }
            finally {

                enqueueSnackbar(message, {variant: variant, autoHideDuration: 5000});
                setLoading(false);
                // Close modal
                dispatch(modalDelete(false));
            }
        }, 1500);
    };

    const handleCancel = () => {
        dispatch(modalDelete(false));
    };

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
                onOk={handleDelete}
                onCancel={handleCancel}
                footer={[
                    <Button key="back" onClick={handleCancel}>
                        Cancel
                    </Button>,
                    <Button key="submit" type="primary" loading={loading} onClick={handleDelete} className="btn-danger">
                        Delete
                    </Button>,
                ]}
                afterClose={() => setDestroy(true)}
                maskClosable={false}
                destroyOnClose
            >
                {message}
            </Modal>
        </>
    )
}

