import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from "../../modules/FspPanelModule/AddFormPageHeader"
import MaterialForm from '../../modules/RawMaterialModule/MaterialForm';

export default function EditRawMaterials() {
    const { loading: categoryLoad, response: category, error: categoryErr, axiosFetch: categoryFetch } = useAxiosFunction();
    const { loading: unitLoad, response: unit, error: unitErr, axiosFetch: unitFetch } = useAxiosFunction();
    const { loading: materialLoad, response: material, error: materialErr, axiosFetch: materialFetch } = useAxiosFunction();
    const { id } = useParams();
    const Labels = {
        PAGE_ENTITY: 'Materials',
        PAGE_ENTITY_URL: 'materials',
        ADD_NEW_ENTITY: 'Edit Material',
        METHOD: 'put',
        API_URL: `materials/${id}`
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
            await materialFetch({
                url: `materials/${id}`,
                method: 'get'
            });
        }
        getData();
    }, [])

    const config = {
        id,
        Labels,
        material,
        unit,
        category,
        materialLoad,
        unitLoad,
        categoryLoad,
        materialErr,
        unitErr,
        categoryErr,
    }

    return (
        <>
            <AddFormPageHeader config={config} onBack />
            {
                unitLoad || categoryLoad || materialLoad ?
                    (
                        <Spinner />
                    ) : (
                        unitErr || categoryErr || materialErr ?
                            (
                                <NoServerResponse error={materialErr} />
                            ) : (
                                <MaterialForm config={config} />
                            )
                    )
            }
        </>
    )
}
