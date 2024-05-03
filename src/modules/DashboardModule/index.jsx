import SmallBox from "./DashboardComponents/SmallBox";
import MidBox from "./DashboardComponents/MidBox";
import LargeBox from "./DashboardComponents/LargeBox";

export default function DashboardModule({ BoxSM, BoxMD, BoxLG, loading }) {
    return (
        <>
            {BoxSM?.map((item, index) => (
                <SmallBox key={index} data={item} loading={loading} />
            ))}
            {BoxMD?.map((item, index) => (
                <MidBox key={index} data={item} loading={loading} />
            ))}
            {BoxLG?.map((item, index) => (
                <LargeBox key={index} data={item} loading={false} />
            ))}
        </>
    )
}
