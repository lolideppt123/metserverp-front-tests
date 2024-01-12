import React from 'react'

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import AddCompanyForm from '../../modules/FspPanelModule/AddCompanyForm';

export default function AddSupplier() {
    const Labels = {
        PAGE_ENTITY: 'Suppliers',
        PAGE_ENTITY_URL: 'suppliers',
        ADD_NEW_ENTITY: 'Add New Supplier',
    }
    const config = {
        Labels,
    }
    return (
        <>
            <AddFormPageHeader config={config} onBack />
            <AddCompanyForm config={config} />
        </>
    )
}
