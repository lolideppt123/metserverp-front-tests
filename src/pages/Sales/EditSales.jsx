import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosFunction from '../../hooks/useAxiosFunction';

import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import SalesEditForm from '../../modules/SalesModule/SalesEditForm';
import SalesForm from '../../modules/SalesModule/SalesForm';

export default function EditSales() {
    const { id } = useParams();
    const { loading: customerLoad, response: customer, error: customerErr, axiosFetch: customerFetch } = useAxiosFunction();
    const { loading: productLoad, response: product, error: productErr, axiosFetch: productFetch } = useAxiosFunction();
    const { loading: saleLoad, response: sale, error: saleErr, axiosFetch: saleFetch } = useAxiosFunction();
    const Labels = {
        PAGE_ENTITY: 'Sales',
        PAGE_ENTITY_URL: 'sales',
        ADD_NEW_ENTITY: 'Edit Sales',
        METHOD: 'put',
        API_URL: `sales/transaction/${id}/edit`
    }

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            await saleFetch({
                url: `sales/transaction/${id}/edit`,
                method: 'get'
            });
            await customerFetch({
                url: 'customers/',
                method: 'get'
            });
            await productFetch({
                url: 'products/',
                method: 'get'
            });
        }
        getData();
    }, [])


    const config = {
        Labels,
        customer,
        product,
        sale,
        id,
        productLoad,
        customerLoad,
        saleLoad,
    }
    return (
        <>
            <AddFormPageHeader config={config} />
            {
                customerLoad || productLoad ? (
                    <Spinner />
                ) : (
                    productErr || customerErr || saleErr ? (
                        <NoServerResponse error={saleErr} />
                    ) : (
                        <SalesEditForm config={config} />
                        // <SalesForm config={config} />
                    )
                )
            }
        </>
    )
}
