import useFetch from '../../hooks/useFetch';

import AddFormPageHeader from "../../modules/FspPanelModule/AddFormPageHeader"
import RawMaterialForm from "../../modules/RawMaterialModule/RawMaterialForm"

export default function AddRawMaterials() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const Labels = {
        PAGE_ENTITY: 'Materials',
        PAGE_ENTITY_URL: 'materials',
        ADD_NEW_ENTITY: 'Add New Material',
    }

    const { data: category, loading: categoryLoad, error: categoryErr } = useFetch('products/unitcategory');
    const { data: unit, loading: unitLoad, error: unitErr } = useFetch('products/unit');

    const config = {
        Labels,
        unit,
        category,
        unitLoad,
        categoryLoad,
    }
    return (
        <div>
            <AddFormPageHeader config={config} />
            <RawMaterialForm config={config} />
        </div>
    )
}
