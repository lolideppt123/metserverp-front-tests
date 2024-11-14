import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';


import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import ProductForm from '../../modules/ProductsModule/ProductForm';
import { useGetDictionaryQuery } from '../../features/utils/dictionaryApiSlice';

export default function AddProduct() {

    const {data: {
        categories: category,
        units: unit,
        materials: material,
    } = {}, isError, error, isFetching, isLoading, isSuccess} = useGetDictionaryQuery();

    const Labels = {
        PAGE_ENTITY: 'Products',
        PAGE_ENTITY_URL: 'products',
        ADD_NEW_ENTITY: 'Add New Product',
        METHOD: 'post',
        API_URL: `products/`
    }

    const config = {
        Labels,
        unit,
        category,
        material,
        isLoading
    }

    return (
        <>
            <AddFormPageHeader config={config} onBack />
            {
                isLoading || isFetching ?
                    (
                        <Spinner />
                    ) : (
                        isError && !isSuccess ?
                            (
                                <NoServerResponse error={error} />
                            ) : (
                                <ProductForm config={config} />
                            )
                    )
            }
        </>
    )
}
