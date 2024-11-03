import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import GetStartedTemplate from '../../components/Fallback/GetStartedTemplate';

import ProductsDataTable from '../../modules/ProductsModule/ProductsDataTable';
import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';

import DropDown from '../../components/DropDown/DropDown';
import RenderText from '../../components/Tooltip/RenderText';
import { useGetAllProductQuery } from '../../features/products/productApiSlice';

export default function Products() {
    const { data, isLoading, isError, error } = useGetAllProductQuery();
    const Labels = {
        BASE_ENTITY: 'Products',
        TABLE_TITLE: 'Product',
        ADD_NEW_ENTITY: 'Add New Product',
        NEW_ENTITY_URL: 'products/add',
        API_URL: 'products/'

    }
    const dataTableColumn = [
        {
            title: <div className='fs-md fw-bold'>Product Name</div>,
            key: 'productName',
            dataIndex: 'product_name',
            // width: 250,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold`}>{<RenderText text={text} maxLength={20} />}</div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Minimum Stock</div>,
            key: 'minimumStock',
            dataIndex: 'product_min_stock',
            width: 150,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-center`}>{record.product_min_stock} {record.product_unit_abbv}</div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Unit</div>,
            key: 'unit',
            width: 125,
            dataIndex: 'product_unit_name',
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-center`}>{text}</div>
            }
        },
        {
            title: <div className='fs-md fw-bold'>Note</div>,
            key: 'note',
            dataIndex: "product_note",
            width: 250,
            render: (text, record) => (<div className={`fs-md fw-semibold`}>{<RenderText text={text} maxLength={30} />}</div>)
        },
        {
            title: '',
            key: 'action',
            dataIndex: ['id', 'type'],
            width: 50,
            fixed: 'right',
            render: (text, record) => {
                return (
                    <div className='px-auto'>
                        <DropDown
                            link2={`${record.id}`}
                            deleteConfig={{
                                link3: `${Labels?.API_URL}${record.id}`,
                                message: <RenderText text={record?.company_name} maxLength={15} />,
                                notAllowed: false,
                                api_url: Labels.API_URL,
                                setData: (data) => { }
                            }}
                        />
                    </div>
                )
            }
        },
    ]

    const config = {
        dataTableColumn,
        Labels,
        data,
        isLoading,
    }

    return (
        <>
            <DataTablePageHeader Labels={Labels} />
            {
                isLoading ?
                    (
                        <Spinner />
                    ) : (
                        isError ?
                            (
                                <NoServerResponse error={error} />
                            ) : (
                                data?.length == 0 ? (
                                    <GetStartedTemplate entity={'Products'} nextStep={"Inventory"} />
                                ) : (
                                    <CompanyDataTable config={config} />
                                )
                            )
                    )
            }
        </>
    )
}
