import NavItem from "./NavItem";
import Accordion from "./Accordion";
import AccordionItem from "./AccordionItem";
import DropDownMenu from "../../components/DropDown/DropDownMenu";
import { FiHome, FiShoppingCart, FiFileText, FiList, FiFilePlus } from "react-icons/fi";
import { FaRegFolderOpen } from "react-icons/fa";

export default function NavBody({ expanded }) {
    return (
        <div className='nav-body'>
            <NavItem expanded={expanded} url={'/'} icon={<FiHome className='nav-link-icon' />} text={`Dasboard`} />

            {
                expanded ? (
                    <Accordion expanded={expanded} text={`Inventory`} icon={<FiList className='nav-link-icon' />}>
                        <AccordionItem url={'inventory/materials'} text={'Raw Material'} />
                        <AccordionItem url={'/inventory/products'} text={'Finished Product'} />
                    </Accordion>
                ) : (
                    <DropDownMenu expanded={expanded} mainicon={<FiList className='nav-link-icon' />} maintext={`Inventory`}>
                        <AccordionItem url={'inventory/materials'} text={'Raw Material'} />
                        <AccordionItem url={'/inventory/products'} text={'Finished Product'} />
                    </DropDownMenu>
                )
            }
            <NavItem expanded={expanded} url={'/sales'} icon={<FiShoppingCart className='nav-link-icon' />} text={`Sales`} />
            <NavItem expanded={expanded} url={'/salesorders'} icon={<FiFilePlus className='nav-link-icon' />} text={`Sales Order`} />
            {
                expanded ? (
                    <Accordion expanded={expanded} text={`Directory`} icon={<FaRegFolderOpen className='nav-link-icon' />}>
                        <AccordionItem url={'/materials'} text={'Materials'} />
                        <AccordionItem url={'/products'} text={'Products'} />
                        <AccordionItem url={'/suppliers'} text={'Suppliers'} />
                        <AccordionItem url={'/customers'} text={'Customers'} />
                    </Accordion>
                ) : (
                    <DropDownMenu expanded={expanded} mainicon={<FaRegFolderOpen className='nav-link-icon' />} maintext={`Directory`}>
                        <AccordionItem url={'/materials'} text={'Materials'} />
                        <AccordionItem url={'/products'} text={'Products'} />
                        <AccordionItem url={'/suppliers'} text={'Suppliers'} />
                        <AccordionItem url={'/customers'} text={'Customers'} />
                    </DropDownMenu>
                )
            }

            <hr style={{ margin: "0", marginTop: "16px" }} />
            <h6 className={`sidebar-heading d-flex justify-content-between align-items-center px-3 mb-1 text-muted text-uppercase ${expanded ? "mt-4" : "mt-2"}`}>
                <span className={`${expanded ? "" : "d-none"}`} style={{ fontSize: ".75rem" }}>Summary</span>
            </h6>
            <NavItem expanded={expanded} url={'/sales/sales-summary'} icon={<FiFileText className='nav-link-icon' />} text={`Sales Analysis`} />
            <NavItem expanded={expanded} url={'/inventory/inventory-summary'} icon={<FiFileText className='nav-link-icon' />} text={`Inventory Analysis`} />
        </div>
    )
}
