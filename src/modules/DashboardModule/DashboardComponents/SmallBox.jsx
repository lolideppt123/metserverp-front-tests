
import { Divider, Statistic } from 'antd';
import CountUp from 'react-countup';
import Spinner from '../../../components/Fallback/Spinner';

export default function SmallBox({ loading, data }) {
    const formatter = (value) => <CountUp
        style={
            {
                color: data?.title?.includes('Uncollected') ? 'red' : '#389e0d',
            }
        }
        end={value}
        decimals={2}
        prefix='&#x20B1;'
        useEasing={true}
    />;
    return (
        <div className="box box-sm">
            <div className="card text-center">
                <h6 className="card-header">{data?.title}</h6>
                {loading ? (
                    <Spinner />
                ) : (
                    <div className="card-body d-flex justify-content-evenly align-items-center">
                        <span className='text-center fs-md fw-semibold'>YTD</span>
                        <Divider
                            style={{
                                height: '100%',
                                padding: '15px 0',
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}
                            type='vertical'
                        />
                        <div className={`${data?.title?.includes('Uncollected') ? "unpaid" : "paid"}-status px-2 py-1 fs-md fw-semibold`}>
                            <Statistic value={data?.total_sales} formatter={formatter} valueStyle={{ fontSize: '14px', fontWeight: '600' }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
