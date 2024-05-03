import './style/app.css';

import { Suspense, lazy } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SnackbarProvider } from 'notistack';
import { ConfigProvider } from 'antd';
import Fallback from './components/Fallback/Fallback';

import { store, persistor } from './app/store';
import { Provider } from 'react-redux';

const FspOs = lazy(() => import('./apps/FspOs'))


// For persist state
import { PersistGate } from 'redux-persist/integration/react';

function RootApp() {


    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <AuthProvider>
                        <SnackbarProvider maxsnack={1} preventduplicate>
                            <ConfigProvider theme={{
                                token: {
                                    colorPrimary: '#470ba9'
                                }
                            }} >
                                <Suspense fallback={<Fallback />}>
                                    <FspOs />
                                </Suspense>
                            </ConfigProvider>
                        </SnackbarProvider>
                    </AuthProvider>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    )
}

export default RootApp
