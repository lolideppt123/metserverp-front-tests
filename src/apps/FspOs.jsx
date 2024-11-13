import { lazy, Suspense, useEffect } from 'react';
import Fallback from '../components/Fallback/Fallback';

import AuthRouter from '../router/AuthRouter';
const FspApp = lazy(() => import('./FspApp'))

import { useSelector } from 'react-redux';
import { selectUser } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import GlobalSnackbar from './components/GlobalSnackbar';

export default function FspOs() {
    // Check here if user is logged in
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user) {
            navigate('/login', {replace: true});
        }
    }, [user, navigate])

    return user ? <MainApp /> : <AuthRouter />
}


const MainApp = () => (

    <Suspense fallback={<Fallback />}>
        <FspApp />
        {/* <GlobalSnackbar /> */}
    </Suspense>

)
