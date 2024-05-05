import { Drawer } from "antd";

export default function MobileNavDrawer(props) {

    const onClose = () => {
        props.setDrawer(false);
    };
    return (
        <div className="mobile-nav-wrapper">
            <Drawer
                placement={'left'}
                closable={false}
                onClose={onClose}
                open={props.Drawer}
                key={'left'}
                width={250}
            >
                {props.children}
            </Drawer>
        </div>

    )
}