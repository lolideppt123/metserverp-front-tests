import './style/app.css';

import { Suspense, lazy } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import { ConfigProvider, Spin, Flex } from 'antd';

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
                    <Suspense fallback={
                        // <div className='d-flex justify-content-center align-items-center'>
                        <div style={{ marginTop: '25%' }}>
                            <Flex vertical>
                                <Spin size='large' />
                            </Flex>
                        </div>
                    }>
                        <FspOs />
                    </Suspense>
                </ConfigProvider>
            </SnackbarProvider>
        </BrowserRouter>
    )
}

export default RootApp
