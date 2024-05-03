import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from "../../modules/FspPanelModule/AddFormPageHeader";
import MaterialForm from '../../modules/RawMaterialModule/MaterialForm';

export default function AddRawMaterials() {
    const { loading: categoryLoad, response: category, error: categoryErr, axiosFetch: categoryFetch } = useAxiosFunction();
    const { loading: unitLoad, response: unit, error: unitErr, axiosFetch: unitFetch } = useAxiosFunction();
    const Labels = {
        PAGE_ENTITY: 'Materials',
        PAGE_ENTITY_URL: 'materials',
        ADD_NEW_ENTITY: 'Add New Material',
        METHOD: 'post',
        API_URL: `materials/`
    }

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            await categoryFetch({
                url: 'products/unitcategory',
                method: 'get'
            });
            await unitFetch({
                url: 'products/unit',
                method: 'get'
            });
        }
        getData();
    }, [])

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
            {
                unitLoad || categoryLoad ?
                    (
                        <Spinner />
                    ) : (
                        unitErr || categoryErr ?
                            (
                                <NoServerResponse error={unitErr} />
                            ) : (
                                <MaterialForm config={config} />
                            )
                    )
            }
        </div>
    )
}
