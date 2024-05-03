import useFetch from '../../hooks/useFetch';
import { useParams } from 'react-router-dom';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';

import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';

import ProductEditForm from '../../modules/ProductsModule/ProductEditForm';
import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import FOrm from '../../modules/ProductsModule/FOrm';

export default function EditProduct() {
    const { id } = useParams();
    const { loading: categoryLoad, response: category, error: categoryErr, axiosFetch: categoryFetch } = useAxiosFunction();
    const { loading: unitLoad, response: unit, error: unitErr, axiosFetch: unitFetch } = useAxiosFunction();
    const { loading: productLoad, response: product, error: productErr, axiosFetch: productFetch } = useAxiosFunction();
    const { loading: materialLoad, response: material, error: materialErr, axiosFetch: materialFetch } = useAxiosFunction();
    const Labels = {
        PAGE_ENTITY: 'Products',
        PAGE_ENTITY_URL: 'products',
        ADD_NEW_ENTITY: 'Edit Product',
        METHOD: 'put'
    }

    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            await categoryFetch({
                url: 'products/unitcategory',
                method: 'get'
            });
            await unitFetch({
                url: 'products/unit',
                method: 'get'
            });
            await productFetch({
                url: `products/${id}`,
                method: 'get'
            });
            await materialFetch({
                url: 'materials/',
                method: 'get'
            });
        }
        getData();
    }, [])

    const config = {
        Labels,
        unit,
        category,
        product,
        material,
        id,
        categoryLoad,
        unitLoad,
        productLoad,
        materialLoad,
    }

    return (

        <>
            <AddFormPageHeader config={config} onBack />
            {
                categoryLoad || unitLoad || productLoad ?
                    (
                        <Spinner />
                    ) : (
                        categoryErr || unitErr || productErr || materialErr ?
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
