import CapitalizeFirstLetter from '../../settings/CapitalizeFirstLetter';
import { Spin } from 'antd';
import { FiMoreVertical } from 'react-icons/fi';
import { Dropdown, Button } from 'antd';
import { NavLink, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, logout } from '../../features/auth/authSlice';

export default function NavFooter({ expanded }) {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    const items = [
        {
            key: '1',
            label: (
                <NavLink type='button' onClick={handleLogout} className="nav-link">Logout</NavLink>
            ),
        },
    ];

    return (
        <div className="nav-footer d-flex justify-content-center align-items-center border-top p-2 mb-1 transition-all">
            {
                !user ? (
                    <Spin />
                ) : (
                    <>
                        {expanded ? (
                            <>
                                <img
                                    className={`overflow-hidden transition-all`}
                                    src={`https://ui-avatars.com/api/?name=${user?.first_name}+${user?.last_name}&background=e0cffc&color=3730a3&bold=true`}
                                    style={{ maxWidth: '2.5rem', maxHeight: '100%', minWidth: '30px', minHeight: '30px', borderRadius: '0.375rem', marginRight: '5px' }}
                                />
                                <div className={`d-flex justify-content-between align-items-center overflow-hidden transition-all ${expanded ? "" : "d-none"}`}>
                                    <div className="lh-1 p-1 text-truncate">
                                        <h6 className="d-inline font-semibold mb-0">
                                            <CapitalizeFirstLetter text={user.first_name} /> <CapitalizeFirstLetter text={user.last_name} />
                                        </h6>
                                        <br />
                                        <span style={{ fontSize: '12px' }} className="text-xs text-gray-600">{user ? (user.email) : "johndoe@gmail.com"}</span>
                                    </div>
                                </div>
                                <Dropdown menu={{ items }} placement="topLeft" arrow trigger={['click']}>
                                    <NavLink className={`nav-link p-2 ${expanded ? "" : "d-none"}`} style={{ marginLeft: 'auto' }}>
                                        <FiMoreVertical style={{ fontSize: '24px', color: 'var(--bs-link-color)' }} />
                                    </NavLink>
                                </Dropdown>
                            </>
                        ) : (
                            <Dropdown menu={{ items }} placement="topLeft" arrow trigger={['click']}>
                                <img
                                    className={`overflow-hidden transition-all`}
                                    src={`https://ui-avatars.com/api/?name=${user?.first_name}+${user?.last_name}&background=e0cffc&color=3730a3&bold=true`}
                                    style={{ maxWidth: '2.5rem', maxHeight: '100%', borderRadius: '0.375rem', marginRight: '0', cursor: 'pointer' }}
                                />
                            </Dropdown>
                        )}
                    </>
                )
            }
        </div>
    )
}
