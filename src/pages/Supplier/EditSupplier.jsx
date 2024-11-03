import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Fallback/Spinner';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import CompanyForm from '../../modules/FspPanelModule/CompanyForm'
import { useUpdateSupplierMutation, useGetSupplierQuery } from '../../features/suppliers/supplierApiSlice';

export default function EditCustomer() {
    const { id } = useParams();
    const [updateCustomer, { data, error, isLoading, isSuccess }] = useUpdateSupplierMutation();
    const { data: company, isLoading: companyLoad, isError: companyErr } = useGetSupplierQuery(id);

    const Labels = {
        PAGE_ENTITY: 'Suppliers',
        PAGE_ENTITY_URL: 'suppliers',
        ADD_NEW_ENTITY: 'Edit Supplier',
        METHOD: 'put',
        API_URL: `suppliers/${id}`
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
