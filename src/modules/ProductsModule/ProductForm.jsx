import { useEffect, useState } from 'react'
import { Spin, Flex } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import useAxiosFunction from '../../hooks/useAxiosFunction';
import { FiPlus, FiX } from 'react-icons/fi';
import { useForm, useFieldArray } from 'react-hook-form';
import Spinner from '../../components/Fallback/Spinner';
import { useAddProductMutation } from '../../features/products/productApiSlice';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';


export default function ProductForm({ config }) {
    const {
        Labels,
        category,
        unit,
        material,
        isLoading
    } = config;

    // Redux
    const [addProduct] = useAddProductMutation();
    const navigate = useNavigate();
    const {enqueueSnackbar} = useSnackbar();

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

        let message = "";
        let variant = "";

        try {
            const response = await addProduct(data).unwrap();
            message = response?.message;
            variant = "success";
        }
        catch (err) {
            console.log("Adding Product error :", err);
            message = err?.data?.message || err?.data?.detail || `${err?.status} Code: ${err?.originalStatus || "Call Master Joseph"}` || "An error occurred";
            variant = "error";
        }
        finally {
            setTimeout(() => {
                enqueueSnackbar(message, {variant: variant, autoHideDuration: 5000});
                setFormLoading(false);
                reset();
                navigate(-1);
            }, 1500);
        }

    }

    const item = watch('materials') // Needed
    const getUnit = watch("product_unit"); //Needed

    return (
        <div className="container-fluid addProduct-container">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <form id='addProductForm' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-6 addProduct-fields-wrapper">
                                <div className="form-group mb-2">
                                    <label htmlFor="product_name" className="text-md text-gray-500">Product Name</label>
                                    <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='product_name' {...register("product_name", { required: "Product Name is required", maxLength: { value: 100 } })} />
                                    {errors.product_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.product_name.message}</p>)}
                                </div>
                                <div className="d-flex gap-3 addProduct-multi-field-wrapper">
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
                            <div className="col-md-6 border-start addproduct-material-array-wrapper">
                                {inv_type == 'MANUFACTURED' &&
                                    <>
                                        <div className="form-group d-flex justify-content-center addproduct-materials-header">
                                            <span style={{ fontWeight: '600' }}>Materials Used per <kbd>{getValues('product_unit')}</kbd></span>
                                        </div>
                                        {fields.map((field, index) => {
                                            return (
                                                <div key={field.id} className="d-flex gap-2 addproduct-material-fields-wrapper">
                                                    <div className="col-sm-6 mb-2 addproduct-material-field-item item-a">
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
                                                    <div className="col-lg-3 mb-2 addproduct-material-field-item item-b">
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
                                                    <div className="mb-2 addproduct-material-field-item item-c">
                                                        <label>Unit</label>
                                                        <input type="text" className="form-control form-control-sm" disabled={true}
                                                            {
                                                            ...register(`materials.${index}.unit`)
                                                            } />
                                                    </div>
                                                    <div className="btn-group mb-2 addproduct-material-field-item item-d field-action-cancel">
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
                                        {
                                            errors?.materials?.root?.message && (
                                                <p className='text-center'><code>{errors.materials?.root?.message}</code></p>
                                            )
                                        }
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
                        <button className='btn btn-primary col-2 submit-form-btn' 
                            form='addProductForm' 
                            disabled={isSubmitting || !isDirty}
                        >
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
                        <button className='btn btn btn-outline-secondary cancel-form-btn' onClick={() => navigate(-1)}>Cancel</button>

                    </div >
                </>
            )}
        </div >

    )
}
