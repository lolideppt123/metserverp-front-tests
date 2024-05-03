import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import GetStartedTemplate from '../../components/Fallback/GetStartedTemplate';

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import MaterialInventoryDataTable from '../../modules/MaterialInventoryModule/MaterialInventoryDataTable';

export default function MaterialInventory() {
    const { loading, response: data, error, axiosFetch } = useAxiosFunction();
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

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            await axiosFetch({
                url: 'inventory/materials/',
                method: 'get'
            });
        }
        getData();
    }, [])

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

            {
                loading ?
                    (
                        <Spinner />
                    ) : (
                        error ?
                            (
                                <NoServerResponse error={error} />
                            ) : (
                                data?.length == 0 ? (
                                    <GetStartedTemplate entity={'Material Inventory'} optionalStatement={true} />
                                ) : (
                                    <MaterialInventoryDataTable config={config} />
                                )
                            )
                    )
            }
        </>

    )
}
