import React from 'react'

export default function MainContainer({ children }) {
    return (
        // <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4 mb-5">
        <div className='main-content-wrapper'>
            <main className="content-layout container-xxl">
                {children}
            </main >
        </div>

    )
}
