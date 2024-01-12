import useFetch from '../../hooks/useFetch';

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';

export default function Customer() {
    const Labels = {
        BASE_ENTITY: 'Customers',
        TABLE_TITLE: 'Customer',
        ADD_NEW_ENTITY: 'Add New Customer',
        NEW_ENTITY_URL: 'customers/add',
    }

    const dataTableColumn = [
        {
            title: 'Company Name',
            key: 'companyName'
        },
        {
            title: 'Contact Person',
            key: 'contactPerson'
        },
        {
            title: 'Contact Number',
            key: 'contactNumber'
        },
        {
            title: 'Company Address',
            key: 'companyAddress'
        }
    ]
    const { data, loading, error } = useFetch('customer/');
    const config = {
        dataTableColumn,
        Labels,
        data,
        loading,
        error
    }

    return (
        <>
            <DataTablePageHeader Labels={Labels} />
            <CompanyDataTable config={config} />
        </>

    )
}
