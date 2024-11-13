import { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { Spin } from 'antd';
import Spinner from '../Fallback/Spinner';
import { LoadingOutlined } from '@ant-design/icons';
import { FiPlus, FiX } from 'react-icons/fi';

import { useGetDictionaryQuery } from '../../features/utils/dictionaryApiSlice';
import { useAddProductMutation } from '../../features/products/productApiSlice';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { modalForm } from '../../features/modal/modalSlice';

export default function AddProductModalForm({ config }) {
    const { FORM_ENTITY } = config;
    const [FormLoading, setFormLoading] = useState(false);

    
    // Redux
    const {data: {
        categories: category,
        units: unit,
        materials: material,
    } = {}, isLoading, isError, error, isSuccess} = useGetDictionaryQuery();
    const [addProduct] = useAddProductMutation();
    const {enqueueSnackbar} = useSnackbar();
    const dispatch = useDispatch();


    // choices you already picked
    const [chosenMaterials, setChosenMaterials] = useState([])
    const [picked, setPicked] = useState([])
    const [inv_type, setType] = useState(false);

    const {
        register: registerProduct,
        handleSubmit: handleSubmitProduct,
        reset,
        getValues: getProductValues,
        setValue: setProductValue,
        watch: watchProduct,
        setError: formProductSetError,
        clearErrors,
        control,
        formState: { errors: errorsProduct, isSubmitting: isSubmittingProduct },
    } = useForm({
        defaultValues: {
            product_name: "",
            product_min_stock: 0,
            materials: [{ material: '', quantity: 0, unit: '' }],
            product_unit: "Piece"
        }
    });

    const { fields: materialFields, append: appendMaterial, remove: removeMaterial } = useFieldArray({
        name: 'materials',
        control,
        rules: {
            required: 'Required at least 1 item'
        }
    })

    const handleCloseModal = () => {
        dispatch(modalForm(false));
    }

    const onSubmitProduct = async (data) => {
        setFormLoading(true);

        let message = "";
        let variant = "";

        setTimeout( async () => {
            try {
                const response = await addProduct(data).unwrap();
                message = response?.message;
                variant = "success";
                reset();
                clearErrors();
            } catch (err) {
                console.log(`Adding material error: `, err);
                message = err?.data?.message || err || "An error occurred";

                variant = "error";
            } finally {
                enqueueSnackbar(message, {variant: variant, autoHideDuration: 5000})
                setFormLoading(false);
                handleCloseModal();
            }
        }, 1500);

    }

    const handleRemoveItem = (index) => {
        setChosenMaterials(prev => prev.filter((_, i) => i !== index))
        setPicked(prev => {
            return prev.filter(prevItem => prevItem !== item[index].material)
        })
    }

    const handleChangeItem = (e, index) => {
        setChosenMaterials(prev => [...prev, item[index]])
        setPicked(prev => [...prev, item[index].material])
        material.map((item) => {
            item.material_name == getProductValues(`materials.${index}.material`) && setProductValue(`materials.${index}.unit`, item.material_unit_abbv)
        })
    }

    const item = watchProduct('materials') // Needed
    const getUnit = watchProduct("product_unit"); //Needed


    return (
        <div className="container pt-3">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <form id={`add${FORM_ENTITY}Form`} onSubmit={handleSubmitProduct(onSubmitProduct)}>
                        <div className="form-group mb-2">
                            <label htmlFor="product_name" className="text-md text-gray-500">Product Name</label>
                            <input type="text" className={`form-control form-control-sm`} autoComplete='off'
                                {
                                ...registerProduct("product_name", {
                                    required: "Product Name is required",
                                    maxLength: { value: 100 }
                                }
                                )} />
                            {errorsProduct.product_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errorsProduct.product_name.message}</p>)}
                        </div>
                        <div className="d-flex gap-3">
                            <div className="flex-fill mb-2">
                                <label htmlFor="supplier" className="text-md text-gray-500">Inventory Type</label>
                                <select className="form-select form-select-sm" autoComplete='off' id='inventory_type'
                                    {
                                    ...registerProduct("inventory_type", {
                                        required: "Inventory Type is required",
                                        onChange: (e) => setType(e.target.value)
                                    }
                                    )}>
                                    <option value={"IMPORTED"}>IMPORTED</option>
                                    <option value={"MANUFACTURED"}>MANUFACTURED</option>
                                    <option value={"LOCAL_PURCHASE"}>LOCAL PURCHASE</option>
                                </select>
                                {errorsProduct.inventory_type && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errorsProduct.inventory_type.message}</p>)}
                            </div>
                            <div className="flex-fill mb-2">
                                <label htmlFor="product_min_stock">Min. Stock</label>
                                <input type="number" className="form-control form-control-sm" id='product_min_stock' min={1} step="0.01"
                                    {
                                    ...registerProduct("product_min_stock", {
                                        required: "Minimum Stock is required",
                                        min: 1,
                                        valueAsNumber: true
                                    }
                                    )} />
                                {errorsProduct.product_min_stock && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errorsProduct.product_min_stock.message}</p>)}
                            </div>
                            <div className="flex-fill mb-2">
                                <label htmlFor="product_unit">Unit</label>
                                <select className="form-select form-select-sm" autoComplete='off' id='product_unit'
                                    {
                                    ...registerProduct("product_unit", {
                                        required: "Product Unit is required"
                                    }
                                    )}>
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
                                {errorsProduct.product_unit && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errorsProduct.product_unit.message}</p>)}
                            </div>
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="product_note">Note</label>
                            <textarea className="form-control form-control-sm" rows="3" cols="50" style={{ resize: 'none' }} id='product_note'
                                {
                                ...registerProduct("product_note", {
                                    maxLength: 200
                                }
                                )}>
                            </textarea>
                        </div>
                        {inv_type == 'MANUFACTURED' &&
                            <>
                                <hr style={{ borderTop: "1px dashed gray" }} />
                                <div className="container border rounded pt-2 pb-3">
                                    <div className="form-group" style={{ display: "flex", flexDirection: 'row', justifyContent: "center" }}>
                                        <h6 style={{ fontWeight: '600' }}>Materials Used per {getProductValues('product_unit')}</h6>
                                    </div>
                                    {materialFields.map((field, index) => {
                                        return (
                                            <div key={field.id} className="d-flex gap-2">
                                                <div className="col-lg-7 mb-2">
                                                    <label>Material</label>
                                                    <select className='form-select form-select-sm' disabled={getProductValues(`materials.${index}.material`) == "" ? false : true}
                                                        {
                                                        ...registerProduct(`materials.${index}.material`, {
                                                            required: "Material is required",
                                                            onChange: (e) => handleChangeItem(e, index)
                                                        }
                                                        )}>
                                                        {!material.length ? (
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
                                                <div className="col-lg-2 mb-2">
                                                    <label>Quantity</label>
                                                    <input type="number" className="form-control form-control-sm" step={0.0001} min={0.0001}
                                                        {
                                                        ...registerProduct(`materials.${index}.quantity`, {
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
                                                        ...registerProduct(`materials.${index}.unit`)
                                                        } />
                                                </div>
                                                <div className="btn-group mb-2">
                                                    <a type='button' className='text-danger' onClick={() => {
                                                        handleRemoveItem(index)
                                                        removeMaterial(index)
                                                    }
                                                    }>
                                                        <FiX style={{ height: '24px', width: '24px', margin: '23px 6px 3px 0' }} />
                                                    </a>
                                                </div>
                                            </div>
                                        )
                                    }
                                    )}
                                    <p className='fw-bold text-center text-danger'><i>{errorsProduct.materials?.root?.message}</i></p>
                                    <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-2 mt-2 border-top">
                                        <button className='btn btn-primary' type='button'
                                            onClick={() => {
                                                appendMaterial({
                                                    material: "",
                                                    quantity: 0,
                                                    unit: ''
                                                })
                                            }}>
                                            <FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />Add Item</button>
                                    </div>
                                </div>
                            </>
                        }
                    </form>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center mt-4">
                        <button className='btn btn-primary' form={`add${FORM_ENTITY}Form`}>
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
                            Submit
                        </button>
                        <button className='btn btn btn-outline-secondary' onClick={ handleCloseModal}>
                            Cancel
                        </button>
                    </div>
                </>


            )}
        </div>
    )
}
