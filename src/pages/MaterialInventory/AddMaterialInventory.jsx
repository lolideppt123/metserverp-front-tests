import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import MaterialInventoryForm from '../../modules/MaterialInventoryModule/MaterialInventoryForm';
import { useGetDictionaryQuery } from '../../features/utils/dictionaryApiSlice';

export default function AddMaterialInventory() {

    const Labels = {
        PAGE_ENTITY: 'Material Inventory',
        PAGE_ENTITY_URL: 'inventory/materials',
        ADD_NEW_ENTITY: 'Add New Material Inventory',
        METHOD: 'post',
        API_URL: 'inventory/materials/'
    }

    const { data: {
        suppliers: supplier,
        materials: material,
    } = {}, isSuccess, isError, error, isLoading } = useGetDictionaryQuery();

    const config = {
        Labels,
        supplier,
        material,
        isLoading
    }

    return (
        <>
            <AddFormPageHeader config={config} />
            {
                isLoading?
                    (
                        <Spinner />
                    ) : (
                        isError && !isSuccess?
                            (
                                <NoServerResponse error={error} />
                            ) : (
                                <MaterialInventoryForm config={config} />
                            )
                    )
            }
        </>
    )
}
