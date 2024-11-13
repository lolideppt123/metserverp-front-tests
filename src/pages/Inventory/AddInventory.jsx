import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import InventoryForm from '../../modules/InventoryModule/InventoryForm';
import { useGetDictionaryQuery } from '../../features/utils/dictionaryApiSlice';

export default function AddInventory() {
    const Labels = {
        PAGE_ENTITY: 'Product Inventory',
        PAGE_ENTITY_URL: 'inventory/products',
        ADD_NEW_ENTITY: 'Add New Inventory',
        METHOD: 'post',
        API_URL: 'inventory/products/'
    }

    // Redux
    const {data: {
        products: product,
        suppliers: supplier,
    } = {}, isLoading, isError, error, isSuccess} = useGetDictionaryQuery();

    const config = {
        Labels,
        supplier,
        product,
        isLoading
    }

    return (
        <>
            <AddFormPageHeader config={config} />
            {
                isLoading ?
                    (
                        <Spinner />
                    ) : (
                        isError && !isSuccess ?
                            (
                                <NoServerResponse error={error} />
                            ) : (
                                <InventoryForm config={config} />
                            )
                    )
            }
        </>
    )
}
