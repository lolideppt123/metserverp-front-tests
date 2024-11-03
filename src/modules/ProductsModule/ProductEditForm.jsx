import Spinner from '../../components/Fallback/Spinner';

import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';

export default function ProductEditForm({ config }) {
    const { loading, response, success, error, axiosFetch } = useAxiosFunction();
    const {
        unit,
        category,
        product,
        material,
        id,
        categoryLoad,
        unitLoad,
        productLoad,
        materialLoad,
    } = config;

    const {
        register,
        handleSubmit,
        reset,
        setError: formSetError,
        clearErrors: formClearError,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
        control,
    } = useForm();

    // Postponed for functionality
    // const { fields, append, remove } = useFieldArray({
    //     name: 'materials',
    //     control,
    //     rules: {
    //         required: "Required atleast 1 item"
    //     }
    // })

    const [InvType, setInvType] = useState(false);
    const [chosenMaterials, setChosenMaterials] = useState({})
    const [IsRemoved, setIsRemoved] = useState()

    useEffect(() => {
        if (product == null) {
            console.log("product does not exists");
        }
        else {
            if (!product.length > 0) {
                console.log(product);
                console.log(!product.length > 0);
                [
                    { name: 'product_name', value: product.product_name },
                    { name: 'product_min_stock', value: product.product_min_stock },
                    { name: 'product_unit', value: product.product_unit_name },
                    { name: 'inventory_type', value: 'IMPORTED' },
                    { name: 'product_note', value: product.product_note },
                ].forEach(({ name, value }) => setValue(name, value));
            }
            else {
                setInvType(!InvType);
                product.map((item, index) => {
                    [
                        { name: 'product_name', value: item.product },
                        { name: 'product_min_stock', value: parseFloat(item.product_min_stock) },
                        { name: 'product_unit', value: item.product_unit },
                        { name: 'product_note', value: item.product_note },
                        { name: 'inventory_type', value: 'MANUFACTURED' },
                        { name: `${Object.keys(item)[4]}s.${index}`, value: item.material },
                        { name: `${Object.keys(item)[5]}.${index}`, value: parseFloat(item.quantity) }
                    ].forEach(({ name, value }) => setValue(name, value));

                })
            }
        }

    }, [product])

    useEffect(() => {
        // Rerenders when product_unit changes
        // console.log(inv_type)
        setIsRemoved(Object.values(chosenMaterials))
    }, [chosenMaterials])

    const onSubmit = async (data) => {
        console.log(data);
        const configObj = {
            url: `products/${id}`,
            method: 'put',
            data: data,
            formSetError: formSetError
        }
        axiosFetch(configObj);
    }

    useEffect(() => {
        if (success) {
            reset();
            formClearError();
            history.back();
        }
    }, [success])

    return (
        <div className="container pt-3">
            {categoryLoad || unitLoad || productLoad || materialLoad ? (
                <Spinner />
            ) : (
                <>
                    <form id='addProductForm' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <label htmlFor="product_name" className="text-md text-gray-500">Product Name</label>
                                    <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='product_name' {...register("product_name", { required: "Product Name is required", maxLength: { value: 100 } })} />
                                    {errors.product_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.product_name.message}</p>)}
                                </div>
                                <div className="d-flex gap-3 multi-field-wrapper">
                                    <div className="flex-fill mb-2 multi-field-item">
                                        <label htmlFor="inventory_type" className="text-md text-gray-500">Inventory Type</label>
                                        <input type='text' className="form-control form-control-sm" autoComplete='off' id='inventory_type' readOnly {...register("inventory_type")} />
                                    </div>
                                    <div className="flex-fill mb-2 multi-field-item">
                                        <label htmlFor="product_min_stock">Minimum Stock</label>
                                        <input type="number" className="form-control form-control-sm" id='product_min_stock' min={1} step="0.01"
                                            {
                                            ...register("product_min_stock", {
                                                required: "Minimum Stock is required",
                                                min: 1,
                                                valueAsNumber: true
                                            })
                                            }
                                        />
                                    </div>
                                    <div className="flex-fill mb-2 multi-field-item">
                                        <label htmlFor="product_unit">Unit</label>
                                        <select className="form-select form-select-sm" autoComplete='off' id='product_unit' {...register("product_unit", { required: "Product Unit is required" })}>
                                            {category.map((item, index) => (
                                                <optgroup label={item.unit_category} key={index}>
                                                    {
                                                        unit.map((unit, index) => {
                                                            if (item.unit_category == unit.unit_category) {
                                                                return (
                                                                    <option value={unit.unit_name} key={index}>{unit.unit_name}</option>
                                                                )
                                                            }
                                                        })
                                                    }
                                                </optgroup>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className="form-group mb-2">
                                    <label htmlFor="product_note">Note</label>
                                    <textarea className="form-control form-control-sm" rows="3" cols="50" style={{ resize: 'none' }} id='product_note' {...register("product_note", { maxLength: 200 })}></textarea>
                                </div>
                            </div>
                            <div className="col-md-6 border-start">
                                {InvType &&
                                    <>
                                        <div className="form-group" style={{ display: "flex", flexDirection: 'row', justifyContent: "center" }}>
                                            <span style={{ fontWeight: '600' }}>Materials Used per {getValues('product_unit')}</span>
                                        </div>
                                        {product.map((field, index) => (
                                            <div key={index} className="d-flex gap-2">
                                                <div className="flex-grow-1 mb-2">
                                                    <label>Item #{index + 1}</label>
                                                    <input type="text" className="form-control form-control-sm"
                                                        {
                                                        ...register(`materials.${index}`, { required: "Quantity is required" })
                                                        } disabled />
                                                </div>
                                                <div className="mb-2">
                                                    <label>Quantity</label>
                                                    <input type="number" className="form-control form-control-sm" step={0.0001}
                                                        {
                                                        ...register(`quantity.${index}`, {
                                                            valueAsNumber: true,
                                                            required: "Quantity is required"
                                                        }
                                                        )} disabled />
                                                </div>
                                            </div>
                                        ))}
                                        <p>{errors.materials?.root?.message}</p>
                                        <div className="py-4">
                                            <p className="text-center px-3 mt-1 mb-1 text-muted fw-bold">Cannot change product formula. Best to create another product with the same name with diffrent version.</p>
                                            <h6 className="text-center px-3 mt-1 mb-1">e.g. <i>"{getValues('product_name')} v2"</i></h6>
                                        </div>
                                    </>
                                }
                            </div>
                        </div>
                    </form>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                        <button key={"formSubmitButton"} type='Submit' className='btn btn-primary col-2' form='addProductForm' disabled={isSubmitting}>Save Changes</button>
                        <button key={"formCancelButton"} type='button' onClick={() => history.back()} className='btn btn btn-outline-secondary'>Cancel</button>
                    </div>
                </>
            )}
        </div >
    )
}
