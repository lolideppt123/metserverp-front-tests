import useFetch from '../../hooks/useFetch';

import ProductForm from '../../modules/ProductsModule/ProductForm';
import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';

export default function AddProduct() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const Labels = {
        PAGE_ENTITY: 'Products',
        PAGE_ENTITY_URL: 'products',
        ADD_NEW_ENTITY: 'Add New Product',
    }

    const { data: unit, loading: unitLoad, error: unitErr } = useFetch('products/unit');
    const { data: category, loading: categoryLoad, error: categoryErr } = useFetch('products/unitcategory');
    const { data: material, loading: materialLoad, error: materialErr } = useFetch('materials/');

    const config = {
        Labels,
        unit,
        category,
        material,
        unitLoad,
        categoryLoad,
        materialLoad,
    }

    return (
        <>
            <AddFormPageHeader config={config} onBack />
            <ProductForm config={config} />
        </>
    )
}
