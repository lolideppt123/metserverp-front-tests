import useFetch from '../../hooks/useFetch';

import DataTablePageHeader from '../../modules/FspPanelModule/DataTablePageHeader';
import RawMaterialDataTable from '../../modules/RawMaterialModule/RawMaterialDataTable';

export default function RawMaterials() {
    const Labels = {
        BASE_ENTITY: 'Materials',
        TABLE_TITLE: 'Material',
        ADD_NEW_ENTITY: 'Add New Material',
        NEW_ENTITY_URL: 'materials/add',
    }

    const dataTableColumn = [
        {
            title: 'Material Name',
            key: 'material'
        },
        {
            title: 'Minimum Stock',
            key: 'minimumStock'
        },
        {
            title: 'Unit',
            key: 'unit'
        },
        {
            title: 'Note',
            key: 'note'
        },
        // {
        //     title: '',
        //     key: 'action'
        // }
    ]

    // const [data, setData] = useState([]);

    // useEffect(() => {
    //     axiosInstance
    //         .get('materials/')
    //         .then((response) => {
    //             console.log(response.data)
    //             setData(response.data)
    //         })
    //         .catch((err) => {
    //             console.log(err)
    //         })
    // }, [])
    const { data, loading, error } = useFetch('materials/');
    const config = {
        dataTableColumn,
        data,
        loading,
        error,
    }

    return (
        <>
            <DataTablePageHeader Labels={Labels} />
            <RawMaterialDataTable config={config} />
        </>

    )
}
