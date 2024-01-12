import useFetch from '../../hooks/useFetch';

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';

export default function Supplier() {
    const Labels = {
        BASE_ENTITY: 'Suppliers',
        TABLE_TITLE: 'Supplier',
        ADD_NEW_ENTITY: 'Add New Supplier',
        NEW_ENTITY_URL: 'suppliers/add',
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
    const { data, loading, error } = useFetch('supplier/');
    const config = {
        dataTableColumn,
        Labels,
        data,
        loading,
        error,
    }
    return (
        <>
            <DataTablePageHeader Labels={Labels} />
            <CompanyDataTable config={config} />
        </>

    )
}
