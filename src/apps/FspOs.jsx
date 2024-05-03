import { lazy, Suspense } from 'react';
import Fallback from '../components/Fallback/Fallback';

import useAuth from '../hooks/useAuth';
import AuthRouter from '../router/AuthRouter';
const FspApp = lazy(() => import('./FspApp'))

import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';

export default function FspOs() {
    // Check here if user is logged in
    // const USER = useSelector(selectUser);
    const { user, token } = useAuth();
    return (
        <>
            {
                user ? (
                    <>
                        <MainApp />
                    </>
                ) : (
                    <AuthRouter />
                )
            }

        </>

    )
}


const MainApp = () => (
    <Suspense fallback={<Fallback />}>
        <FspApp />
    </Suspense>
)
