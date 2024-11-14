import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from "../../modules/FspPanelModule/AddFormPageHeader";
import MaterialForm from '../../modules/RawMaterialModule/MaterialForm';
import { useGetDictionaryQuery } from '../../features/utils/dictionaryApiSlice';

export default function AddRawMaterials() {

    const {data: {
        categories: category,
        units: unit
    } = {}, isLoading, isError, isSuccess, isFetching, error} = useGetDictionaryQuery();


    const Labels = {
        PAGE_ENTITY: 'Materials',
        PAGE_ENTITY_URL: 'materials',
        ADD_NEW_ENTITY: 'Add New Material',
        METHOD: 'post',
        API_URL: `materials/`
    }

    const config = {
        Labels,
        unit,
        category,
        isLoading
    }
    return (
        <div>
            <AddFormPageHeader config={config} />
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
        </div>
    )
}
