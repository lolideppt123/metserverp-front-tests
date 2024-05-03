import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import MaterialInventoryForm from '../../modules/MaterialInventoryModule/MaterialInventoryForm';


export default function EditMaterialInventory() {
    const { id } = useParams();
    const { loading: itemLoad, response: item, error: itemErr, axiosFetch: itemFetch } = useAxiosFunction();
    const { loading: materialLoad, response: material, error: materialErr, axiosFetch: materialFetch } = useAxiosFunction();
    const { loading: supplierLoad, response: supplier, error: supplierErr, axiosFetch: supplierFetch } = useAxiosFunction();

    const Labels = {
        PAGE_ENTITY: 'Material Inventory',
        PAGE_ENTITY_URL: 'inventory/materials',
        ADD_NEW_ENTITY: 'Edit Material Inventory',
        METHOD: 'put',
        API_URL: `inventory/materials/${id}`
    }

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            await itemFetch({
                url: `inventory/materials/${id}`,
                method: 'get'
            });
            await materialFetch({
                url: 'materials/',
                method: 'get'
            });
            await supplierFetch({
                url: 'suppliers/',
                method: 'get'
            });

        }
        getData();

    }, [])

    const config = {
        Labels,
        item,
        supplier,
        material,
        itemLoad,
        supplierLoad,
        materialLoad,
    }

    console.log(item);
    return (
        <>
            <AddFormPageHeader config={config} />
            {
                supplierLoad || materialLoad || itemLoad ? (
                    <Spinner />
                ) : (
                    supplierErr || materialErr || itemErr ? (
                        <NoServerResponse error={itemErr} />
                    ) : (
                        <MaterialInventoryForm config={config} />
                    )
                )
            }
        </>
    )
}
