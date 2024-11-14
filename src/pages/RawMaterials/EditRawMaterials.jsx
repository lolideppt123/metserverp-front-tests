import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from "../../modules/FspPanelModule/AddFormPageHeader"
import MaterialForm from '../../modules/RawMaterialModule/MaterialForm';
import { useGetDictionaryQuery } from '../../features/utils/dictionaryApiSlice';
import { useGetMaterialQuery } from '../../features/materials/materialApiSlice';

export default function EditRawMaterials() {

    const { id } = useParams();
    const Labels = {
        PAGE_ENTITY: 'Materials',
        PAGE_ENTITY_URL: 'materials',
        ADD_NEW_ENTITY: 'Edit Material',
        METHOD: 'put',
        API_URL: `materials/${id}`
    }

    const {data: {
        categories: category,
        units: unit,
    } = {}} = useGetDictionaryQuery();

    const {data: material, isLoading, isError, isSuccess, isFetching, error} = useGetMaterialQuery(id);

    const config = {
        id,
        Labels,
        material,
        unit,
        category,
        isLoading
    }

    return (
        <>
            <AddFormPageHeader config={config} onBack />
            {
                isLoading || isFetching ?
                    (
                        <Spinner />
                    ) : (
                        isError && !isSuccess ?
                            (
                                <NoServerResponse error={error} />
                            ) : (
                                <MaterialForm config={config} />
                            )
                    )
            }
        </>
    )
}
