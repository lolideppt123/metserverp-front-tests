import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import Spinner from '../../components/Fallback/Spinner';

import { FiPlus, FiX } from 'react-icons/fi';

export default function FOrm({ config }) {
    const { loading, response, success, error, axiosFetch } = useAxiosFunction();
    const {
        Labels,
        id = "",
        material = "",
        product = "",
        unit,
        category,
        materialLoad = false,
        productLoad = false,
        unitLoad,
        categoryLoad,
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

    const { fields, append, remove } = useFieldArray({
        name: 'materials',
        control,
        rules: {
            required: "Required at least 1 item"
        }
    })

    // choices you already picked
    const [chosenMaterials, setChosenMaterials] = useState([]);
    const [picked, setPicked] = useState([]);
    const [InvType, setInvType] = useState(false);

    useEffect(() => {
        if (product == null) {
            console.log("product does not exists");
        }
        else {
            if (Labels.METHOD === 'post') {
                console.log('Silence is golden');
            }
            if (Labels.METHOD === 'put') {
                if (!product.length > 0) {
                    console.log(product);
                    console.log(!product.length > 0);
                    [
                        { name: 'product_name', value: product.product_name },
                        { name: 'product_min_stock', value: product.product_min_stock },
                        { name: 'product_unit', value: product.product_unit_name },
                        { name: 'inventory_type', value: product.product_type },
                        { name: 'product_note', value: product.product_note },
                    ].forEach(({ name, value }) => setValue(name, value));
                }
                else {
                    console.log(product);
                    for (let i = 0; i < product.length; i++) {
                        append({ material: "", quantity: 0 });
                    }
                    setInvType(!InvType);
                    product.map((item, index) => {
                        [
                            { name: 'product_name', value: item.product },
                            { name: 'product_min_stock', value: parseFloat(item.product_min_stock) },
                            { name: 'product_unit', value: item.product_unit },
                            { name: 'product_note', value: item.product_note },
                            { name: 'inventory_type', value: 'MANUFACTURED' },
                            { name: `${Object.keys(item)[4]}s.${index}.${Object.keys(item)[4]}`, value: item.material },
                            { name: `${Object.keys(item)[4]}s.${index}.${Object.keys(item)[5]}`, value: parseFloat(item.quantity) }
                        ].forEach(({ name, value }) => setValue(name, value));

                    })
                }
            }
        }

    }, [product])

    const handleRemoveItem = (index) => {
        setChosenMaterials(prev => prev.filter((_, i) => i !== index))
        setPicked(prev => {
            return prev.filter(prevItem => prevItem !== item[index].material)
        })
    }

    const handleChangeItem = (e, index) => {
        setChosenMaterials(prev => [...prev, item[index]])
        setPicked(prev => [...prev, item[index].material])
    }

    const onSubmit = async (data) => {
        console.log(data)
        if (Labels.METHOD === 'post') {
            const configObj = {
                url: `${Labels.PAGE_ENTITY_URL}/`,
                method: 'post',
                data: data,
                formSetError: formSetError
            }
            axiosFetch(configObj);
        }
        if (Labels.METHOD === 'put') {
            const configObj = {
                url: `${Labels.PAGE_ENTITY_URL}/${id}`,
                method: `${Labels.METHOD}`,
                data: data,
                formSetError: formSetError
            }
            axiosFetch(configObj);
        }
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
                    <form id={`add${Labels.PAGE_ENTITY}Form`} onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group mb-2">
                                    <label htmlFor="product_name" className="text-md text-gray-500">Product Name</label>
                                    <input type="text" className={`form-control form-control-sm`} autoComplete='off'
                                        {
                                        ...register("product_name", {
                                            required: "Product Name is required",
                                            maxLength: { value: 100 }
                                        }
                                        )} />
                                    {errors.product_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.product_name.message}</p>)}
                                </div>
                                <div className="d-flex gap-3">
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="inventory_type" className="text-md text-gray-500">Inventory Type</label>
                                        <input type='text' className="form-control form-control-sm" autoComplete='off' id='inventory_type' readOnly {...register("inventory_type")} />
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="product_min_stock">Minimum Stock</label>
                                        <input type="number" className="form-control form-control-sm" id='product_min_stock' min={0} step="0.01" {...register("product_min_stock", { required: "Minimum Stock is required" })} />
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="product_unit">Unit</label>
                                        <select className="form-select form-select-sm" autoComplete='off' id='product_unit' {...register("product_unit", { required: "Product Unit is required" })}>
                                            {category?.map((item, index) => (
                                                <optgroup label={item.unit_category} key={index}>
                                                    {
                                                        unit?.map((unit, index) => {
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
                                        {/* {product.map((field, index) => (
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
                                        ))} */}
                                        {fields.map((field, index) => {
                                            return (
                                                <div key={field.id} className="d-flex gap-2">
                                                    <div className="flex-grow-1 mb-2">
                                                        <label>Material</label>
                                                        <select className='form-select form-select-sm' disabled={getValues(`materials.${index}.material`) == "" ? false : true}
                                                            {
                                                            ...register(`materials.${index}.material`, {
                                                                required: "Material is required",
                                                                onChange: (e) => handleChangeItem(e, index)
                                                            }
                                                            )}>
                                                            {!material?.length ? (
                                                                <option value="">Choose...</option>
                                                            ) : (
                                                                <>
                                                                    <option value="">Choose...</option>
                                                                    {material?.map((item, index) => (
                                                                        <option key={index} value={item.material_name} disabled={picked.includes(item.material_name)}>
                                                                            {item.material_name}
                                                                        </option>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div className="mb-2">
                                                        <label>Quantity</label>
                                                        <input type="number" className="form-control form-control-sm" step={0.0001}
                                                            {
                                                            ...register(`materials.${index}.quantity`, {
                                                                valueAsNumber: true,
                                                                min: 1,
                                                                required: "Quantity is required"
                                                            }
                                                            )} />
                                                    </div>
                                                    <div className="btn-group mb-2">
                                                        <a type='button' className='text-danger' onClick={() => {
                                                            handleRemoveItem(index)
                                                            remove(index)
                                                        }}>
                                                            <FiX style={{ height: '24px', width: '24px', margin: '23px 6px 3px 0' }} />
                                                        </a>
                                                    </div>
                                                </div>
                                            )
                                        })}
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
                        <button type='submit' className='btn btn-primary col-2' form={`add${Labels.PAGE_ENTITY}Form`} disabled={isSubmitting}><FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />Save</button>
                        <button type='button' onClick={() => history.back()} className='btn btn btn-outline-secondary'>Cancel</button>
                    </div>
                </>
            )}
        </div >
    )
}
