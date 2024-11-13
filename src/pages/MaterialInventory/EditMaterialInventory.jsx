import { useParams } from 'react-router-dom';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import MaterialInventoryForm from '../../modules/MaterialInventoryModule/MaterialInventoryForm';
import { useGetInventoryMaterialItemQuery } from '../../features/inventory/materialInventoryApiSlice';


export default function EditMaterialInventory() {
    const { id } = useParams();

    // Redux
    const {data: item, isError, isLoading, error, isSuccess} = useGetInventoryMaterialItemQuery(id);

    const Labels = {
        PAGE_ENTITY: 'Material Inventory',
        PAGE_ENTITY_URL: 'inventory/materials',
        ADD_NEW_ENTITY: 'Edit Material Inventory',
        METHOD: 'put',
        API_URL: `inventory/materials/${id}`
    }

    const config = {
        Labels,
        item,
        isLoading,
    }

    return (
        <>
            <AddFormPageHeader config={config} />
            {
                isLoading ? (
                    <Spinner />
                ) : (
                    isError && !isSuccess ? (
                        <NoServerResponse error={error} />
                    ) : (
                        <MaterialInventoryForm config={config} />
                    )
                )
            }
        </>
    )
}
