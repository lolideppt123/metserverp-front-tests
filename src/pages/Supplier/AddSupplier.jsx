import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import CompanyForm from '../../modules/FspPanelModule/CompanyForm';

export default function AddSupplier() {
    const Labels = {
        PAGE_ENTITY: 'Suppliers',
        PAGE_ENTITY_URL: 'suppliers',
        ADD_NEW_ENTITY: 'Add New Supplier',
        METHOD: 'post',
        API_URL: 'suppliers/'
    }
    const config = {
        Labels,
    }
    return (
        <>
            <AddFormPageHeader config={config} onBack />
            <CompanyForm config={config} />
        </>
    )
}
