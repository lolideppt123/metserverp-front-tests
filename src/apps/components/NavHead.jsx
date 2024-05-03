import { FiChevronLeft } from "react-icons/fi"
export default function NavHead({ expanded, setExpanded }) {
    return (
        <div className={`nav-head p-3 pb-2 d-flex justify-content-${expanded ? "between" : "center"} align-items-center mb-auto`}>
            <img
                src="https://img.logoipsum.com/243.svg"
                className={`overflow-hidden transition-all`}
                alt=""
                style={{
                    maxWidth: `${expanded ? "8rem" : "0"}`
                }}
            />
            <button
                onClick={() => setExpanded((curr) => !curr)}
                className='sideBar-btn'
            >
                <FiChevronLeft className={!expanded ? "icon-rotate" : "icon-revert"} style={{ height: '100%', width: '100%', color: 'var(--bs-indigo-500)' }} />
            </button>
        </div>
    )
}
