import { useState } from "react";
import { FiList, FiChevronDown } from "react-icons/fi";
import { NavLink } from "react-router-dom";



export default function Accordion(props) {

    const [accordionOpen, setAccordionOpen] = useState(false);
  return (
        <>
            <li className="nav-item">
                <NavLink className="d-flex align-items-center nav-link" onClick={() => setAccordionOpen(!accordionOpen)}>
                    <FiList className='nav-link-icon' />
                    <span className="flex-fill">{props.text}</span>
                    <FiChevronDown className='nav-link-icon' style={{transition: "all 0.2s linear", transform: accordionOpen ? "rotate(-180deg)" : "rotate(0)"}} />                 
                </NavLink>
            </li>
            <div className="d-flex flex-column">

            <li className="nav-item px-4" style={{ transition: "all 0.2s ease-in-out", opacity: accordionOpen ? "1" : "0", maxHeight: accordionOpen ? "100%" : "0", overflow: accordionOpen ? "visible" : "hidden"}}>
                {/* <NavLink to={'/inventory'} className="nav-link">Product Inventory</NavLink>
                <NavLink to={'/inventory'} className="nav-link">Product Inventory</NavLink>
                <NavLink to={'/inventory'} className="nav-link">Product Inventory</NavLink> */}
                {props.children}
            </li>
            </div>
                
                
        </>
  )
}
