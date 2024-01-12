import { useEffect, useState } from 'react'
import axiosInstance from '../../helpers/axios';
import { useSnackbar } from 'notistack';

import { FiPlus, FiX } from 'react-icons/fi';
import { useForm, useFieldArray } from 'react-hook-form';

export default function ProductForm({ config }) {
    const { category, unit, material } = config;

    // choices existing in dropdown
    const [materialChoices, setMaterialChoices] = useState([...material])
    // choices you already picked
    const [chosenMaterials, setChosenMaterials] = useState()

    const { enqueueSnackbar } = useSnackbar();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        getValues,
        formState: { errors, isSubmitting },
        control,
        watch,
        setValue
    } = useForm({
        defaultValues: {
            materials: [{ material: "", quantity: 0 }],
            product_unit: "Piece"
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: 'materials',
        control,
        rules: {
            required: "Required atleast 1 item"
        }
    })

    const getUnit = watch("product_unit");
    const [inv_type, setType] = useState(false);

    const testFunc = (e, index) => {
        // const chosen_materials = chosenMaterials
        // chosen_materials.push(e.target.value)
        // const remainingMaterials = material.filter(i => !chosen_materials.includes(i.material_name))
        // setMaterialChoices([...remainingMaterials])
        // setChosenMaterials([...chosen_materials])
        // setValue(`materials.${index}`, e.target.value)
        // console.log(getValues(`materials.0`), "what is value")
        // console.log(e.target.value)
        // console.log(chosen_materials)
        // console.log(remainingMaterials)
        // console.log(e.target.name)
        let my_name = e.target.name;
        let my_value = e.target.value;
        setChosenMaterials(() => ({ [my_name]: my_value }))
        console.log(chosenMaterials)
        // const my_items = Object.values(chosenMaterials);
        // const remainingMaterials = material.filter(i => !my_items.includes(i.material_name));
        // setMaterialChoices([...remainingMaterials])
    }

    useEffect(() => {
        // Rerenders when product_unit changes
        // console.log(inv_type)
    }, [getUnit, inv_type])

    useEffect(() => {
        setMaterialChoices([...material])
    }, [material])

    const onSubmit = async (data) => {
        // await new Promise((resolve) => setTimeout(resolve, 1000))
        console.log(data)
        axiosInstance
            .post('products/', data, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                console.log(response)
                enqueueSnackbar(response.data.message, { variant: 'success' });
                reset()
                history.back()
            }).catch((err) => {
                console.log(err)
                setError(`${err.response.data.label}`, {
                    type: "manual",
                    message: `${err.response.data.message}`
                })
            })
    }

    const [maxQuantity, setMaxQuantity] = useState();
    const getMaterialQuantity = (material) => {

    }

    return (
        <div className="container">
            <form id='addProductForm' onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group mb-2">
                            <label htmlFor="product_name" className="text-md text-gray-500">Product Name</label>
                            <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='product_name' {...register("product_name", { required: "Product Name is required", maxLength: { value: 100 } })} />
                            {errors.product_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.product_name.message}</p>)}
                        </div>
                        <div className="d-flex gap-3">
                            <div className="flex-fill mb-2">
                                <label htmlFor="supplier" className="text-md text-gray-500">Inventory Type</label>
                                <select className="form-select form-select-sm" autoComplete='off' id='inventory_type'
                                    {
                                    ...register("inventory_type", {
                                        required: "Inventory Type is required",
                                        onChange: () => setType(prevType => !prevType)
                                    }
                                    )}>
                                    {/* <option value="">Choose...</option> */}
                                    <option value={"IMPORTED"}>IMPORTED</option>
                                    <option value={"MANUFACTURED"}>MANUFACTURED</option>
                                </select>
                                {errors.inventory_type && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.inventory_type.message}</p>)}
                            </div>
                            <div className="flex-fill mb-2">
                                <label htmlFor="product_min_stock">Minimum Stock</label>
                                <input type="number" className="form-control form-control-sm" id='product_min_stock' min={0} step="0.01" {...register("product_min_stock", { required: "Minimum Stock is required" })} />
                                {errors.product_min_stock && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.product_min_stock.message}</p>)}
                            </div>
                            <div className="flex-fill mb-2">
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
                                {errors.product_unit && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.product_unit.message}</p>)}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="product_note">Note</label>
                            <textarea className="form-control form-control-sm" rows="3" cols="50" style={{ resize: 'none' }} id='product_note' {...register("product_note", { maxLength: 200 })}></textarea>
                        </div>
                    </div>
                    <div className="col-md-6 border-start">
                        {inv_type &&
                            <>
                                <div className="form-group" style={{ display: "flex", flexDirection: 'row', justifyContent: "center" }}>
                                    <span style={{ fontWeight: '600' }}>Materials Used per {getValues('product_unit')}</span>
                                </div>
                                {fields.map((field, index) => {
                                    return (
                                        <div key={field.id} className="d-flex gap-2">
                                            <div className="flex-grow-1 mb-2">
                                                <label>Material</label>
                                                <select className='form-select form-select-sm'
                                                    {
                                                    ...register(`materials.${index}`, {
                                                        required: "Material is required",
                                                        onChange: (e) => testFunc(e, index)
                                                    }
                                                    )}>
                                                    <option value="">Choose...</option>
                                                    {material.map((item, index) => (
                                                        // <option key={index} value={item.material_name} disabled={
                                                        //     chosenMaterials.includes(item.material_name)
                                                        // }>{item.material_name}</option>
                                                        <option key={index} value={item.material_name}>{item.material_name}</option>
                                                    ))}
                                                </select>
                                                {/* {`${errors.material}_${index}` && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{`${errors.material}_${index}`}</p>)} */}
                                            </div>
                                            <div className="mb-2">
                                                <label>Quantity</label>
                                                <input type="number" className="form-control form-control-sm" step={0.0001}
                                                    {
                                                    ...register(`quantity.${index}`, {
                                                        valueAsNumber: true,
                                                    }
                                                    )} />
                                            </div>
                                            <div className="btn-group mb-2">
                                                <a type='button' className='text-danger' onClick={() => remove(index)}>
                                                    <FiX style={{ height: '24px', width: '24px', margin: '23px 6px 3px 0' }} />
                                                </a>
                                            </div>
                                        </div>
                                    )
                                })}
                                <p>{errors.materials?.root?.message}</p>
                                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-2 border-top">
                                    <button className='btn btn-primary' type='button'
                                        onClick={() => {
                                            append({
                                                materials: "",
                                                quantity: 0
                                            })
                                        }}>
                                        <FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />Add Item</button>
                                </div>
                            </>

                        }
                    </div>
                </div>
            </form>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                <button className='btn btn-primary col-2' form='addProductForm' disabled={isSubmitting}><FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />Save</button>
                <button className='btn btn btn-outline-secondary'>Cancel</button>
            </div>
        </div >

    )
}
