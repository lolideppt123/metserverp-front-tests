
export default function Navigation(props) {
    return (
        <>
            <nav id="sidebarMenu" className="sidebar-wrapper sidebar col-lg-2 d-md-block bg-white">
                <div className="position-sticky pt-3 sidebar-sticky">
                    <ul className="nav flex-column">
                        {/* <li className="nav-item">
                            <NavLink to={'/'} className={'nav-link active'}><FiHome className='nav-link-icon' />Dashboard</NavLink>
                        </li>

                        <li className="nav-item">
                            <NavLink to={'/inventory'} className={'nav-link'}><FiLayers className='nav-link-icon' />Inventory</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/sales'} className={'nav-link'}><FiShoppingCart className='nav-link-icon' />Sales</NavLink>
                        </li>
                        <hr />
                        <li className="nav-item">
                            <NavLink to={'/products'} className={'nav-link'}><FiBox className='nav-link-icon' />Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/supplier'} className={'nav-link'}><FiFile className='nav-link-icon' />Supplier</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={'/customer'} className={'nav-link'}><FiUsers className='nav-link-icon' />Customer</NavLink>
                        </li> */}
                        {props.children}
                    </ul>
                </div>
            </nav>
        </>
    )
}
