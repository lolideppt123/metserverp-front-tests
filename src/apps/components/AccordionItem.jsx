import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { navbar, selectDrawerNavBar } from "../../features/drawer/drawerSlice";

export default function AccordionItem(props) {
    const navbarSelector = useSelector(selectDrawerNavBar);
    const dispatch = useDispatch();
    return (
        <li className="nav-item px-4">
            <NavLink to={props.url} onClick={() => dispatch(navbar(!navbarSelector))} className="nav-link">
                <span>{props.text}</span>
            </NavLink>
        </li>
    )
}
