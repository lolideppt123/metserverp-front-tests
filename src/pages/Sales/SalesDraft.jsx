import { useState, useEffect } from "react";

import { useGetAllSalesYearQuery, useGetSalesFilteredDraftQuery } from "../../features/sales/salesApiSlice";

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import dayjs from "dayjs";

// Components
import Spinner from "../../components/Fallback/Spinner";
import SalesTable from "./SalesTable";


const SalesDraft = () => {
    const currentYear = dayjs().year();
    const currentMonth = dayjs().month() + 1;
    const initialDateFilter = `${currentYear}-${currentMonth}`;

    const [filters, setFilters] = useState({
        customer: null,
        productName: null,
        salesInvoice: null,
        dateFilter: initialDateFilter
    });

    // Grabs initial data only once
    const { data, isLoading, isError, isSuccess } = useGetSalesFilteredDraftQuery(filters);

    useEffect(() => {
        console.log('Current Filters:', filters);
    }, [filters]);

    return (
        <>
            <DataTablePageHeader
                Labels={{
                    BASE_ENTITY: "Sales",
                    TABLE_TITLE: "Sales",
                    ADD_NEW_ENTITY: "Add New Sales",
                    NEW_ENTITY_URL: "sales/add",
                    API_URL: "sales/",
                }}
                salesFilter={filters.dateFilter}
                setSalesFilter={setFilters}
                type={"sales"}
            />
            {isLoading ? (
                <Spinner />
            ) : (
                isError ? (
                    <div>Error loading sales data.</div>
                ) : (
                    <SalesTable
                        salesData={data}
                        filters={filters}
                        setFilters={setFilters}
                    />
                )
            )}
        </>
    )
}

export default SalesDraft