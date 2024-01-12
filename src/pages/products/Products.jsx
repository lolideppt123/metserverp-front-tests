import useFetch from '../../hooks/useFetch';

import ProductsDataTable from '../../modules/ProductsModule/ProductsDataTable';
import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';


export default function Products() {
    const entity = 'products';
    const Labels = {
        BASE_ENTITY: 'Products',
        TABLE_TITLE: 'Product',
        ADD_NEW_ENTITY: 'Add New Product',
        NEW_ENTITY_URL: 'products/add',
    }
    const dataTableColumn = [
        {
            title: 'Product',
            key: 'product'
        },
        {
            title: 'Minimum Stock',
            key: 'minimumStock'
        },
        {
            title: 'Unit',
            key: 'unit'
        },
        {
            title: 'Note',
            key: 'note'
        },
        {
            title: '',
            key: 'action'
        }
    ]

    const { data, loading, error } = useFetch('products/');
    console.log(data)
    const config = {
        entity,
        Labels,
        dataTableColumn,
        data,
        loading,
        error,
    }

    return (
        <>
            <DataTablePageHeader Labels={Labels} />
            <ProductsDataTable config={config} />
        </>
    )
}
