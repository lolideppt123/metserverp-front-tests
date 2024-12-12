import React from 'react'
import { useParams } from 'react-router-dom'
import { useGetSalesOrderItemQuery } from '../../features/sales/salesOrderApiSlice';
import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import SalesOrderEditForm from '../../modules/SalesModule/SalesOrderEditForm';

function SalesOrderEdit() {
    const {id} = useParams();

    const Labels = {
        PAGE_ENTITY: 'Sales Order',
        PAGE_ENTITY_URL: 'sales order',
        ADD_NEW_ENTITY: 'Edit Sales Order',
    }

    // Redux
    const { data, isLoading, isError, error, isFetching, isSuccess } = useGetSalesOrderItemQuery(id);

    console.log(data);

    const config = {
        Labels,
        data,
        isLoading,
        id
    }

  return (
    <>
        <AddFormPageHeader config={config} />
        {
            isLoading || isFetching ? (
                <Spinner />
            ) : (
                isError && !isSuccess ? (
                    <NoServerResponse error={error} />
                ) : (
                    <SalesOrderEditForm config={config} />
                )
            )
        }
    </>
  )
}

export default SalesOrderEdit