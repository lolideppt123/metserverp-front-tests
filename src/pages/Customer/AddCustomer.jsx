import { useAddCustomerMutation } from '../../features/customers/customerApiSlice';
import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import CompanyForm from '../../modules/FspPanelModule/CompanyForm';

export default function AddCustomer() {
    const [addCustomer, { data, error, isLoading, isSuccess }] = useAddCustomerMutation();
    const Labels = {
        PAGE_ENTITY: 'Customers',
        PAGE_ENTITY_URL: 'customers',
        ADD_NEW_ENTITY: 'Add New Customer',
        METHOD: 'post',
        API_URL: 'customers/'
    }
    const config = {
        Labels,
        action: addCustomer,
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
