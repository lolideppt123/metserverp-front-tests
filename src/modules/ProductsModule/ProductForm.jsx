import { useEffect, useState } from 'react'
import { Spin, Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { FiPlus, FiX } from 'react-icons/fi';
import { useForm, useFieldArray } from 'react-hook-form';


export default function ProductForm({ config }) {
    const { loading, response, success, error, axiosFetch } = useAxiosFunction();
    const {
        Labels,
        category,
        unit,
        material,
        unitLoad,
        categoryLoad,
        materialLoad,
    } = config;

    // choices you already picked
    const [picked, setPicked] = useState([])
    const [inv_type, setType] = useState(false);
    const [FormLoading, setFormLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setError: formSetError,
        clearErrors: formClearError,
        getValues,
        setValue,
        formState: { errors, isSubmitting, isDirty },
        control,
        watch,
    } = useForm({
        defaultValues: {
            product_name: "",
            product_min_stock: 0,
            materials: [{ material: '', quantity: 0, unit: '' }],
            product_unit: "Piece"
        }
    });

    const { fields, append, remove } = useFieldArray({
        name: 'materials',
        control,
        rules: {
            required: "Required at least 1 item"
        }
    })

    const handleRemoveItem = (index) => {
        setPicked(prev => {
            return prev.filter(prevItem => prevItem !== item[index].material)
        })
    }

    const handleChangeItem = (e, index) => {
        setPicked(prev => [...prev, item[index].material]);
        material.map((item) => {
            item.material_name == getValues(`materials.${index}.material`) && setValue(`materials.${index}.unit`, item.material_unit_abbv)
        })
    }

    const onSubmit = async (data) => {
        setFormLoading(true);
        const configObj = {
            url: `${Labels.API_URL}`,
            method: `${Labels.METHOD}`,
            data: data,
            formSetError: formSetError
        }
        setTimeout(async () => {
            axiosFetch(configObj);
            // setFormLoading(false);
        }, 1500);
    }

    useEffect(() => {
        if (success) {
            setFormLoading(false);
            reset();
            formClearError();
            history.back();
        }
    }, [success])

    const item = watch('materials') // Needed
    const getUnit = watch("product_unit"); //Needed

    return (
        <div className="container">
            {unitLoad || categoryLoad || materialLoad ? (
                <div className="py-5">
                    <Flex vertical>
                        <Spin />
                    </Flex>
                </div>
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
                                <div className="d-flex gap-3">
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="supplier" className="text-md text-gray-500">Inventory Type</label>
                                        <select className="form-select form-select-sm" autoComplete='off' id='inventory_type'
                                            {
                                            ...register("inventory_type", {
                                                required: "Inventory Type is required",
                                                onChange: (e) => setType(e.target.value)
                                            }
                                            )}>
                                            <option value={"IMPORTED"}>IMPORTED</option>
                                            <option value={"MANUFACTURED"}>MANUFACTURED</option>
                                            <option value={"LOCAL_PURCHASE"}>LOCAL PURCHASE</option>
                                        </select>
                                        {errors.inventory_type && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.inventory_type.message}</p>)}
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="product_min_stock">Minimum Stock</label>
                                        <input type="number" className="form-control form-control-sm" id='product_min_stock' min={1} step="0.01" {
                                            ...register("product_min_stock",
                                                {
                                                    required: "Minimum Stock is required",
                                                    min: 1,
                                                    valueAsNumber: true
                                                }
                                            )} />
                                        {errors.product_min_stock && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.product_min_stock.message}</p>)}
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
                                        {errors.product_unit && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.product_unit.message}</p>)}
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="product_note">Note</label>
                                    <textarea className="form-control form-control-sm" rows="3" cols="50" style={{ resize: 'none' }} id='product_note' {...register("product_note", { maxLength: 200 })}></textarea>
                                </div>
                            </div>
                            <div className="col-md-6 border-start">
                                {inv_type == 'MANUFACTURED' &&
                                    <>
                                        <div className="form-group" style={{ display: "flex", flexDirection: 'row', justifyContent: "center" }}>
                                            <span style={{ fontWeight: '600' }}>Materials Used per {getValues('product_unit')}</span>
                                        </div>
                                        {fields.map((field, index) => {
                                            return (
                                                <div key={field.id} className="d-flex gap-2">
                                                    <div className="col-lg-6 mb-2">
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
                                                                    {material.map((item, index) => (
                                                                        <option key={index} value={item.material_name} disabled={picked.includes(item.material_name)}>
                                                                            {item.material_name}
                                                                        </option>
                                                                    ))}
                                                                </>
                                                            )}
                                                        </select>
                                                    </div>
                                                    <div className="col-lg-3 mb-2">
                                                        <label>Quantity</label>
                                                        <input type="number" className="form-control form-control-sm" step={0.0001} min={0.0001}
                                                            {
                                                            ...register(`materials.${index}.quantity`, {
                                                                valueAsNumber: true,
                                                                min: 0.0001,
                                                                required: "Quantity is required"
                                                            }
                                                            )} />
                                                    </div>
                                                    <div className="mb-2">
                                                        <label>Unit</label>
                                                        <input type="text" className="form-control form-control-sm" disabled={true}
                                                            {
                                                            ...register(`materials.${index}.unit`)
                                                            } />
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
                                        <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-2 mt-2 border-top">
                                            <button className='btn btn-primary' type='button'
                                                onClick={() => {
                                                    append({
                                                        material: "",
                                                        quantity: 0,
                                                        unit: ''
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
                        <button className='btn btn-primary col-2' form='addProductForm' disabled={isSubmitting || !isDirty}>
                            {FormLoading ? (
                                <Spin
                                    indicator={
                                        <LoadingOutlined
                                            style={{
                                                fontSize: 18,
                                                color: 'white',
                                                margin: '0 8px 3px 0'
                                            }}
                                            spin
                                        />
                                    }
                                />
                            ) : (
                                <FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />
                            )}
                            Save
                        </button>
                        <button className='btn btn btn-outline-secondary'>Cancel</button>
                    </div>
                </>
            )}
        </div >

    )
}
