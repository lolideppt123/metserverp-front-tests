
import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import AddCompanyForm from '../../modules/FspPanelModule/AddCompanyForm';

export default function AddCustomer() {
    const Labels = {
        PAGE_ENTITY: 'Customers',
        PAGE_ENTITY_URL: 'customers',
        ADD_NEW_ENTITY: 'Add New Customer',
    }
    const config = {
        Labels,
    }
    return (
        <>
            <AddFormPageHeader config={config} onBack />
            <AddCompanyForm config={config} />
        </>
    )
}
