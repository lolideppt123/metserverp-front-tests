import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import GetStartedTemplate from '../../components/Fallback/GetStartedTemplate';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import CompanyDataTable from '../../modules/FspPanelModule/CompanyDataTable';
import { useEffect } from 'react';

import DropDown from '../../components/DropDown/DropDown';

// redux trial
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, selectToken } from '../../features/auth/authSlice';

import { useGetAllCustomerQuery } from '../../features/customers/customerApiSlice';

export default function Customer() {
    // const USER = useSelector(selectUser);
    // const TOKEN = useSelector(selectToken);
    // const { data, isLoading, isError } = useGetAllCustomerQuery();
    // console.log(useGetAllCustomerQuery())

    const Labels = {
        BASE_ENTITY: 'Customers',
        TABLE_TITLE: 'Customer',
        ADD_NEW_ENTITY: 'Add New Customer',
        NEW_ENTITY_URL: 'customers/add',
        API_URL: 'customers/'
    }

    const dataTableColumn = [
        {
            title: <div className='fs-md fw-bold'>Company Name</div>,
            key: 'companyName',
            dataIndex: 'company_name',
            width: 350,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold`}>{text}</div>
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
                                {record.company_address.substr(0, 60)}{record.company_address.length > 60 && '\u2026'}
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
            render: (text, record) => {
                return (
                    <div className='px-auto'>
                        <DropDown
                            link2={`${record.id}`}
                            deleteConfig={{
                                link3: `${Labels?.API_URL}${record.id}`,
                                message: `${record?.company_name?.substr(0, 12)}${record?.company_name?.length > 12 ? '\u2026' : ""}`,
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
    const { loading: isLoading, response: data, setResponse: setData, error: isError, axiosFetch: dataFetch } = useAxiosFunction();
    useEffect(() => {
        const configObj = {
            url: `${Labels.API_URL}`,
            method: `get`,
        }
        dataFetch(configObj);
    }, [])
    const config = {
        dataTableColumn,
        Labels,
        data,
        isLoading,
        isError,
        // setData
    }

    // console.log(data)

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
                                <NoServerResponse error={isError} />
                            ) : (
                                data?.length == 0 ? (
                                    <GetStartedTemplate entity={'Customers'} optionalStatement={true} />
                                ) : (
                                    <CompanyDataTable config={config} />
                                )
                            )
                    )
            }
        </>
    )
}
