import { useParams } from 'react-router-dom';
import useFetch from '../../hooks/useFetch';
import Spinner from '../../components/Fallback/Spinner';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import CompanyForm from '../../modules/FspPanelModule/CompanyForm'
import { useGetCustomerQuery, useUpdateCustomerMutation } from '../../features/customers/customerApiSlice';

export default function EditCustomer() {
    const { id } = useParams();
    const [updateCustomer, { data, error, isLoading, isSuccess }] = useUpdateCustomerMutation();
    const { data: company, isLoading: companyLoad, isError: companyErr } = useGetCustomerQuery(id);

    const Labels = {
        PAGE_ENTITY: 'Customers',
        PAGE_ENTITY_URL: 'customers',
        ADD_NEW_ENTITY: 'Edit Customer',
        METHOD: 'put',
        API_URL: `customers/${id}`
    }

    const config = {
        id,
        Labels,
        company,
        companyLoad,
        companyErr,
        action: updateCustomer,
        actionLoading: isLoading,
        actionSuccess: isSuccess,
        actionError: error,
        actionResponse: data
    }

    return (
        <>
            <AddFormPageHeader config={config} />
            {
                companyLoad ?
                    (
                        <Spinner />
                    ) : (
                        companyErr ? (
                            <NoServerResponse error={companyErr} />
                        ) : (
                            <CompanyForm config={config} />
                        )
                    )
            }
        </>
    )
}
