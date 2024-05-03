
export default function MainContainer({ children, expanded }) {
    return (
        <div className={`main-content-wrapper${expanded ? "" : "-close"}`}>
            <main className="content-layout container-xxl">
                {children}
            </main >
        </div>

    )
}
