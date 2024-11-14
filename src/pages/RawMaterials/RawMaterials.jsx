import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import GetStartedTemplate from '../../components/Fallback/GetStartedTemplate';

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';

import DropDown from '../../components/DropDown/DropDown';
import { useGetAllMaterialQuery } from '../../features/materials/materialApiSlice';

export default function RawMaterials() {
    const Labels = {
        BASE_ENTITY: 'Materials',
        TABLE_TITLE: 'Material',
        ADD_NEW_ENTITY: 'Add New Material',
        NEW_ENTITY_URL: 'materials/add',
        API_URL: 'materials/'
    }

    const {data, isLoading, isError, error, isSuccess, isFetching} = useGetAllMaterialQuery();

    const dataTableColumn = [
        {
            title: <div className='fs-md fw-bold'>Material Name</div>,
            key: 'materialName',
            dataIndex: 'material_name',
            // width: 250,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold`}>{text}</div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Minimum Stock</div>,
            key: 'minimumStock',
            dataIndex: 'material_min_stock',
            width: 150,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-center`}>{record.material_min_stock} {record.material_unit_abbv}</div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Unit</div>,
            key: 'unit',
            width: 125,
            dataIndex: 'material_unit_name',
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-center`}>{text}</div>
            }
        },
        {
            title: <div className='fs-md fw-bold'>Note</div>,
            key: 'note',
            dataIndex: "material_note",
            width: 250,
            render: (text, record) => {
                return (
                    <div className='fs-md fw-semibold text-truncate'>
                        {record.material_note !== "" && <div className={`fs-md fw-semibold text-wrap`}>{text.substr(0, 60)}{text.length > 60 && '\u2026'}</div>}

                    </div>
                )
            }
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
                                disabled: false,
                                component: 'raw-materials',
                                recordID: record.id,
                                message: `${record?.material_name?.substr(0, 12)}${record?.material_name?.length > 12 ? '\u2026' : ""}`,
                            }}
                        />
                    </div>
                )
            }
        },
    ];

    const config = {
        Labels,
        dataTableColumn,
        data,
        isLoading,
    }

    return (
        <>
            <DataTablePageHeader Labels={Labels} />
            {
                isLoading || isFetching ?
                    (
                        <Spinner />
                    ) : (
                        isError && !isSuccess ?
                            (
                                <NoServerResponse error={error} />
                            ) : (
                                data?.length == 0 ? (
                                    <GetStartedTemplate
                                        entity={'Materials'}
                                        nextStep={'Inventory'}
                                        nextStepURL={'/inventory/materials'}
                                        nextStepOption={"Manufactured Products"}
                                        nextStepOptionURL={'/products'}
                                    />
                                ) : (
                                    <CompanyDataTable config={config} />
                                )
                            )
                    )
            }

        </>

    )
}
