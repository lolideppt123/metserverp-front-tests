import { useForm, useFieldArray } from 'react-hook-form';
import { FiX, FiPlus } from 'react-icons/fi';

export default function MaterialProductionItem({ material, product_unit, iconPlus }) {
    // console.log(material)
    // const {
    //     register,
    //     control,
    //     formState: {errors}
    // } = useForm({
    //     defaultValues: {
    //         materials: [{ material: "", quantity: 0 }],
    //         product_unit: "Piece"
    //     }
    // })

    // const { fields, append, remove } = useFieldArray({
    //     name: 'materials',
    //     control,
    //     rules: {
    //         required: "Required atleast 1 item"
    //     }
    // })


    return (
        <>
            <div className="form-group" style={{ display: "flex", flexDirection: 'row', justifyContent: "center" }}>
                <span style={{ fontWeight: '600' }}>Materials Used per {product_unit}</span>
            </div>
            {fields.map((field, index) => {
                return (
                    <div key={field.id} className="d-flex gap-2">
                        <div className="flex-grow-1 mb-2">
                            <label>Material</label>
                            <select className='form-select form-select-sm' {...register(`materials.${index}`, { required: "Material is required" })}>
                                <option value="">Choose...</option>
                                {material.map((item, index) => (
                                    <option key={index} value={item.material_name}>{item.material_name}</option>
                                ))}
                            </select>
                            {/* {`${errors.material}_${index}` && (<p className='text-danger px-1 mt-1 mb-2' style={{ fontWeight: "600", fontSize: "13px" }}>{`${errors.material}_${index}`}</p>)} */}
                        </div>
                        <div className="mb-2">
                            <label>Quantity</label>
                            <input type="number" className="form-control form-control-sm" {...register(`quantity.${index}`, { valueAsNumber: true })} />
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
                    {iconPlus}Add Item</button>
            </div>
        </>
    )
}
