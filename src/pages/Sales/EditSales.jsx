import { useParams } from 'react-router-dom';

import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import SalesEditForm from '../../modules/SalesModule/SalesEditForm';

// Redux
import { useGetSalesItemQuery } from '../../features/sales/salesApiSlice';

export default function EditSales() {
    const { id } = useParams();

    const Labels = {
        PAGE_ENTITY: 'Sales',
        PAGE_ENTITY_URL: 'sales',
        ADD_NEW_ENTITY: 'Edit Sales',
        METHOD: 'put',
        API_URL: `sales/transaction/${id}/edit`
    }

    // Redux
    const {data: {
        sale,
        customer,
        product,
        suppluer,
    } = {}, isLoading, isError, error} = useGetSalesItemQuery(id);

    console.log(sale);

    const config = {
        Labels,
        customer,
        product,
        sale,
        id,
        isLoading
    };

    return (
        <>
            <AddFormPageHeader config={config} />
            {
                isLoading ? (
                    <Spinner />
                ) : (
                    isError ? (
                        <NoServerResponse error={error} />
                    ) : (
                        <SalesEditForm config={config} />
                    )
                )
            }
        </>
    )
}
