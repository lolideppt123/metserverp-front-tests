import useFetch from '../../hooks/useFetch';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import MaterialInventoryForm from '../../modules/MaterialInventoryModule/MaterialInventoryForm';

export default function AddMaterialInventory() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const Labels = {
        PAGE_ENTITY: 'Material Inventory',
        PAGE_ENTITY_URL: 'inventory/materials',
        ADD_NEW_ENTITY: 'Add New Material Inventory',
    }

    const { data: supplier, loading: supplierLoad, error: supplierErr } = useFetch('supplier/');
    const { data: material, loading: materialLoad, error: materialErr } = useFetch('materials/');

    const config = {
        Labels,
        supplier,
        material,
        supplierLoad,
        materialLoad,
    }

    return (
        <>
            <AddFormPageHeader config={config} />
            <MaterialInventoryForm config={config} />
        </>
    )
}
