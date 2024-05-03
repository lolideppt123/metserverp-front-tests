import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function Accordion(props) {

    const [accordionOpen, setAccordionOpen] = useState(false);
    return (
        <>
            <li className="nav-item">
                <NavLink
                    className={`d-flex justify-content-${props.expanded ? "start" : "center"} align-items-center nav-link`}
                    onClick={() => setAccordionOpen(!accordionOpen)}
                    to={(e) => e.pervent.default()}
                >
                    {props.icon}
                    <span className={`nav-link-text text-nowrap overflow-hidden ${props.expanded ? "" : "d-none"}`}>{props.text}</span>
                    <FiChevronDown
                        className={`nav-link-icon ${accordionOpen ? "icon-rotate" : "icon-revert"} ${props.expanded ? "" : "d-none"}`}
                        style={{ marginLeft: 'auto' }}
                    />
                </NavLink>
            </li>
            <div className={`accordion-body ${accordionOpen ? "show" : ""}`}>
                <div className="accordion-content">
                    {props.children}
                </div>
            </div>
        </>
    )
}
