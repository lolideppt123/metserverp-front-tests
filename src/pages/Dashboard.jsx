import { useEffect, useState } from "react";
import useAxiosFunction from "../hooks/useAxiosFunction";
import DashboardModule from "../modules/DashboardModule";
import DefaultDashboard from "../modules/DashboardModule/DashboardComponents/DefaultDashboard";

import { useGetAllUCategoryQuery, useGetAllUnitsQuery } from "../features/utils/unitsApiSlice";
import useDenomination from "../hooks/useDenomination";

export default function Dashboard() {
    const {
        loading: dashboardLoad,
        response: dashboard,
        setResponse: setdashboard,
        error: dashboardErr,
        axiosFetch: dashboardDataFetch,
    } = useAxiosFunction();

    const { saveGlobalDenomination } = useDenomination()
    const { data: unit, isLoading: unitLoad, isError: isUnitErr, error: unitErr, isSuccess: unitSucc } = useGetAllUnitsQuery();
    const { data: category, isLoading: categoryLoad, isError: isCategoryErr, error: categoryErr, isSuccess: categorySucc } = useGetAllUCategoryQuery();

    const [BoxSM, setBoxSM] = useState(null);
    const [BoxMD, setBoxMD] = useState(null);
    const [BoxLG, setBoxLG] = useState(null);
    useEffect(() => {
        // Needs to wait for first request so refresh token won't double send
        const getData = async () => {
            await dashboardDataFetch({
                url: "dashboard/",
                method: "get",
            });
        };
        getData();
    }, []);

    useEffect(() => {
        // if (dashboard) {
        //     console.log(dashboard);
        // }
        dashboard?.map((item) => {
            item.small_box && setBoxSM(item.small_box);
            item.mid_box && setBoxMD(item.mid_box);
            item.large_box && setBoxLG(item.large_box);
            // console.log(item);
        });
    }, [dashboard]);

    useEffect(() => {
        if (unitSucc && categorySucc) {
            saveGlobalDenomination({ units: unit, category: category })
        }
    }, [unit, category])

    return (
        <div className="dashboard">
            {dashboardLoad ? (
                <DefaultDashboard />
            ) : (
                <DashboardModule
                    BoxSM={BoxSM}
                    BoxMD={BoxMD}
                    BoxLG={BoxLG}
                    loading={dashboardLoad}
                />
            )}
        </div>
    );
}
