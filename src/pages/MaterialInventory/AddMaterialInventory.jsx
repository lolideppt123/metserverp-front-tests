import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import MaterialInventoryForm from '../../modules/MaterialInventoryModule/MaterialInventoryForm';

export default function AddMaterialInventory() {
    const { loading: supplierLoad, response: supplier, error: supplierErr, axiosFetch: supplierFetch } = useAxiosFunction();
    const { loading: materialLoad, response: material, setResponse: setMaterial, error: materialErr, axiosFetch: materialFetch } = useAxiosFunction();
    const Labels = {
        PAGE_ENTITY: 'Material Inventory',
        PAGE_ENTITY_URL: 'inventory/materials',
        ADD_NEW_ENTITY: 'Add New Material Inventory',
        METHOD: 'post',
        API_URL: 'inventory/materials/'
    }

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            await supplierFetch({
                url: 'suppliers/',
                method: 'get'
            });
            await materialFetch({
                url: 'materials/',
                method: 'get'
            });
        }
        getData();
    }, [])

    const config = {
        Labels,
        supplier,
        material,
        supplierLoad,
        materialLoad,
        setMaterial,
    }

    return (
        <>
            <AddFormPageHeader config={config} />
            {
                supplierLoad || materialLoad ?
                    (
                        <Spinner />
                    ) : (
                        supplierErr || materialErr ?
                            (
                                <NoServerResponse error={materialErr} />
                            ) : (
                                <MaterialInventoryForm config={config} />
                            )
                    )
            }
        </>
    )
}
