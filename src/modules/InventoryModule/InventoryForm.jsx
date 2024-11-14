import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Spinner from '../../components/Fallback/Spinner';
import { Spin, Tooltip } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { FiPlus, FiPlusCircle, FiInfo } from 'react-icons/fi';
import { useForm, Controller } from 'react-hook-form';
import FormModal from '../../components/Modal/FormModal';
import AddProductModalForm from '../../components/ModalForms/AddProductModalForm';

import CreatableSelect from 'react-select/creatable';
import axiosInstance from '../../helpers/axios';

import InventoryFormAside from './components/InventoryFormAside';
import CardModal from '../../components/Modal/CardModal';

import { useDispatch } from "react-redux";
import { modalForm } from '../../features/modal/modalSlice';
import { HiOutlineDocumentMagnifyingGlass } from "react-icons/hi2";
import ProdInventoryCardModalTitle from '../../components/ModalTitle/ProdInventoryCardModalTitle';
import InventoryFormModalBody from './components/InventoryFormModalBody';
import { useAddInventoryProductMutation } from '../../features/inventory/inventoryApiSlice';
import { useSnackbar } from 'notistack';



export default function InventoryForm({ config }) {

    // Redux
    const [addInventory] = useAddInventoryProductMutation();
    const {enqueueSnackbar} = useSnackbar();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        Labels,
        supplier = [],
        product = [],
        isLoading
    } = config

    const productConfig = {
        FORM_ENTITY: 'Products',
        METHOD: 'post',
        MAIN_URL: `products/`,
        SECOND_URL: `products/`,
    }

    const [ResponseData, setResponseData] = useState([]);
    const [UnitCostData, setUnitCostData] = useState([]);
    const [TotalCost, setTotalCost] = useState(0);
    const [FormLoading, setFormLoading] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
        setError: formSetError,
        clearErrors: formClearError,
        setValue,
        getValues,
        watch,
        control,
        formState: { errors, isSubmitting, isDirty, isValid },
    } = useForm({
        defaultValues: {
            inventory_quantity: 0,
            price_per_unit: 0,
            total_cost: 0
        }
    });


    const handleOpenFormModal = () => {
        dispatch(modalForm(true));
    }


    const onQuantityChange = () => {
        let inventory_quantity = isNaN(getValues('inventory_quantity')) ? 0 : getValues('inventory_quantity');
        setValue("total_cost", (inventory_quantity * getValues("price_per_unit")).toFixed(2));
        onProductNameChange();
    }

    const onSubmit = async (data) => {
        setFormLoading(true);

        let message = "";
        let variant = "";

        try {
            const response = await addInventory(data).unwrap();
            message = response?.message;
            variant = "success";
            reset();
        }
        catch (err) {
            console.log("Adding sales error: ", err);
            message = err?.data?.message || `${err?.status} Code: ${err?.originalStatus || "Call Master Joseph"}` || "An error occurred";
            variant = "error";
        }
        finally {
            setTimeout(() => {
                enqueueSnackbar(message, {variant: variant, autoHideDuration: 5000});
                setFormLoading(false);
                navigate(-1);
            }, 1500); 
        }
    }

    const onProductNameChange = async () => {
        // Validate Product(Manufactured)
        // Check if Materials are complete
        // Check if there's enought Material Stock
        let product_name = getValues('inventory_product_name')
        let ordered_date = getValues('ordered_date')
        let inventory_quantity = isNaN(getValues('inventory_quantity')) ? 0 : getValues('inventory_quantity')
        let sumTotalCost = 0;

        let collectUnitPrice = [];
        const data = {
            product_name,
            ordered_date,
            inventory_quantity
        }
        await axiosInstance
            .post('products/production-run/validate', data, {
                headers: { 'Content-Type': 'application/json' }
            }).then((response) => {
                formClearError('inventory_product_name')
                formClearError('inventory_quantity')
                // console.log(response);
                response?.data?.forEach((item, index) => {
                    // console.log(item)
                    collectUnitPrice[index] = item[item.length - 1].unit_cost
                    item.pop()
                    for (let i = 0; i < item.length; i++) {
                        // console.log(item[i].total_cost)
                        sumTotalCost += Number(item[i].total_cost)
                    }
                })
                // sumTotalCost /= inventory_quantity;


                setTotalCost(sumTotalCost)
                setResponseData(response.data)
                setUnitCostData(collectUnitPrice)
            }).catch((error) => {
                console.log(error)
                formSetError(`${error?.response?.data?.label}`, {
                    type: "manual",
                    message: `${error?.response?.data?.message}`
                })
            })
        setValue('price_per_unit', isNaN(sumTotalCost / inventory_quantity) ? 0 : (sumTotalCost / inventory_quantity).toFixed(2))
        setValue('total_cost', (getValues('price_per_unit') * inventory_quantity).toFixed(2))
    }

    watch('price_per_unit');

    return (
        <div className="container">
            {isLoading ? (
                <Spinner />
            ) : (
                <>
                    <form id='adddataForm' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-5 border-end border-secondary">
                                <div className='form-group mb-2'>
                                    <label htmlFor="ordered_date">Ordered Date</label>
                                    <input type="date" className="form-control form-control-sm" id='ordered_date'
                                        {
                                        ...register("ordered_date", {
                                            required: "Date is required",
                                            onChange: () => onProductNameChange(),
                                            onBlur: () => onProductNameChange(),
                                        })
                                        }
                                    />
                                    {errors.ordered_date && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.ordered_date.message}</p>)}
                                </div>
                                <div className='form-group mb-2'>
                                    <label htmlFor="inventory_product_name" className="text-md text-gray-500">Product Name</label>
                                    <div className="input-group">
                                        <select className="form-select form-select-sm" autoComplete='off' id='inventory_product_name'
                                            {
                                            ...register("inventory_product_name", {
                                                required: "Product Name is required",
                                                onChange: () => onProductNameChange(),
                                                onBlur: () => onProductNameChange(),
                                            })
                                            }
                                        >
                                            {!product?.length ? (
                                                <option value="">Choose...</option>
                                            ) : (
                                                <>
                                                    <option value="">Choose...</option>
                                                    {product?.map((item, index) => (
                                                        <option key={index} value={item.product_name}>{item.product_name}</option>
                                                    ))}
                                                </>
                                            )}
                                        </select>
                                        <button
                                            className="btn"
                                            type="button"
                                            style={{ backgroundColor: "rgb(115, 219, 125)" }}
                                            tabIndex={-1}
                                            onClick={handleOpenFormModal}
                                        >
                                            <FiPlusCircle className='input-group' style={{ height: '20px', width: '20px' }} />
                                        </button>
                                    </div>
                                    {errors.inventory_product_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.inventory_product_name.message}</p>)}
                                </div>
                                <div className='form-group mb-2'>
                                    <label htmlFor="supplier" className="text-md text-gray-500">Supplier</label>
                                    <Controller
                                        name='supplier'
                                        render={({ field }) => (
                                            <CreatableSelect
                                                {...field}
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
                                            />
                                        )}
                                        control={control}
                                        rules={{ required: true }}
                                    />
                                    {errors.supplier && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.supplier.message}</p>)}
                                </div>
                                <div className='form-group mb-2'>
                                    <label htmlFor="inventory_quantity">Quantity</label>
                                    <input type="number" className="form-control form-control-sm" id='inventory_quantity' autoComplete='off' min={0} step={0.01} required
                                        {
                                        ...register("inventory_quantity", {
                                            required: "Quantity is required",
                                            valueAsNumber: true,
                                            min: 0.01,
                                            onChange: () => onQuantityChange(),
                                            onBlur: () => onQuantityChange(),
                                        })
                                        } />
                                    {errors.inventory_quantity && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.inventory_quantity.message}</p>)}
                                </div>
                                <div className="flex-fill mb-2">
                                    <label htmlFor="price_per_unit">
                                        Cost per Unit
                                        {!UnitCostData.length ? ("") : (
                                            <Tooltip title={`Material Total Cost \u{00F7} Production Quantity`}>
                                                <FiInfo style={{ color: 'var(--bs-indigo-500)', margin: '2px', cursor: 'pointer' }} />
                                            </Tooltip>
                                        )}
                                    </label>
                                    <input type="number" className="form-control form-control-sm" id='price_per_unit' autoComplete='off' min={0} step="0.0001"
                                        {
                                        ...register("price_per_unit", {
                                            required: "Unit Price is required",
                                            valueAsNumber: true,
                                            onChange: (e) => setValue("total_cost", (e.target.value * getValues("inventory_quantity")).toFixed(2)), // Provides Value to total Cost when change
                                            onBlur: (e) => setValue("total_cost", (e.target.value * getValues("inventory_quantity")).toFixed(2)) // Provides Value to total Cost when change
                                        })
                                        } />
                                </div>
                                <div className="flex-fill mb-2">
                                    <label htmlFor="total_cost">Total Cost</label>
                                    <input type="number" className="form-control form-control-sm" id='total_cost' autoComplete='off' step={0.01} readOnly {...register("total_cost", { required: "Unit Price is required" })} />
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="inventory_product_note">Note</label>
                                    <textarea className="form-control form-control-sm" rows="5" cols="50" style={{ resize: 'none' }} id='inventory_product_note' {...register("inventory_product_note")}></textarea>
                                </div>
                            </div>
                            <div className="col-md-7">
                                <InventoryFormAside data={ResponseData} />
                                {ResponseData.length !== 0 &&

                                    <CardModal
                                        titleProp={
                                            <ProdInventoryCardModalTitle cardData={
                                                {
                                                    product_name: getValues('inventory_product_name'),
                                                    date: getValues('ordered_date')
                                                }
                                            } />
                                        }
                                        modalWidth={800}
                                        classList={"d-flex justify-content-center flex-md-nowrap align-items-center pt-2 mt-4"}
                                        buttonText={
                                            <button
                                                type='button'
                                                className='btn btn-primary col-6'
                                                disabled={!isDirty}
                                            >
                                                <HiOutlineDocumentMagnifyingGlass style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />
                                                Review
                                            </button>
                                        }
                                        setDestroy={() => []}
                                    >
                                        <InventoryFormModalBody invData={ResponseData} />

                                    </CardModal>
                                }
                            </div>
                        </div>
                    </form>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                        <button className='btn btn-primary col-2' form='adddataForm'
                            disabled={isSubmitting || errors['inventory_product_name'] || !isDirty || !isValid}>
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
                        config={productConfig}
                    >
                        <AddProductModalForm
                            config={productConfig}
                        />
                    </FormModal>
                </>
            )
            }
        </div >
    )
}
