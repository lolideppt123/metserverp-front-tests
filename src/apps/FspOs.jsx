import { lazy, Suspense } from 'react'

const FspApp = lazy(() => import('./FspApp'))

export default function FspOs() {
    // Check here if user is logged in
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
            <FspApp />
        </Suspense>
    )
}
