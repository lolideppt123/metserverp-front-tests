import React, { useCallback, useEffect, useState } from 'react';

import NavBar from './components/NavBar';
import NavHead from './components/NavHead';
import NavBody from './components/NavBody';
import NavFooter from './components/NavFooter';

import MobileNavButton from './components/Mobile/MobileNavButton';
import MobileNavDrawer from './components/Mobile/MobileNavDrawer';
import MobileNavBar from './components/Mobile/MobileNavBar';
import MobileNavHead from './components/Mobile/MobileNavHead';
import MobileNavBody from './components/Mobile/MobileNavBody';
import MobileNavFooter from './components/Mobile/MobileNavFooter';

import MainContainer from './components/MainContainer';
import AppRouter from '../router/AppRouter';


export default function FspApp() {
    const [expanded, setExpanded] = useState(true);
    // const [Drawer, setDrawer] = useState(false);

    const handleResize = useCallback(() => {
        if (window.innerWidth <= 768) {
            setExpanded(false);
        }
        else if (window.innerWidth >= 1024) {
            setExpanded(true);
        }
    }, [])

    // Check here if app is mobile
    useEffect(() => {
        // const resizeW = () => {
        //     if (window.innerWidth <= 768) {
        //         setExpanded(false);
        //     }
        //     if (window.innerWidth >= 1024) {
        //         setExpanded(true);
        //     }
        // }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
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
            <MobileNavButton />
            <MobileNavDrawer >
                <MobileNavBar>
                    <MobileNavHead />
                    <MobileNavBody />
                    <MobileNavFooter />
                </MobileNavBar>
            </MobileNavDrawer>


            <MainContainer expanded={expanded}>
                <AppRouter />
            </MainContainer>
        </div>


    )
}
