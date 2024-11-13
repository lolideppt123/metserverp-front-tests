import React from 'react'
import CapitalizeFirstLetter from '../../../settings/CapitalizeFirstLetter';
import useAuth from '../../../hooks/useAuth';
import { FiMoreVertical } from 'react-icons/fi';
import { NavLink, useNavigate } from 'react-router-dom';
import { Dropdown, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../../../features/auth/authSlice';

export default function MobileNavFooter() {
    // const { user, logoutUser } = useAuth();

    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const items = [
        {
            key: '1',
            label: (
                <NavLink type='button' onClick={handleLogout} className="nav-link">Logout</NavLink>
            ),
        },
    ]
    return (
        <div className="nav-footer d-flex justify-content-center align-items-center border-top p-2 mb-2 transition-all">
            <img
                className={`overflow-hidden transition-all`}
                src={`https://ui-avatars.com/api/?name=${user?.first_name || "John"}+${user?.last_name || "Doe"}&background=e0cffc&color=3730a3&bold=true`}
                style={{ maxWidth: '2.5rem', maxHeight: '100%', minWidth: '30px', minHeight: '30px', borderRadius: '0.375rem', marginRight: '5px' }}
            />
            <div className={`d-flex justify-content-between align-items-center overflow-hidden transition-all`}>
                <div className="lh-1 p-1 text-truncate">
                    <h6 className="d-inline font-semibold mb-0">
                        <CapitalizeFirstLetter text={user.first_name} /> <CapitalizeFirstLetter text={user.last_name} />
                    </h6>
                    <br />
                    <span style={{ fontSize: '12px' }} className="text-xs text-gray-600">{user ? (user.email) : "yourmail@gmail.com"}</span>
                </div>
            </div>
            <Dropdown menu={{ items }} placement="topLeft" arrow trigger={['click']}>
                <NavLink className={`nav-link p-2`} style={{ marginLeft: 'auto' }}>
                    <FiMoreVertical style={{ fontSize: '24px', color: 'var(--bs-link-color)' }} />
                </NavLink>
            </Dropdown>
        </div>
    )
}
