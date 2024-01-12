import './style/app.css';

import { Suspense, lazy } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ConfigProvider } from 'antd';

const FspOs = lazy(() => import('./apps/FspOs'))


function RootApp() {


    return (
        <BrowserRouter>
            <SnackbarProvider>
                <ConfigProvider theme={{
                    token: {
                        colorPrimary: '#470ba9'
                    }
                }} >
                    <Suspense fallback={<h1>Loading...</h1>}>
                        <FspOs />
                    </Suspense>
                </ConfigProvider>
            </SnackbarProvider>
        </BrowserRouter>
    )
}

export default RootApp
