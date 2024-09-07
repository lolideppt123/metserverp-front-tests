import { Drawer } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { selectDrawerNavBar, navbar } from "../../../features/drawer/drawerSlice";

export default function MobileNavDrawer(props) {
    const dispatch = useDispatch();
    const navbarSelector = useSelector(selectDrawerNavBar);

    return (
        <div className="mobile-nav-wrapper">
            <Drawer
                placement={'left'}
                closable={false}
                onClose={() => dispatch(navbar(!navbarSelector))}
                open={navbarSelector}
                key={'left'}
                width={250}
                destroyOnClose={true}
                mask={true}
            >
                {props.children}
            </Drawer>
        </div>

    )
}