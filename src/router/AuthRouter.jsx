import { Routes, Route, Navigate } from 'react-router-dom';

import Login from '../pages/authentication/BasicUser/Login';
import Register from '../pages/authentication/BasicUser/Register';
import NotFound from '../pages/NotFound';

export default function AuthRouter() {
    return (
        <Routes>
            <Route element={<Login />} path="/" />
            <Route element={<Login />} path="/login" />
            <Route element={<Register />} path="/signup" />
            <Route element={<Navigate to="/login" replace />} path="/logout" />
            <Route path="*" element={<NotFound />} />
        </Routes>
    )
}
