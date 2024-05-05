import React from 'react'

export default function MobileNavBar(props) {
    return (
        <nav id="topbarMenu" className="mobile-nav-bar">
            <ul className="nav d-flex flex-nowrap flex-column">
                {props.children}
            </ul>
        </nav>
    )
}
