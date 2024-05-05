import { FiMenu } from "react-icons/fi";

export default function MobileNavButton(props) {
    return (
        <div className="mobile-nav-button">
            <button
                onClick={() => props.setDrawer(prev => !prev)}
                className="sideBar-btn"
            >
                <FiMenu style={{ fontSize: '24px', color: 'var(--bs-indigo-500)' }} />
            </button>
        </div>
    )
}
