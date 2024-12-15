import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Spinner from '../../components/Fallback/Spinner';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import { FiPlus, FiPlusCircle } from 'react-icons/fi';
import CreatableSelect from 'react-select/creatable';

import FormModal from '../../components/Modal/FormModal';
import AddMaterialModalForm from '../../components/ModalForms/AddMaterialModalForm';
import { useAddInventoryMaterialMutation, useUpdateInventoryMaterialItemMutation } from '../../features/inventory/materialInventoryApiSlice';
import { useSnackbar } from 'notistack';
import { useDispatch } from 'react-redux';
import { modalForm } from '../../features/modal/modalSlice';

export default function MaterialInventoryEditForm({ config }) {

    const {
        Labels,
        item,
        supplier = [],
        material = [],
        isLoading = true,
    } = config;

    const materialConfig = {
        FORM_ENTITY: 'Materials',
        METHOD: 'post',
        MAIN_URL: `materials/`,
        SECOND_URL: `materials/`,
    }

    // Redux
    const [updateMaterialInventory] = useUpdateInventoryMaterialItemMutation();
    const [addMaterialInventory] = useAddInventoryMaterialMutation();
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleOpenFormModal = () => {
        dispatch(modalForm(true));
    }

    const [FormLoading, setFormLoading] = useState(false);


    const {
        register,
        handleSubmit,
        reset,
        setValue,
        getValues,
        control,
        formState: { errors, isSubmitting, isDirty },
    } = useForm({
        defaultValues: {
            material_quantity: 0,
            price_per_unit: 0,
            total_cost: 0
        }
    });

    useEffect(() => {
        if (item == null) {
            console.log("item does not exists")
        }
        else {
            if (Labels.METHOD === 'post') {
                console.log('Silence is golden');
            }
            if (Labels.METHOD === 'put') {
                console.log(item);
                [
                    { name: 'pk', value: item.pk},

                    { name: 'inventory_material_name', value: item.material_name },
                    { name: 'supplier', value: item.supplier },
                    { name: 'material_quantity', value: parseFloat(item.quantity) },
                    { name: 'material_stock_left', value: parseFloat(item.material_stock_left) },
                    { name: 'price_per_unit', value: parseFloat(item.material_cost) },
                    { name: 'total_cost', value: parseFloat(item.material_total_cost) },
                    { name: 'ordered_date', value: item.ordered_date },
                    { name: 'inventory_material_note', value: item.inventory_note },
                ].forEach(({ name, value }) => setValue(name, value))
            }

        }
    }, [item])

    const onSubmit = async (data) => {
        setFormLoading(true);
        let message = "";
        let variant = "";

        try {
            if(Labels.METHOD === 'put') {
                console.log("update");
                const response = await updateMaterialInventory(data).unwrap();
                message = response?.message;
            } else if (Labels.METHOD === 'post') {
                console.log("add");
                const response = await addMaterialInventory(data).unwrap();
                message = response?.message;
            }
            variant = "success";
        } catch (err) {
            console.log("Adding sales error: ", err);
            message = err?.data?.message || err?.data?.detail || `${err?.status} Code: ${err?.originalStatus || "Call Master Joseph"}` || "An error occurred";
            variant = "error";
        } finally {
            setTimeout(() => {
                enqueueSnackbar(message, {variant: variant, autoHideDuration: 5000});
                setFormLoading(false);
                reset();
                navigate(-1);
            }, 1500); 
        }
    }

    return (
        <div className="container">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <form id={`add${Labels.PAGE_ENTITY}Form`} onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-7">
                                <div className='form-group mb-2'>
                                    <label htmlFor="inventory_material_name" className="text-md text-gray-500">Material Name</label>
                                    <div className="input-group">
                                        <select className="form-select form-select-sm" autoComplete='off' id='inventory_material_name' {...register("inventory_material_name", { required: "Product Name is required" })} disabled={Labels.METHOD == 'put' && true} >
                                            {material?.length === 0 ? (
                                                <option value={item?.material_name}>{item?.material_name}</option>
                                            ) : (
                                                <>
                                                    <option value="">Choose...</option>
                                                    {material?.map((item, index) => (
                                                        <option key={index} value={item.material_name}>{item.material_name}</option>
                                                    ))}
                                                </>
                                            )}
                                        </select>
                                        {Labels.METHOD == 'post' &&
                                            <button
                                                className="btn"
                                                type="button"
                                                style={{ backgroundColor: "rgb(115, 219, 125)" }}
                                                tabIndex={-1}
                                                onClick={handleOpenFormModal}
                                            >
                                                <FiPlusCircle className='input-group' style={{ height: '20px', width: '20px' }} />
                                            </button>
                                        }
                                    </div>
                                    {errors.inventory_material_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.inventory_material_name.message}</p>)}
                                </div>

                                <div className='form-group mb-2'>
                                    <label htmlFor="supplier" className="text-md text-gray-500">Supplier</label>
                                    <Controller
                                        name='supplier'
                                        render={({ field }) => (
                                            <CreatableSelect
                                                {...field}
                                                className={``}
                                                isClearable
                                                options={supplier}
                                                getOptionValue={(option) => option.id}
                                                getOptionLabel={(option) => option.company_name}
                                                getNewOptionData={
                                                    (value, label) => ({
                                                        id: value,
                                                        company_name: label,
                                                        __isNew__: true
                                                    })
                                                }
                                                maxMenuHeight={300}
                                                isDisabled={supplier?.length === 0 && true}
                                            />
                                        )}
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                    {errors.supplier && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.supplier.message}</p>)}
                                </div>

                                <div className='form-group mb-2'>
                                    <label htmlFor="material_quantity">Quantity</label>
                                    <input type="number" className="form-control form-control-sm" id='material_quantity' autoComplete='off' min={0} step="0.01" disabled={Labels.METHOD == 'put' && true}
                                        {
                                        ...register("material_quantity", {
                                            required: "Quantity is required",
                                            valueAsNumber: true,
                                            onChange: (e) => setValue("total_cost", (e.target.value * getValues("price_per_unit"))) // Provides Value to total Cost when change
                                        })
                                        } />
                                    {errors.material_quantity && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.material_quantity.message}</p>)}
                                </div>

                                {Labels.METHOD == 'put' && (
                                    <div className='form-group mb-2'>
                                        <label htmlFor="material_stock_left">Stock Left</label>
                                        <input type="number" className="form-control form-control-sm" id='material_stock_left' autoComplete='off' min={0} step={0.01} disabled={Labels.METHOD == 'put' && true}
                                            {
                                            ...register("material_stock_left", {
                                                required: "Quantity is required",
                                                valueAsNumber: true,
                                                onChange: (e) => setValue("total_cost", (e.target.value * getValues("price_per_unit"))) // Provides Value to total Cost when change
                                            })
                                            } />
                                        {errors.material_stock_left && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.material_stock_left.message}</p>)}
                                    </div>
                                )}

                                <div className="flex-fill mb-2">
                                    <label htmlFor="price_per_unit">Cost per Unit</label>
                                    <input type="number" className="form-control form-control-sm" id='price_per_unit' autoComplete='off' min={0} step="0.0001"
                                        {
                                        ...register("price_per_unit", {
                                            required: "Unit Price is required",
                                            valueAsNumber: true,
                                            onChange: (e) => setValue("total_cost", (e.target.value * getValues("material_quantity")).toFixed(2)) // Provides Value to total Cost when change
                                        })
                                        } />
                                </div>
                                <div className="flex-fill mb-2">
                                    <label htmlFor="total_cost">Total Cost</label>
                                    <input type="number" className="form-control form-control-sm" id='total_cost' autoComplete='off' step="0.01" readOnly {...register("total_cost", { required: "Total Cost is required", valueAsNumber: true, })} />
                                    {errors.total_cost && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.total_cost.message}</p>)}
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className='form-group mb-2'>
                                    <label htmlFor="ordered_date">Ordered Date</label>
                                    <input type="date" className="form-control form-control-sm" id='ordered_date' {...register("ordered_date", { required: "Date is required" })} disabled={Labels.METHOD == 'put' && true} />
                                    {errors.ordered_date && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.ordered_date.message}</p>)}
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="inventory_material_note">Note</label>
                                    <textarea className="form-control form-control-sm" rows="5" cols="50" style={{ resize: 'none' }} id='inventory_material_note' {...register("inventory_material_note")}></textarea>
                                </div>
                            </div>
                        </div>
                    </form>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                        <button type='submit' className='btn btn-primary col-2' form={`add${Labels.PAGE_ENTITY}Form`} disabled={isSubmitting || !isDirty}>
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
                        <button type='button' onClick={() => navigate(-1)} className='btn btn btn-outline-secondary'>Cancel</button>
                    </div>
                    <FormModal
                        config={materialConfig}
                    >
                        <AddMaterialModalForm
                            config={materialConfig}
                        />
                    </FormModal>
                </>
            )}
        </div>
    )
}
