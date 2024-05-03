import { NavLink } from 'react-router-dom';

import { FiX } from 'react-icons/fi';
import { Label } from 'recharts';


export default function AddFormPageHeader({ config }) {
    const { Labels } = config;
    return (
        <>
            {typeof (Labels) == "undefined" ? "No Data Yet. Spinner here" : (
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pb-4 mb-4 border-bottom">
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumb m-0 my-2">
                            <li className="breadcrumb-item"><NavLink to={`/${Labels.PAGE_ENTITY_URL}`}>{Labels.PAGE_ENTITY}</NavLink></li>
                            {/* {console.log(typeof(Labels.PAGE_EXTENSION) == 'undefined')} */}
                            <li className="breadcrumb-item active" aria-current="page">{Labels.ADD_NEW_ENTITY}</li>
                        </ol>
                    </nav>
                    <div className="btn-group">
                        <NavLink type='button' onClick={() => history.back()}><FiX style={{ height: '24px', width: '24px', margin: '0 6px 3px 0' }} /> </NavLink>
                    </div>
                </div>
            )}
        </>
    )
}
