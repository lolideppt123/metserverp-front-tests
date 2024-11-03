import { useEffect } from 'react';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import GetStartedTemplate from '../../components/Fallback/GetStartedTemplate';

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';
import useAxiosFunction from '../../hooks/useAxiosFunction';

import DropDown from '../../components/DropDown/DropDown';
import { useGetAllSupplierQuery } from '../../features/suppliers/supplierApiSlice';
import RenderText from '../../components/Tooltip/RenderText';

export default function Supplier() {
    // const { loading, response: data, setResponse: setData, error, axiosFetch: dataFetch } = useAxiosFunction();
    const { data, isLoading, isError, error } = useGetAllSupplierQuery();
    const Labels = {
        BASE_ENTITY: 'Suppliers',
        TABLE_TITLE: 'Supplier',
        ADD_NEW_ENTITY: 'Add New Supplier',
        NEW_ENTITY_URL: 'suppliers/add',
        API_URL: 'suppliers/'
    }
    const dataTableColumn = [
        {
            title: <div className='fs-md fw-bold'>Company Name</div>,
            key: 'companyName',
            dataIndex: 'company_name',
            width: 350,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold`}>{<RenderText text={text} maxLength={40} />}</div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Contact Person</div>,
            key: 'contactPerson',
            dataIndex: 'contact_person',
            render: (text, record) => {
                return (
                    <>
                        {record.contact_person !== "" ? (
                            <div className='fs-md fw-semibold text-uppercase'>{record.contact_person}</div>
                        ) : (<div className="fs-md fw-semibold text-center">---</div>)}
                    </>

                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Contact Number</div>,
            key: 'contactNumber',
            dataIndex: 'contact_number',
            render: (text, record) => {
                return (
                    <>
                        {record.contact_number !== "" ? (
                            <div className='fs-md fw-semibold text-uppercase text-wrap'>{record.contact_number}</div>
                        ) : (<div className="fs-md fw-semibold text-center">---</div>)}
                    </>

                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>Company Address</div>,
            key: 'companyAddress',
            dataIndex: 'company_address',
            width: 200,
            render: (text, record) => {
                return (
                    <>
                        {record.company_address !== "" ? (
                            <div className='fs-md fw-semibold text-uppercase'>
                                {<RenderText text={text} maxLength={20} />}
                            </div>
                        ) : (<div className="fs-md fw-semibold text-center">---</div>)}
                    </>

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
                                    <GetStartedTemplate entity={'Suppliers'} optionalStatement={true} />
                                ) : (
                                    <CompanyDataTable config={config} />
                                )
                            )
                    )
            }
        </>
    )
}
