import { useParams } from 'react-router-dom';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import FOrm from '../../modules/ProductsModule/FOrm';
import { useGetAllMaterialQuery } from '../../features/materials/materialApiSlice';
import { useGetProductQuery, useUpdateProductMutation } from '../../features/products/productApiSlice';
import { useSelector } from 'react-redux';
import { selectDenomination } from '../../features/utils/denominationSlice';


export default function EditProduct() {
    const { id } = useParams();
    const { units: unit, category } = useSelector(selectDenomination);

    const { data: material, isLoading: materialLoad, isError: isMaterialErr, error: materialErr } = useGetAllMaterialQuery();
    const { data: product, isLoading: productLoad, isError: isProductErr, error: productErr } = useGetProductQuery(id);
    const [updateProduct, { data, error, isLoading, isSuccess }] = useUpdateProductMutation();

    const Labels = {
        PAGE_ENTITY: 'Products',
        PAGE_ENTITY_URL: 'products',
        ADD_NEW_ENTITY: 'Edit Product',
        METHOD: 'put'
    }

    const config = {
        Labels,
        id,
        material,
        product,
        unit,
        category,
        materialLoad,
        productLoad,
        action: updateProduct,
        actionLoading: isLoading,
        actionSuccess: isSuccess,
        actionError: error,
        actionResponse: data
    }

    return (

        <>
            <AddFormPageHeader config={config} onBack />
            {
                productLoad ?
                    (
                        <Spinner />
                    ) : (
                        productErr || materialErr ?
                            (
                                <NoServerResponse error={productErr} />
                            ) : (
                                // <ProductEditForm config={config} />
                                <FOrm config={config} />
                            )

                    )
            }
        </>


    )
}
