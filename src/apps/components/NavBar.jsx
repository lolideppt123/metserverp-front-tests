
export default function NavBar(props) {
    return (
        <nav id="sidebarMenu" className={`sidebar bg-white ${!props.expanded && "close"}`}>
            <ul className="nav d-flex flex-nowrap flex-column">
                {props.children}
            </ul>
        </nav>
    )
}
