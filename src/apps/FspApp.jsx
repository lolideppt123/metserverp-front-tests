import { useEffect, useState } from 'react';

import NavBar from './components/NavBar';
import NavHead from './components/NavHead';
import NavBody from './components/NavBody';
import NavFooter from './components/NavFooter';

import MobileNavButton from './components/Mobile/MobileNavButton';
import MobileNavDrawer from './components/Mobile/MobileNavDrawer';
import MobileNavBar from './components/Mobile/MobileNavBar';
import MobileNavHead from './components/Mobile/MobileNavHead';
import MobileNavBody from './components/Mobile/MobileNavBody';

import MainContainer from './components/MainContainer';
import AppRouter from '../router/AppRouter';



export default function FspApp() {
    const [expanded, setExpanded] = useState(true);
    const [Drawer, setDrawer] = useState(false);
    // Check here if app is mobile
    useEffect(() => {
        const resizeW = () => {
            if (window.innerWidth <= 768) {
                setExpanded(false);
            }
        }
        window.addEventListener("resize", resizeW);
        return () => window.removeEventListener("resize", resizeW);
    }, [])
    return (
        <div className='primary-container-fsp mh-100'>
            {/* Browser */}
            <NavBar expanded={expanded}>
                <NavHead expanded={expanded} setExpanded={setExpanded} />
                <NavBody expanded={expanded} />
                <NavFooter expanded={expanded} />
            </NavBar>

            {/* Mobile */}
            <MobileNavButton setDrawer={setDrawer} />
            <MobileNavDrawer Drawer={Drawer} setDrawer={setDrawer}>
                <MobileNavBar>
                    <MobileNavHead />
                    <MobileNavBody setDrawer={setDrawer} />
                </MobileNavBar>
            </MobileNavDrawer>


            <MainContainer expanded={expanded}>
                <AppRouter />
            </MainContainer>
        </div>


    )
}
