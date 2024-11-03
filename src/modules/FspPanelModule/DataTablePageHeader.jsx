import { FiPlus } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import DropDownMenu from '../../components/DropDown/DropDownMenu';
import DropDownItem from '../../components/DropDown/DropDownItem';
import CSVExport from '../../components/Exports/CSVExport';

import SalesYearMonthFilter from '../../components/Filter/SalesYearMonthFilter';
import SalesYearFilter from '../../components/Filter/SalesYearFilter';

export default function DataTablePageHeader({ Labels, type = null, salesFilter = null, setSalesFilter, data = [] }) {
    const navigate = useNavigate();
    return (
        <>
            <div className="breadcrumb-container col-md-9 mb-3">
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb m-0 my-2">
                        <li className="breadcrumb-item"><a href="">{Labels.BASE_ENTITY}</a></li>
                        <li className="breadcrumb-item active" aria-current="page">{Labels.TABLE_TITLE}</li>
                    </ol>
                </nav>
            </div>

            <div className="header-container d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
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
                        <div className="col-md-4">
                            <SalesYearMonthFilter setSalesFilter={setSalesFilter} />
                            {/* <SalesYearFilter setSalesFilter={setSalesFilter} /> */}
                        </div>
                    ) : (
                        <div className="col-md-8 ms-2 page-header-title-wrapper">
                            <h3 style={{ fontSize: '24px' }} className='page-header-title-text'>{Labels.TABLE_TITLE} List</h3>
                        </div>
                    )
                )}
                <div className="btn-toolbar page-header-action-wrapper">
                    <div className="d-grid gap-2 d-md-block">
                        {type === 'sales' && data?.length > 0 && (
                            <div className="btn btn-secondary me-2">
                                <CSVExport data={data} year={salesFilter} />
                            </div>
                        )}
                        <button type='button' onClick={() => navigate(`/${Labels.NEW_ENTITY_URL}`)} className="btn btn-primary page-header-action-button">
                            <FiPlus className='header-action-button-icon icon' />
                            <span className='button-text'>{Labels.ADD_NEW_ENTITY}</span>
                        </button>
                    </div>
                </div>
            </div >
        </>
    )
}
