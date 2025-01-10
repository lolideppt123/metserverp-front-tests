import { NavLink } from 'react-router-dom';
import { Tooltip } from 'antd';
import { useDispatch } from 'react-redux';
import { navbar } from '../../features/drawer/drawerSlice';

export default function NavItem({ expanded = true, icon, text, url }) {
    const dispatch = useDispatch();
    return (
        <li className="nav-item">
            {expanded ? (
                <NavLink
                    className={`d-flex justify-content-${expanded ? "start" : "center"} align-items-center nav-link`}
                    onClick={() => dispatch(navbar(false))}
                    to={url}
                >
                    {icon}
                    {expanded && (
                        <span className={`nav-link-text text-nowrap overflow-hidden ${expanded ? "" : "d-none"}`}>{text}</span>
                    )}
                </NavLink>
            ) : (
                <Tooltip title={text} placement="right">
                    <NavLink to={url} className={`d-flex justify-content-${expanded ? "start" : "center"} align-items-center nav-link`}>
                        {icon}
                    </NavLink>
                </Tooltip>
            )}
        </li>
    )
}
