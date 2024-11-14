import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import DraftForm from '../../modules/SalesModule/DraftForm';
import { useGetDictionaryQuery } from '../../features/utils/dictionaryApiSlice';

export default function AddSales() {

    // Redux
    const {data: {
        customers: customer,
        materials,
        products: product,
        suppliers,
    } = {}, isError, error, isLoading, isSuccess} = useGetDictionaryQuery();

    const Labels = {
        PAGE_ENTITY: 'Sales',
        PAGE_ENTITY_URL: 'sales',
        ADD_NEW_ENTITY: 'Add New Sales',
        METHOD: 'post',
        API_URL: 'sales/'
    }

    const config = {
        Labels,
        customer,
        product,
        isLoading
    }
    return (
        <>
            <AddFormPageHeader config={config} />
            {
                isLoading ? (
                    <Spinner />
                ) : (
                    isError && !isSuccess ? (
                        <NoServerResponse error={error} />
                    ) : (
                        <DraftForm config={config} />
                    )
                )
            }
        </>
    )
}
