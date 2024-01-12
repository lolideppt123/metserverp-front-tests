
export default function NavBar(props) {
    return (
        <>
            <nav id="sidebarMenu" className="sidebar-wrapper sidebar col-lg-2 d-md-block bg-white">
                <div className="position-sticky pt-2 sidebar-sticky">
                    <ul className="nav flex-column">
                        {props.children}
                    </ul>
                </div>
            </nav>
        </>
    )
}
