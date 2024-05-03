import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import GetStartedTemplate from '../../components/Fallback/GetStartedTemplate';

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import RawMaterialDataTable from '../../modules/RawMaterialModule/RawMaterialDataTable';
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';

import DropDown from '../../components/DropDown/DropDown';

export default function RawMaterials() {
    const Labels = {
        BASE_ENTITY: 'Materials',
        TABLE_TITLE: 'Material',
        ADD_NEW_ENTITY: 'Add New Material',
        NEW_ENTITY_URL: 'materials/add',
        API_URL: 'materials/'
    }

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
            render: (text, record) => {
                return (
                    <div className='px-auto'>
                        <DropDown
                            link2={`${record.id}`}
                            deleteConfig={{
                                link3: `${Labels?.API_URL}${record.id}`,
                                message: `${record?.material_name?.substr(0, 12)}${record?.material_name?.length > 12 ? '\u2026' : ""}`,
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
                                    <GetStartedTemplate
                                        entity={'Materials'}
                                        nextStep={'Inventory'}
                                        nextStepURL={'/inventory/materials'}
                                        nextStepOption={"Manufactured Products"}
                                        nextStepOptionURL={'/products'}
                                    />
                                ) : (
                                    // <RawMaterialDataTable config={config} />
                                    <CompanyDataTable config={config} />
                                )
                            )
                    )
            }

        </>

    )
}
