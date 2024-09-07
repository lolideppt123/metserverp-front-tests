import { FiMenu } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import { selectDrawerNavBar, navbar } from "../../../features/drawer/drawerSlice";

export default function MobileNavButton(props) {
    const navbarSelector = useSelector(selectDrawerNavBar);
    const dispatch = useDispatch();
    return (
        <div className="mobile-nav-button">
            <button
                onClick={() => dispatch(navbar(!navbarSelector))}
                className="sideBar-btn"
            >
                <FiMenu style={{ fontSize: '24px', color: 'var(--bs-indigo-500)' }} />
            </button>
        </div>
    )
}
