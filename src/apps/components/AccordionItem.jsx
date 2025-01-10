import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { navbar } from "../../features/drawer/drawerSlice";

export default function AccordionItem(props) {
    const dispatch = useDispatch();
    return (
        <li className="nav-item px-4">
            <NavLink to={props.url} onClick={() => dispatch(navbar(false))} className="nav-link">
                <span>{props.text}</span>
            </NavLink>
        </li>
    )
}
