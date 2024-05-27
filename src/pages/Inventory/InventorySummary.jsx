import axiosInstance from "../../helpers/axios";
import { useEffect, useState } from "react";
import dayjs from 'dayjs';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';
import MoneyFormatter, { NumberFormatter } from "../../settings/MoneyFormatter";

import BarChartSummary from "../../components/Charts/BarChartSummary"
import SummaryPageHeader from "../../modules/SummaryModule/SummaryPageHeader";
import InventorySummaryDataTable from "../../modules/SummaryModule/InventorySummaryDataTable";

import useAxiosFunction from "../../hooks/useAxiosFunction";
import { Tooltip } from "antd";

const DATE_FORMAT = 'YYYY-MM-DD';
const today = dayjs().format(DATE_FORMAT)
const startDay = dayjs().startOf('y').format(DATE_FORMAT);

export default function InventorySummary() {
    const {
        loading,
        response,
        error,
        axiosFetch
    } = useAxiosFunction();

    const {
        loading: productLoading,
        response: product,
        error: productErr,
        axiosFetch: fetchProduct
    } = useAxiosFunction();

    const {
        loading: materialLoading,
        response: material,
        error: materialErr,
        axiosFetch: fetchMaterial
    } = useAxiosFunction();

    const Labels = {
        BASE_ENTITY: 'Inventory Summary',
        TABLE_TITLE: 'Inventory Summary',
        DATA_API: 'inventory/inventory-summary'
    }

    const [defaultDate, setDefaultDate] = useState([startDay, today]);
    const [errors, setError] = useState()
    const [InventoryFilter, setInventoryFilter] = useState('');

    const postData = {
        "filter": InventoryFilter,
        "start": defaultDate[0],
        "end": defaultDate[1],
    }

    const dataTableColumn = [
        {
            title: <div className='fs-md fw-bold text-center'>No.</div>,
            key: 'no',
            dataIndex: 'id',
            width: 65,
            render: (text, record, index) => <div className='fs-md fw-semibold text-center'>{index + 1}</div>
        },
        {
            title: <div className='fs-md fw-bold text-start'>Name</div>,
            key: 'name',
            dataIndex: 'name',
            width: 200,
            render: (text, record) => {
                return (
                    <div className={`fs-md fw-semibold text-uppercase`}>
                        {record?.name?.length > 17 ? (
                            <Tooltip className="pointer" title={record?.name}>
                                {record?.name?.substr(0, 17)}{record?.name?.length > 17 && '\u2026'}
                            </Tooltip>
                        ) : (
                            record?.name
                        )}
                    </div>
                )
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>T.Stock Left</div>,
            key: 'totalStockLeft',
            dataIndex: 'total_stock_left',
            width: 200,
            sorter: (a, b) => a.total_stock_left - b.total_stock_left,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-center`}><NumberFormatter amount={text} /></div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>T.Stock Cost</div>,
            key: 'totalStockCost',
            dataIndex: 'total_stock_cost',
            width: 200,
            sorter: (a, b) => a.total_stock_cost - b.total_stock_cost,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-end`}><MoneyFormatter amount={text} /></div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>T.Quantity Bought</div>,
            key: 'totalQuantityBought',
            dataIndex: 'total_quantity_bought',
            width: 200,
            sorter: (a, b) => a.total_quantity_bought - b.total_quantity_bought,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-center`}><NumberFormatter amount={text} /></div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'>T.Quantity Cost</div>,
            key: 'totalQuantityCost',
            dataIndex: 'total_quantity_cost',
            width: 200,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-end`}><MoneyFormatter amount={text} /></div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'><Tooltip className="pointer" title={'Cost Of Goods Sold'}>C.O.G.S.</Tooltip></div>,
            key: 'cogs',
            dataIndex: 'total_COGS',
            width: 200,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-end`}><MoneyFormatter amount={text} /></div>
            }
        },
        {
            title: <div className='fs-md fw-bold text-center'><Tooltip className="pointer" title={'Turn Over Ratio'}>T.O.R.</Tooltip></div>,
            key: 'tor',
            dataIndex: 'turn_over_ratio',
            sorter: (a, b) => a.turn_over_ratio - b.turn_over_ratio,
            render: (text, record) => {
                return <div className={`fs-md fw-semibold text-center`}><NumberFormatter amount={text} /></div>
            }
        },
    ]

    useEffect(() => {
        const getData = async () => {
            await axiosFetch({
                url: Labels.DATA_API,
                method: "POST",
                data: postData
            });
            if (!InventoryFilter) {
                await fetchProduct({
                    url: "products/",
                    method: "GET",
                });
                await fetchMaterial({
                    url: "materials/",
                    method: "GET",
                });
            }
        }
        getData();
    }, [defaultDate, InventoryFilter])


    const config = {
        dataTableColumn,
        dataTable: response,
        loading,
        defaultDate
    }

    console.log(response)

    return (
        <>
            <SummaryPageHeader
                defaultDate={defaultDate}
                Labels={Labels}
                setDate={setDefaultDate}
                optionPicker={!product || !material ? false : true}
                product={product}
                material={material}
                setOptionFilter={setInventoryFilter}
            />
            {
                loading ?
                    (
                        <Spinner />
                    ) : (
                        errors ?
                            (
                                <NoServerResponse error={errors} />
                            ) : (
                                // <BarChartSummary data={inventoryData} type={"inventory"} />
                                <InventorySummaryDataTable config={config} />
                            )
                    )
            }

        </>
    )
}
