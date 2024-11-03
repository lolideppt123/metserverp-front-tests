import { lazy, Suspense } from 'react';
import Fallback from '../components/Fallback/Fallback';

import useAuth from '../hooks/useAuth';
import AuthRouter from '../router/AuthRouter';
const FspApp = lazy(() => import('./FspApp'))

import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';

export default function FspOs() {
    // Check here if user is logged in
    const user = useSelector(selectUser);
    // const { user, token } = useAuth();

    if (user) {
        return <MainApp />
    }
    else {
        return <AuthRouter />
    }
}


const MainApp = () => (

    <Suspense fallback={<Fallback />}>
        <FspApp />
    </Suspense>

)
