import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import GetStartedTemplate from '../../components/Fallback/GetStartedTemplate';

import ProductsDataTable from '../../modules/ProductsModule/ProductsDataTable';
import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';

import DropDown from '../../components/DropDown/DropDown';

export default function Products() {
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
                return <div className={`fs-md fw-semibold`}>{text}</div>
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
            render: (text, record) => {
                return (
                    <>
                        {record.product_note !== "" && <div className={`fs-md fw-semibold text-wrap`}>{text.substr(0, 50) + '\u2026'}</div>}
                    </>
                )
            }
        },
        {
            title: '',
            key: 'action',
            dataIndex: ['id', 'type'],
            width: 50,
            render: (text, record) => {
                return (
                    <div className='px-auto'>
                        <DropDown
                            link2={`${record.id}`}
                            deleteConfig={{
                                link3: `${Labels?.API_URL}${record.id}`,
                                message: `${record?.product_name?.substr(0, 12)}${record?.product_name?.length > 12 ? '\u2026' : ""}`,
                                notAllowed: false,
                                api_url: Labels.API_URL,
                                setData: (data) => setData(data)
                            }}
                        />
                    </div>
                )
            }
        },
    ]
    const { loading, response: data, setResponse: setData, error, axiosFetch: dataFetch } = useAxiosFunction();
    useEffect(() => {
        const configObj = {
            url: `${Labels.API_URL}`,
            method: `get`,
        }
        dataFetch(configObj);
    }, [])
    const config = {
        Labels,
        dataTableColumn,
        data,
        loading,
        error,
        setData
    }

    return (
        <>
            <DataTablePageHeader Labels={Labels} />
            {
                loading ?
                    (
                        <Spinner />
                    ) : (
                        error ?
                            (
                                <NoServerResponse error={error} />
                            ) : (
                                data?.length == 0 ? (
                                    <GetStartedTemplate entity={'Products'} nextStep={"Inventory"} />
                                ) : (
                                    // <ProductsDataTable config={config} />
                                    <CompanyDataTable config={config} />
                                )
                            )
                    )
            }
        </>
    )
}
