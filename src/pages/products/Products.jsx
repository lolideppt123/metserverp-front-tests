import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import GetStartedTemplate from '../../components/Fallback/GetStartedTemplate';
import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';

import DropDown from '../../components/DropDown/DropDown';
import RenderText from '../../components/Tooltip/RenderText';
import { useGetAllProductQuery } from '../../features/products/productApiSlice';

export default function Products() {
    const { data, isLoading, isError, error, isSuccess, isFetching } = useGetAllProductQuery();
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
                            showConfig={{
                                disabled: true
                            }}
                            editConfig={{
                                editLink: `${record.id}`,
                                disabled: false
                            }}
                            deleteConfig={{
                                message: <RenderText text={record?.product_name} maxLength={15} />,
                                disabled: false,
                                component: 'products',
                                recordID: record.id,
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
                isLoading  || isFetching ?
                    (
                        <Spinner />
                    ) : (
                        isError && !isSuccess ?
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
