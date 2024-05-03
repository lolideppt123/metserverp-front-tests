import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import InventoryEditForm from '../../modules/InventoryModule/InventoryEditForm';

export default function EditInventory() {
    const { loading: supplierLoad, response: supplier, error: supplierErr, axiosFetch: supplierFetch } = useAxiosFunction();
    const { loading: productsLoad, response: products, error: productsErr, axiosFetch: productsFetch } = useAxiosFunction();
    const { loading: itemLoad, response: item, error: itemErr, axiosFetch: itemFetch } = useAxiosFunction();

    const { id } = useParams();
    const Labels = {
        PAGE_ENTITY: 'Product Inventory',
        PAGE_ENTITY_URL: 'inventory/products',
        ADD_NEW_ENTITY: 'Edit Product Inventory',
        METHOD: 'put',
        API_URL: `inventory/transaction/${id}/edit`
    }

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            await supplierFetch({
                url: 'suppliers/',
                method: 'get'
            });
            await productsFetch({
                url: 'products/',
                method: 'get'
            });
            await itemFetch({
                url: `inventory/transaction/${id}/edit`,
                method: 'get'
            });
        }
        getData();
    }, [])

    const config = {
        Labels,
        supplier,
        products,
        item,
        supplierLoad,
        productsLoad,
        itemLoad,
        id,
    }

    return (
        <>
            <AddFormPageHeader config={config} />
            {
                supplierLoad || productsLoad || itemLoad ?
                    (
                        <Spinner />
                    ) : (
                        supplierErr || productsErr || itemErr ?
                            (
                                <NoServerResponse error={itemErr} />
                            ) : (

                                <InventoryEditForm config={config} />
                            )
                    )
            }
        </>
    )
}
