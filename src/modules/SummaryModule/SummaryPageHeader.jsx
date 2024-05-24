import React from "react";
import AntdDatePicker from "../../components/DatePicker/AntdDatePicker";

export default function SummaryPageHeader({
    Labels,
    defaultDate,
    setDate,
    optionPicker = false,
    product = [],
    material = [],
    setInventoryFilter = () => { }
}) {
    return (
        <>
            <div className="col-md-9 mb-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-0 my-2">
                        <li className="breadcrumb-item">
                            <a href="">{Labels.BASE_ENTITY}</a>
                        </li>
                        <li
                            className="breadcrumb-item active"
                            aria-current="page"
                        >
                            {Labels.TABLE_TITLE}
                        </li>
                    </ol>
                </nav>
            </div>

            <div className="row">
                <div className="col col-lg-3">
                    {optionPicker && (
                        <select
                            className="form-select form-select-sm w-100"
                            onChange={(e) => setInventoryFilter(e.target.value)}
                        >
                            <option key={'all'} value="">
                                ALL
                            </option>
                            {product && (
                                <optgroup label="Products">
                                    {product?.map((item, index) => <option key={item.product_name + item.id} value={item.product_name}>{item.product_name}</option>)}
                                </optgroup>
                            )}
                            {material && (
                                <optgroup label="Materials">
                                    {material?.map((item, index) => <option key={item.material_name + item.id} value={item.material_name}>{item.material_name}</option>)}
                                </optgroup>
                            )}

                        </select>
                    )}
                </div>
                <div className="col col-lg-5"></div>
                <div className="col col-lg-4">
                    <AntdDatePicker
                        defaultDate={defaultDate}
                        setDate={setDate}
                    />
                </div>
            </div>
        </>
    );
}
