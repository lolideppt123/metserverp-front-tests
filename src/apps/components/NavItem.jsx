import { NavLink } from 'react-router-dom';

export default function NavItem(props) {
    return (
        <li className="nav-item">
            <NavLink to={props.url} className={'d-flex align-items-center nav-link'}>
                {props.icon}
                <span>{props.text}</span>
            </NavLink>
        </li>
    )
}
