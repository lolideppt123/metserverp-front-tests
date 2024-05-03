import { Flex, Spin } from "antd";

export default function Fallback() {
    return (
        <div style={{ marginTop: '25%' }}>
            <Flex vertical>
                <Spin size='large' />
            </Flex>
        </div>
    )
}
