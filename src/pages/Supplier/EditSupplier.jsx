import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Fallback/Spinner';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import CompanyForm from '../../modules/FspPanelModule/CompanyForm'

export default function EditCustomer() {
    const { id } = useParams();
    const { loading: companyLoad, response: company, error: companyErr, axiosFetch: companyFetch } = useAxiosFunction();
    const Labels = {
        PAGE_ENTITY: 'Suppliers',
        PAGE_ENTITY_URL: 'suppliers',
        ADD_NEW_ENTITY: 'Edit Supplier',
        METHOD: 'put',
        API_URL: `suppliers/${id}`
    }

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            await companyFetch({
                url: `suppliers/${id}`,
                method: 'get'
            });
        }
        getData();
    }, [])

    const config = {
        id,
        Labels,
        company,
        companyLoad,
        companyErr
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
