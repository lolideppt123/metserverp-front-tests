import { useAddSupplierMutation } from '../../features/suppliers/supplierApiSlice';
import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import CompanyForm from '../../modules/FspPanelModule/CompanyForm';

export default function AddSupplier() {
    const [addSupplier, { data, error, isLoading, isSuccess }] = useAddSupplierMutation();
    const Labels = {
        PAGE_ENTITY: 'Suppliers',
        PAGE_ENTITY_URL: 'suppliers',
        ADD_NEW_ENTITY: 'Add New Supplier',
        METHOD: 'post',
        API_URL: 'suppliers/'
    }
    const config = {
        Labels,
        action: addSupplier,
        actionLoading: isLoading,
        actionSuccess: isSuccess,
        actionError: error,
        actionResponse: data
    }
    return (
        <>
            <AddFormPageHeader config={config} onBack />
            <CompanyForm config={config} />
        </>
    )
}
