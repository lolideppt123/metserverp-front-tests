import NavItem from "../NavItem";
import Accordion from "../Accordion";
import AccordionItem from "../AccordionItem";
import { FiHome, FiShoppingCart, FiFileText, FiList, FiFilePlus } from "react-icons/fi";
import { FaRegFolderOpen } from "react-icons/fa";


export default function MobileNavBody({ setDrawer }) {
    return (
        <div className="mobile-nav-body ms-2">
            <div className="mobile-nav-body-wrapper">
                <NavItem url={'/'} icon={<FiHome className='nav-link-icon' />} text={`Dasboard`} />
                <Accordion text={`Inventory`} icon={<FiList className='nav-link-icon' />}>
                    <AccordionItem url={'inventory/materials'} text={'Raw Material'} />
                    <AccordionItem url={'/inventory/products'} text={'Finished Product'} />
                </Accordion>
                <NavItem url={'/sales'} icon={<FiShoppingCart className='nav-link-icon' />} text={`Sales`} />
                <NavItem url={'/salesorders'} icon={<FiFilePlus className='nav-link-icon' />} text={`Sales Order`} />
                <Accordion text={`Directory`} icon={<FaRegFolderOpen className='nav-link-icon' />}>
                    <AccordionItem url={'/materials'} text={'Materials'} />
                    <AccordionItem url={'/products'} text={'Products'} />
                    <AccordionItem url={'/suppliers'} text={'Suppliers'} />
                    <AccordionItem url={'/customers'} text={'Customers'} />
                </Accordion>
                <hr style={{ margin: "0", marginTop: "16px" }} />
                <h6 className={`sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1 text-muted text-uppercase mt-4`}>
                    <span style={{ fontSize: ".75rem" }}>Summary</span>
                </h6>
                <NavItem url={'/sales/sales-summary'} icon={<FiFileText className='nav-link-icon' />} text={`Sales Analysis`} />
                <NavItem url={'/inventory/inventory-summary'} icon={<FiFileText className='nav-link-icon' />} text={`Inventory Analysis`} />
                {/* <NavItem url={'/inventory/inventory-summary'} icon={<FiFileText className='nav-link-icon' />} text={`Customer Stats`} /> */}
            </div>
        </div>
    )
}
