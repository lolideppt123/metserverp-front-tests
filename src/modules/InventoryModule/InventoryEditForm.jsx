import { useEffect } from 'react';
import axiosInstance from '../../helpers/axios';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { useNavigate } from "react-router-dom";

import { FiPlus, FiPlusCircle } from 'react-icons/fi';

export default function InventoryEditForm({ config }) {
    const { supplier, products, data, id } = config
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        setError,
        setValue,
        getValues,
        watch,
        formState: { errors, isSubmitting },
    } = useForm({
        defaultValues: {
            inventory_quantity: 0,
            price_per_unit: 0
        }
    });

    const onSubmit = async (data) => {
        console.log(data)
        axiosInstance
            .put(`inventory/transaction/${id}/edit`, data, {
                headers: { 'Content-Type': 'application/json' }
            })
            .then((response) => {
                console.log(response)
                // enqueueSnackbar(response.data.message, { variant: 'success' });
                // reset();
                // history.back();
            })
            .catch((err) => {
                console.log(err.response.data)
                // setError(`${err.response.data.label}`, {
                //     type: "manual",
                //     message: `${err.response.data.message}`
                // })
            })
    }

    const onAdd = (event, param) => {
        // event.preventDefault();
        // navigate(`/${param}/add`);
    }

    useEffect(() => {
        if (data === undefined || data.length == 0) {
            console.log("data does not exists")
        }
        else {
            console.log(data);
            [
                { name: 'inventory_product_name', value: data.product_name },
                { name: 'supplier', value: data.supplier },
                { name: 'inventory_quantity', value: parseFloat(data.quantity) },
                { name: 'price_per_unit', value: parseFloat(data.product_cost) },
                { name: 'total_cost', value: parseFloat(data.product_total_cost) },
                { name: 'ordered_date', value: data.ordered_date },
                { name: 'inventory_note', value: data.inventory_note },
            ].forEach(({ name, value }) => setValue(name, value))

        }
    }, [data])

    return (
        <div className="container">
            <form id='adddataForm' onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-md-7">
                        <div className='form-group mb-2'>
                            <label htmlFor="inventory_product_name" className="text-md text-gray-500">Product Name</label>
                            <div className="input-group">
                                <select className="form-select form-select-sm" autoComplete='off' id='inventory_product_name' {...register("inventory_product_name", { required: "Product Name is required" })}>
                                    <option value="">Choose...</option>
                                    {products.map((item, index) => (
                                        <option key={index} value={item.product_name}>{item.product_name}</option>
                                    ))}
                                </select>
                            </div>
                            {errors.inventory_product_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.inventory_product_name.message}</p>)}
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
                            </div>
                            {errors.supplier && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.supplier.message}</p>)}
                        </div>
                        <div className='form-group mb-2'>
                            <label htmlFor="inventory_quantity">Quantity</label>
                            <input type="number" className="form-control form-control-sm" id='inventory_quantity' autoComplete='off' min={0} step="0.01"
                                {
                                ...register("inventory_quantity", {
                                    required: "Quantity is required",
                                    valueAsNumber: true,
                                    onChange: (e) => setValue("total_cost", (e.target.value * getValues("price_per_unit"))) // Provides Value to total Cost when change
                                })
                                } />
                            {errors.inventory_quantity && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.inventory_quantity.message}</p>)}
                        </div>
                        <div className="flex-fill mb-2">
                            <label htmlFor="price_per_unit">Cost per Unit</label>
                            <input type="number" className="form-control form-control-sm" id='price_per_unit' autoComplete='off' min={0} step="0.0001"
                                {
                                ...register("price_per_unit", {
                                    required: "Unit Price is required",
                                    valueAsNumber: true,
                                    onChange: (e) => setValue("total_cost", (e.target.value * getValues("inventory_quantity"))) // Provides Value to total Cost when change
                                })
                                } />
                        </div>
                        <div className="flex-fill mb-2">
                            <label htmlFor="total_cost">Total Cost</label>
                            <input type="number" className="form-control form-control-sm" id='total_cost' autoComplete='off' step="0.000001" readOnly {...register("total_cost", { required: "Unit Price is required" })} />
                        </div>
                    </div>
                    <div className="col-md-5">
                        <div className='form-group mb-2'>
                            <label htmlFor="ordered_date">Ordered Date</label>
                            <input type="date" className="form-control form-control-sm" id='ordered_date' {...register("ordered_date", { required: "Date is required" })} />
                            {errors.ordered_date && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.ordered_date.message}</p>)}
                        </div>
                        <div className="form-group mb-2">
                            <label htmlFor="inventory_product_note">Note</label>
                            <textarea className="form-control form-control-sm" rows="5" cols="50" style={{ resize: 'none' }} id='inventory_product_note' {...register("inventory_product_note")}></textarea>
                        </div>
                    </div>
                </div>
            </form>
            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                <button className='btn btn-primary col-2' form='adddataForm' disabled={isSubmitting}><FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />Save</button>
                <button className='btn btn btn-outline-secondary'>Cancel</button>
            </div>
        </div >
    )
}
