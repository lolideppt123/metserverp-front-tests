import useFetch from '../../hooks/useFetch';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import SalesForm from '../../modules/SalesModule/SalesForm';

export default function AddSales() {
    const API_BASE_URL = import.meta.env.VITE_API_BASE_URL
    const Labels = {
        PAGE_ENTITY: 'Sales',
        PAGE_ENTITY_URL: 'sales',
        ADD_NEW_ENTITY: 'Add New Sales',
    }

    const { data: customer, loading: customerLoad, error: customerErr } = useFetch('customer/');
    const { data: product, loading: productLoad, error: productErr } = useFetch('products/');

    const config = {
        Labels,
        customer,
        product,
        customerLoad,
        productLoad,
    }
    return (
        <>
            <AddFormPageHeader config={config} />
            <SalesForm config={config} />
        </>
    )
}
