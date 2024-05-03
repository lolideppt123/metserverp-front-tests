import { Divider, Spin } from 'antd';

export default function DefaultDashboard() {
    const smallBox = [
        'Sales with Invoice',
        'Sales without Invoice',
        'Sales Collected',
        'Sales Uncollected',
    ]
    const midBox = [
        'With Invoice',
        'Without Invoice',
        'Sales',
    ]
    const largeBox = [
        'Low Inventory Products',
        'Low Inventory Materials'
    ]
    return (
        <>
            {smallBox.map((item, index) => (
                <div key={`${item}.${index}`} className="box box-sm">
                    <div className="card text-center">
                        <h6 className="card-header">{item}</h6>
                        <div className="card-body d-flex justify-content-evenly align-items-center">
                            <span className='text-center fs-md fw-semibold'>YTD</span>
                            <Divider
                                style={{
                                    height: '100%',
                                    padding: '15px 0',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                                type='vertical' />
                            <div>
                                <Spin />
                            </div>
                        </div>
                    </div>
                </div>
            ))}
            {midBox.map((item, index) => (
                <div key={`${item}.${index}`} className="box box-mid">
                    <div className="card text-center">
                        <h6 className="card-header">{item}</h6>
                        <div className="card-body">
                            <Spin />
                        </div>
                    </div>
                </div>
            ))}
            {largeBox.map((item, index) => (
                <div key={`${item}.${index}`} className="box box-large">
                    <div className="card text-center">
                        <h6 className="card-header">{item}</h6>
                        <div className="card-body">
                            <Spin />
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
