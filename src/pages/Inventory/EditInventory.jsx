import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import InventoryEditForm from '../../modules/InventoryModule/InventoryEditForm';
import { useGetInventoryProductItemQuery } from '../../features/inventory/inventoryApiSlice';

export default function EditInventory() {
    // const { loading: supplierLoad, response: supplier, error: supplierErr, axiosFetch: supplierFetch } = useAxiosFunction();
    // const { loading: productsLoad, response: products, error: productsErr, axiosFetch: productsFetch } = useAxiosFunction();
    // const { loading: itemLoad, response: item, error: itemErr, axiosFetch: itemFetch } = useAxiosFunction();

    const { id } = useParams();
    const Labels = {
        PAGE_ENTITY: 'Product Inventory',
        PAGE_ENTITY_URL: 'inventory/products',
        ADD_NEW_ENTITY: 'Edit Product Inventory',
        METHOD: 'put',
        API_URL: `inventory/transaction/${id}/edit`
    }

    const {data, isError, isLoading, error} = useGetInventoryProductItemQuery(id);

    const config = {
        Labels,
        data,
        id,
        isLoading
    }

    console.log(data);

    return (
        <>
            <AddFormPageHeader config={config} />
            {
                isLoading ?
                    (
                        <Spinner />
                    ) : (
                        isError ?
                            (
                                <NoServerResponse error={error} />
                            ) : (
                                <InventoryEditForm config={config} />
                            )
                    )
            }
        </>
    )
}
