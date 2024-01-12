import axiosInstance from '../../helpers/axios';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

import { FiPlus, FiPlusCircle } from 'react-icons/fi';
import { useForm } from 'react-hook-form';

export default function MaterialInventoryForm({ config }) {
    const { supplier, data } = config
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        setValue,
        getValues,
        formState: { errors, isSubmitting },
    } = useForm({
        // defaultValues: {
        //     inventory_quantity: 0,
        //     price_per_unit: 0
        // }
    });

    const onSubmit = async (data) => {
        console.log(data)
        axiosInstance.post('inventory/materials/', data, { headers: { 'Content-Type': 'application/json' } })
            .then((response) => {
                console.log(response)
                enqueueSnackbar(response.data.message, { variant: 'success' });
                reset();
                history.back();
            })
            .catch((err) => {
                console.log(err)
                setError(`${err.response.data.label}`, {
                    type: "manual",
                    message: `${err.response.data.message}`
                })
            })
    }

    const onAdd = (event, param) => {
        event.preventDefault();
        navigate(`/${param}/add`);
    }

    return (
        <div className="container">
            <form id='adddataForm' onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-7">
                        <div className='form-group mb-2'>
                            <label htmlFor="inventory_material_name" className="text-md text-gray-500">Material Name</label>
                            <div className="input-group">
                                <select className="form-select form-select-sm" autoComplete='off' id='inventory_material_name' {...register("inventory_material_name", { required: "Product Name is required" })}>
                                    <option value="">Choose...</option>
                                    {data.map((item, index) => (
                                        <option key={index} value={item.material_name}>{item.material_name}</option>

                                    ))}
                                </select>
                                <button className='btn' onClick={(event) => onAdd(event, 'materials')} style={{ backgroundColor: "rgb(115, 219, 125)" }}><FiPlusCircle className='input-group' style={{ height: '20px', width: '20px' }} /></button>
                            </div>
                            {errors.inventory_material_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.inventory_material_name.message}</p>)}
                        </div>

                        <div className='form-group mb-2'>
                            <label htmlFor="supplier" className="text-md text-gray-500">Supplier</label>
                            <div className="input-group">
                                <select className="form-select form-select-sm" autoComplete='off' id='supplier' {...register("supplier", { required: "Supplier is required" })}>
                                    <option value="">Choose...</option>
                                    {supplier.map((item, index) => (
                                        <option key={index} value={item.company_name}>{item.company_name}</option>
                                    ))}
                                </select>
                                <button className='btn' onClick={(event) => onAdd(event, 'supplier')} style={{ backgroundColor: "rgb(115, 219, 125)" }}><FiPlusCircle className='input-group' style={{ height: '20px', width: '20px' }} /></button>
                            </div>
                            {errors.supplier && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.supplier.message}</p>)}
                        </div>

                        <div className='form-group mb-2'>
                            <label htmlFor="material_quantity">Quantity</label>
                            <input type="number" className="form-control form-control-sm" id='material_quantity' autoComplete='off' min={0} step="0.01"
                                {
                                ...register("material_quantity", {
                                    required: "Quantity is required",
                                    valueAsNumber: true,
                                    onChange: (e) => setValue("total_cost", (e.target.value * getValues("price_per_unit"))) // Provides Value to total Cost when change
                                })
                                } />
                            {errors.material_quantity && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.material_quantity.message}</p>)}
                        </div>

                        <div className="flex-fill mb-2">
                            <label htmlFor="price_per_unit">Cost per Unit</label>
                            <input type="number" className="form-control form-control-sm" id='price_per_unit' autoComplete='off' min={0} step="0.0001"
                                {
                                ...register("price_per_unit", {
                                    required: "Unit Price is required",
                                    valueAsNumber: true,
                                    onChange: (e) => setValue("total_cost", (e.target.value * getValues("material_quantity"))) // Provides Value to total Cost when change
                                })
                                } />
                        </div>
                        <div className="flex-fill mb-2">
                            <label htmlFor="total_cost">Total Cost</label>
                            <input type="number" className="form-control form-control-sm" id='total_cost' autoComplete='off' step="0.000001" readOnly {...register("total_cost", { required: "Unit Price is required", valueAsNumber: true, })} />
                        </div>

                    </div>
                    <div className="col-md-5">
                        <div className='form-group mb-2'>
                            <label htmlFor="ordered_date">Ordered Date</label>
                            <input type="date" className="form-control form-control-sm" id='ordered_date' {...register("ordered_date", { required: "Date is required" })} />
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="inventory_material_note">Note</label>
                            <textarea className="form-control form-control-sm" rows="5" cols="50" style={{ resize: 'none' }} id='inventory_material_note' {...register("inventory_material_note")}></textarea>
                        </div>
                    </div>
                </div>
            </form>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                <button className='btn btn-primary col-2' form='adddataForm' disabled={isSubmitting}><FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />Save</button>
                <button className='btn btn btn-outline-secondary'>Cancel</button>
            </div>
        </div>
    )
}
