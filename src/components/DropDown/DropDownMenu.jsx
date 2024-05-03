import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Tooltip } from 'antd';


export default function DropDownMenu(props) {
    const [open, setOpen] = useState(false);
    const iconRef = useRef();
    const menuRef = useRef();
    // console.log(url)

    useEffect(() => {
        let handler = (e) => {
            if (!iconRef.current.contains(e.target)) {
                setOpen(false);
            }
            // console.log(!iconRef.current.contains(e.target))
        }
        document.addEventListener("click", handler);
        return () => {
            document.removeEventListener("click", handler)
        }
    })

    return (

        <div className="menu-container position-relative" ref={iconRef}>
            <Tooltip title={props.maintext} placement="right">
                <NavLink className={`d-flex justify-content-center align-items-center nav-link`} onClick={() => setOpen(!open)}>
                    <span>{props.mainicon}</span>
                </NavLink>
            </Tooltip>
            <div className={`d-flex flex-column dropDownTableAction ${open ? "dropDownTableAction-open" : ""}`}
                ref={menuRef}
                style={{ width: props.width, top: props.top, left: props.left }}
            >
                <ul className='d-flex flex-column gap-2'>
                    {props.children}
                </ul>
            </div>
        </div>
    )
}

