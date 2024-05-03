import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import CompanyForm from '../../modules/FspPanelModule/CompanyForm';

export default function AddCustomer() {
    const Labels = {
        PAGE_ENTITY: 'Customers',
        PAGE_ENTITY_URL: 'customers',
        ADD_NEW_ENTITY: 'Add New Customer',
        METHOD: 'post',
        API_URL: 'customers/'
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
