import axiosInstance from '../../helpers/axios';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import { Spin, Flex } from 'antd';

import { FiPlus } from 'react-icons/fi';

export default function RawMaterialForm({ config }) {
    const { unit,
        category,
        unitLoad,
        categoryLoad
    } = config;
    const { enqueueSnackbar } = useSnackbar();
    const {
        register,
        handleSubmit,
        setError,
        reset,
        formState: { errors, isSubmitting },
    } = useForm();

    const onSubmit = async (data) => {
        console.log(data)
        axiosInstance
            .post('materials/', data, { headers: { 'Content-Type': 'application/json' } })
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

    return (
        <div className="container">
            {unitLoad || categoryLoad ? (
                <div className="py-5">
                    <Flex vertical>
                        <Spin />
                    </Flex>
                </div>
            ) : (
                <>
                    <form id='addMaterialForm' onSubmit={handleSubmit(onSubmit)}>
                        <div className="row">
                            <div className="col-md-7">
                                <div className="form-group mb-2">
                                    <label htmlFor="material_name" className="text-md text-gray-500">Material Name</label>
                                    <input type="text" className={`form-control form-control-sm`} autoComplete='off' id='material_name' {...register("material_name", { required: "Material Name is required", maxLength: { value: 100 } })} />
                                    {errors.material_name && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.material_name.message}</p>)}
                                </div>
                                <div className="d-flex gap-3">
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="material_min_stock">Minimum Stock</label>
                                        <input type="number" className="form-control form-control-sm" id='material_min_stock' min={0} step="0.01" {...register("material_min_stock", { required: "Minimum Stock is required", valueAsNumber: true })} />
                                        {errors.material_min_stock && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.material_min_stock.message}</p>)}
                                    </div>
                                    <div className="flex-fill mb-2">
                                        <label htmlFor="material_unit">Unit</label>
                                        <select className="form-select form-select-sm" autoComplete='off' id='material_unit' {...register("material_unit", { required: "Product Unit is required" })}>
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
                                        {errors.material_unit && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{errors.material_unit.message}</p>)}
                                    </div>
                                </div>
                                <div className="form-group mb-2">
                                    <label htmlFor="material_note">Note</label>
                                    <textarea className="form-control form-control-sm" rows="3" cols="50" style={{ resize: 'none' }} id='material_note' {...register("material_note", { maxLength: 200 })}></textarea>
                                </div>
                            </div>
                            <div className="col-md-5">

                            </div>
                        </div>
                    </form>
                    <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-2 mt-4 border-top">
                        <button className='btn btn-primary col-2' form='addMaterialForm' disabled={isSubmitting}><FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />Save</button>
                        <button className='btn btn btn-outline-secondary'>Cancel</button>
                    </div>
                </>
            )}
        </div>
    )
}
