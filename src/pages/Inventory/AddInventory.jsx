import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import InventoryForm from '../../modules/InventoryModule/InventoryForm';

export default function AddInventory() {
    const { setResponse: setSupplier, loading: supplierLoad, response: supplier, error: supplierErr, axiosFetch: supplierFetch } = useAxiosFunction();
    const { setResponse: setProduct, loading: productLoad, response: product, error: productErr, axiosFetch: productFetch } = useAxiosFunction();
    const Labels = {
        PAGE_ENTITY: 'Product Inventory',
        PAGE_ENTITY_URL: 'inventory/products',
        ADD_NEW_ENTITY: 'Add New Inventory',
        METHOD: 'post',
        API_URL: 'inventory/products/'
    }

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            await supplierFetch({
                url: 'suppliers/',
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
        supplier,
        product,
        supplierLoad,
        productLoad,
        setSupplier,
        setProduct
    }

    return (
        <>
            <AddFormPageHeader config={config} />
            {
                productLoad || supplierLoad ?
                    (
                        <Spinner />
                    ) : (
                        productErr ?
                            (
                                <NoServerResponse error={productErr} />
                            ) : (

                                <InventoryForm config={config} />
                            )
                    )
            }
        </>
    )
}
