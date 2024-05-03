import { useEffect } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';
import NoServerResponse from '../../components/Errors/NoServerResponse';


import AddFormPageHeader from '../../modules/FspPanelModule/AddFormPageHeader';
import ProductForm from '../../modules/ProductsModule/ProductForm';
import FOrm from '../../modules/ProductsModule/FOrm';

export default function AddProduct() {
    const { loading: categoryLoad, response: category, error: categoryErr, axiosFetch: categoryFetch } = useAxiosFunction();
    const { loading: unitLoad, response: unit, error: unitErr, axiosFetch: unitFetch } = useAxiosFunction();
    const { loading: materialLoad, response: material, error: materialErr, axiosFetch: materialFetch } = useAxiosFunction();
    const Labels = {
        PAGE_ENTITY: 'Products',
        PAGE_ENTITY_URL: 'products',
        ADD_NEW_ENTITY: 'Add New Product',
        METHOD: 'post',
        API_URL: `products/`
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
        material,
        unitLoad,
        categoryLoad,
        materialLoad,
    }

    return (
        <>
            <AddFormPageHeader config={config} onBack />
            {
                unitLoad || categoryLoad || materialLoad ?
                    (
                        <Spinner />
                    ) : (
                        materialErr ?
                            (
                                <NoServerResponse error={materialErr} />
                            ) : (

                                // <FOrm config={config} />
                                <ProductForm config={config} />
                            )
                    )
            }
        </>
    )
}
