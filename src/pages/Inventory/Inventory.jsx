import useFetch from '../../hooks/useFetch';

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import InventoryDataTable from '../../modules/InventoryModule/InventoryDataTable';

export default function Inventory() {
    const Labels = {
        BASE_ENTITY: 'Inventory',
        TABLE_TITLE: 'Product Inventory',
        ADD_NEW_ENTITY: 'Add New Inventory',
        NEW_ENTITY_URL: 'inventory/product/add',
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

    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     axiosInstance
    //         .get('inventory/')
    //         .then((response) => {
    //             console.log(response.data)
    //             setData(response.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])

    const { data, loading, error } = useFetch('inventory/');
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
            <InventoryDataTable config={config} />
        </>

    )
}
