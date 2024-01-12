import React from 'react'

import NavBar from './components/NavBar';
import NavItem from './components/NavItem';
import HeaderContent from './components/HeaderContent';
import MainContainer from './components/MainContainer';
import Accordion from './components/Accordion';
import AccordionItem from './components/AccordionItem';

import AppRouter from '../router/AppRouter';

import { FiBox, FiHome, FiLayers, FiHeadphones, FiShoppingCart, FiFile, FiFileText, FiList } from "react-icons/fi";

export default function FspApp() {
    // Check here if app is mobile
    return (
        <div className='primary-container-fsp mh-100'>
            <HeaderContent />
            <NavBar>
                <NavItem url={'/'} icon={<FiHome className='nav-link-icon' />} text={`Dasboard`} />
                {/* <Accordion text={`Inventory`} /> */}
                <Accordion text={`Inventory`}>
                    <AccordionItem url={'inventory/materials'} text={'Raw Material'} />
                    <AccordionItem url={'/inventory/products'} text={'Finished Product'} />
                </Accordion>
                <NavItem url={'/sales'} icon={<FiShoppingCart className='nav-link-icon' />} text={`Sales`} />
                <hr style={{ margin: "0", marginTop: "16px" }} />
                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted text-uppercase">
                    <span style={{ fontSize: ".75rem" }}>Admin</span>
                </h6>
                <NavItem url={'/materials'} icon={<FiLayers className='nav-link-icon' />} text={`Materials`} />
                <NavItem url={'/products'} icon={<FiBox className='nav-link-icon' />} text={`Products`} />
                <NavItem url={'/suppliers'} icon={<FiFile className='nav-link-icon' />} text={`Suppliers`} />
                <NavItem url={'/customers'} icon={<FiHeadphones className='nav-link-icon' />} text={`Customers`} />
                <hr />
                <NavItem url={'/sales/sales-summary'} icon={<FiFileText className='nav-link-icon' />} text={`Sales Summary`} />
                <NavItem url={'/inventory/inventory-summary'} icon={<FiFileText className='nav-link-icon' />} text={`Inventory Summary`} />
            </NavBar>


            <MainContainer>
                <AppRouter />
            </MainContainer>
        </div>


    )
}
