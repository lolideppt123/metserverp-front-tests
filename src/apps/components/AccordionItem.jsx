import { NavLink } from "react-router-dom";

export default function AccordionItem(props) {
    return (
        // <li className="nav-item px-4" style={{ transition: "all 0.2s ease", opacity: accordionOpen ? "1" : "0", maxHeight: accordionOpen ? "100%" : "0", overflow: accordionOpen ? "visible" : "hidden" }}>
        <li className="nav-item px-4">
            <NavLink to={props.url} className="nav-link">
                <span>{props.text}</span>
            </NavLink>
        </li>
    )
}
