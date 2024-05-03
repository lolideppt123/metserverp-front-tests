import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import DraftForm from '../../modules/SalesModule/DraftForm';

export default function AddSales() {
    const { loading: customerLoad, response: customer, setResponse: setCustomer, error: customerErr, axiosFetch: customerFetch } = useAxiosFunction();
    const { loading: productLoad, response: product, setResponse: setProduct, error: productErr, axiosFetch: productFetch } = useAxiosFunction();
    const Labels = {
        PAGE_ENTITY: 'Sales',
        PAGE_ENTITY_URL: 'sales',
        ADD_NEW_ENTITY: 'Add New Sales',
        METHOD: 'post',
        API_URL: 'sales/'
    }

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
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
        customerLoad,
        productLoad,
        setCustomer,
        setProduct,
    }
    return (
        <>
            <AddFormPageHeader config={config} />
            {
                customerLoad || productLoad ? (
                    <Spinner />
                ) : (
                    productErr || customerErr ? (
                        <NoServerResponse error={productErr} />
                    ) : (

                        // <SalesForm config={config} />
                        <DraftForm config={config} />
                    )
                )
            }
        </>
    )
}
