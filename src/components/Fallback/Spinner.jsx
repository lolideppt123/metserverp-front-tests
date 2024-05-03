import { Spin, Flex } from 'antd';

export default function Spinner() {
  return (
    <div className="py-5">
      <Flex vertical>
        <Spin />
      </Flex>
    </div>
  )
}
