import { NavLink } from 'react-router-dom';
import { Tooltip } from 'antd';

export default function NavItem(props) {
    return (
        <li className="nav-item">
            {props.expanded ? (
                <NavLink to={props.url} className={`d-flex justify-content-${props.expanded ? "start" : "center"} align-items-center nav-link`}>
                    {props.icon}
                    {props.expanded && (
                        <span className={`nav-link-text text-nowrap overflow-hidden ${props.expanded ? "" : "d-none"}`}>{props.text}</span>
                    )}
                </NavLink>
            ) : (
                <Tooltip title={props.text} placement="right">
                    <NavLink to={props.url} className={`d-flex justify-content-${props.expanded ? "start" : "center"} align-items-center nav-link`}>
                        {props.icon}
                    </NavLink>
                </Tooltip>
            )}
        </li>
    )
}
