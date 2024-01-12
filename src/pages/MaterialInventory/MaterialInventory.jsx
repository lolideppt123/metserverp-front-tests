import useFetch from '../../hooks/useFetch';

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import MaterialInventoryDataTable from '../../modules/MaterialInventoryModule/MaterialInventoryDataTable';

export default function MaterialInventory() {
    const Labels = {
        BASE_ENTITY: 'Inventory',
        TABLE_TITLE: 'Material Inventory',
        ADD_NEW_ENTITY: 'Add New Material Inventory',
        NEW_ENTITY_URL: 'inventory/materials/add',
    }
    const dataTableColumn = [
        {
            title: 'Last Order',
            key: 'orderedDate'
        },
        {
            title: 'Product',
            key: 'product'
        },
        {
            title: 'Current Stock',
            key: 'currentStock'
        },
        {
            title: 'Unit Price',
            key: 'unitPrice'
        },
        {
            title: 'Unit',
            key: 'productUnit'
        },
        // {
        //     title: 'Last Order',
        //     key: 'orderedDate'
        // },
        {
            title: 'Updated',
            key: 'updated'
        },
    ]

    const { data, loading, error } = useFetch('inventory/materials/');
    const config = {
        dataTableColumn,
        Labels,
        data,
        loading,
        error,
    }
    return (
        <>
            <DataTablePageHeader Labels={Labels} />
            <MaterialInventoryDataTable config={config} />
        </>

    )
}
