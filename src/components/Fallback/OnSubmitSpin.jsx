import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export default function OnSubmitSpin({ spincolor }) {
    return (
        <Spin
            indicator={
                <LoadingOutlined
                    style={{
                        fontSize: 18,
                        color: spincolor ? spincolor : 'var(--bs-indigo-700)',
                        margin: '0 8px 3px 0'
                    }}
                    spin
                />
            }
        />
    )
}
