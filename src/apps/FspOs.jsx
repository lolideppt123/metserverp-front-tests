import { lazy, Suspense } from 'react';
import { Spin, Flex } from 'antd';

const FspApp = lazy(() => import('./FspApp'))

export default function FspOs() {
    // Check here if user is logged in
    return (
        <Suspense fallback={
            // <div className='d-flex justify-content-center align-items-center'>
            <div style={{ marginTop: '25%' }}>
                <Flex vertical>
                    <Spin size='large' />
                </Flex>
            </div>
        }>
            <FspApp />
        </Suspense>
    )
}
