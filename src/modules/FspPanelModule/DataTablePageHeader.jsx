import { useState } from 'react'
import { FiPlus, FiAlignJustify } from 'react-icons/fi';
import { NavLink } from 'react-router-dom';
import DropDownMenu from '../../components/DropDown/DropDownMenu';
import DropDownItem from '../../components/DropDown/DropDownItem';

export default function DataTablePageHeader({ Labels, type = null, setSalesFilter }) {
    return (
        <>
            <div className="col-md-9 mb-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-0 my-2">
                        <li className="breadcrumb-item"><a href="">{Labels.BASE_ENTITY}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{Labels.TABLE_TITLE}</li>
                    </ol>
                </nav>
            </div>

            <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                <div className="col-md-4">
                    <h3 style={{ fontSize: '24px' }}>{Labels.TABLE_TITLE} List</h3>
                </div>

                <div className="btn-toolbar">
                    {type == 'inventory' ? (
                        <div className="btn-group me-2">
                            <button className='btn btn-secondary'>
                                <DropDownMenu className="btn btn-primary" maintext={'Choose Type'} width={'120px'} top={'2.2rem'} left={'-0.85rem'}>
                                    <DropDownItem text={'Imported'} optionTextStyle={"text-start"} />
                                    <DropDownItem text={'Manufactured'} optionTextStyle={"text-start"} />
                                </DropDownMenu>
                            </button>
                        </div>
                    ) : (
                        type == 'sales' ? (

                            // <div className="btn-group me-2">
                            //     <button className='btn btn-secondary'>
                            //         <DropDownMenu className="btn btn-primary" maintext={'Choose Type'} width={'120px'} top={'2.2rem'} left={'-0.85rem'}>
                            //             <DropDownItem text={'Imported'} optionTextStyle={"text-start"} />
                            //             <DropDownItem text={'Manufactured'} optionTextStyle={"text-start"} />
                            //         </DropDownMenu>
                            //     </button>
                            // </div>
                            <div className="btn-group me-2">
                                <select className="form-select" style={{ overflowY: "scroll", maxHeight: "250px" }} onChange={(e) => setSalesFilter(e.target.value)}>
                                    <option value="ALL">All</option>
                                    <option value="1">January</option>
                                    <option value="2">February</option>
                                    <option value="3">March</option>
                                    <option value="4">April</option>
                                    <option value="5">May</option>
                                    <option value="6">June</option>
                                    <option value="7">July</option>
                                    <option value="8">August</option>
                                    <option value="9">September</option>
                                    <option value="10">October</option>
                                    <option value="11">November</option>
                                    <option value="12">December</option>
                                </select>
                            </div>
                        ) : (
                            <></>
                        )
                    )}
                    <div className="btn-group">
                        <NavLink to={`/${Labels.NEW_ENTITY_URL}`} className="btn btn-primary"><FiPlus style={{ height: '18px', width: '18px', margin: '0 6px 3px 0' }} />{Labels.ADD_NEW_ENTITY}</NavLink>
                    </div>
                </div>
            </div >
        </>
    )
}
