import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";
import { NavLink } from "react-router-dom";

export default function Accordion({ expanded = true, icon, text, children }) {

    const [accordionOpen, setAccordionOpen] = useState(false);
    return (
        <>
            <li className="nav-item">
                <NavLink
                    className={`d-flex justify-content-${expanded ? "start" : "center"} align-items-center nav-link`}
                    onClick={() => setAccordionOpen(!accordionOpen)}
                    to={(e) => e.preventDefault()}
                >
                    {icon}
                    <span className={`nav-link-text text-nowrap overflow-hidden ${expanded ? "" : "d-none"}`}>{text}</span>
                    <FiChevronDown
                        className={`nav-link-icon ${accordionOpen ? "icon-rotate" : "icon-revert"} ${expanded ? "" : "d-none"}`}
                        style={{ marginLeft: 'auto' }}
                    />
                </NavLink>
            </li>
            <div className={`accordion-body ${accordionOpen ? "show" : ""}`}>
                <div className="accordion-content">
                    {children}
                </div>
            </div>
        </>
    )
}
