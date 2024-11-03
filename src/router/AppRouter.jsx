import { lazy, memo } from 'react'
import { useRoutes, Navigate } from 'react-router-dom';

const Dashboard = lazy(() => import('../pages/Dashboard'))
const NotFound = lazy(() => import('../pages/NotFound'))

const Products = lazy(() => import('../pages/products/Products'))
const EditProduct = lazy(() => import('../pages/products/EditProduct'))
const AddProduct = lazy(() => import('../pages/products/AddProduct'))

const Inventory = lazy(() => import('../pages/Inventory/Inventory'))
const InventoryHistory = lazy(() => import('../pages/Inventory/InventoryHistory'))
const AddInventory = lazy(() => import('../pages/Inventory/AddInventory'))
const EditInventory = lazy(() => import('../pages/Inventory/EditInventory'))
const InventorySummary = lazy(() => import('../pages/Inventory/InventorySummary'))

const MaterialInventory = lazy(() => import('../pages/MaterialInventory/MaterialInventory'))
const MaterialHistory = lazy(() => import('../pages/MaterialInventory/MaterialHistory'))
const AddMaterialInventory = lazy(() => import('../pages/MaterialInventory/AddMaterialInventory'))
const EditMaterialInventory = lazy(() => import('../pages/MaterialInventory/EditMaterialInventory'))

const Materials = lazy(() => import('../pages/RawMaterials/RawMaterials'))
const EditMaterial = lazy(() => import('../pages/RawMaterials/EditRawMaterials'))
const AddMaterials = lazy(() => import('../pages/RawMaterials/AddRawMaterials'))

const Sales = lazy(() => import('../pages/Sales/Sales'))
const SalesOrder = lazy(() => import('../pages/Sales/SalesOrder'))
const AddSales = lazy(() => import('../pages/Sales/AddSales'))
// const ViewSales = lazy(() => import('../pages/Sales/ViewSales'))
const EditSales = lazy(() => import('../pages/Sales/EditSales'))
const SalesSummary = lazy(() => import('../pages/Sales/SalesSummary'))

const Customer = lazy(() => import('../pages/Customer/Customer'))
const AddCustomer = lazy(() => import('../pages/Customer/AddCustomer'))
const EditCustomer = lazy(() => import('../pages/Customer/EditCustomer'))
const CustomerSummary = lazy(() => import('../pages/Customer/CustomerSummary'))

const Supplier = lazy(() => import('../pages/Supplier/Supplier'))
const AddSupplier = lazy(() => import('../pages/Supplier/AddSupplier'))
const EditSupplier = lazy(() => import('../pages/Supplier/EditSupplier'))

const Modal = lazy(() => import('../components/DatePicker/AntdDatePicker'))

const SalesDraft = lazy(() => import('../pages/Sales/SalesDraft'))

const AppRouter = () => {
    let element = useRoutes([
        {
            path: '/login',
            element: <Navigate to="/" />,
        },
        {
            path: '/',
            element: <Dashboard />
        },
        {
            path: '/products',
            element: <Products />
        },
        {
            path: '/products/:id',
            element: <EditProduct />
        },
        {
            path: '/products/add',
            element: <AddProduct />
        },
        {
            path: '/inventory/materials',
            element: <MaterialInventory />
        },
        {
            path: '/inventory/products',
            element: <Inventory />
        },
        {
            path: '/inventory/materials/add',
            element: <AddMaterialInventory />
        },
        {
            path: '/inventory/product/add',
            element: <AddInventory />
        },
        {
            path: '/inventory/materials/transaction/:id/edit',
            element: <EditMaterialInventory />
        },
        {
            path: '/inventory/products/transaction/:id/edit',
            element: <EditInventory />
        },
        {
            path: '/inventory/products/transaction/:product_pk/:product_name',
            element: <InventoryHistory />
        },
        {
            path: '/inventory/inventory-summary',
            element: <InventorySummary />
        },
        {
            path: '/materials',
            element: <Materials />
        },
        {
            path: '/materials/:id',
            element: <EditMaterial />
        },
        {
            path: '/materials/add',
            element: <AddMaterials />
        },
        {
            path: 'inventory/materials/transaction/:material_name',
            element: <MaterialHistory />
        },
        {
            path: '/sales',
            element: <Sales />
        },
        {
            path: '/sales-draft',
            element: <SalesDraft />
        },
        {
            path: '/salesorders',
            element: <SalesOrder />
        },
        {
            path: '/sales/add',
            element: <AddSales />
        },
        // {
        //     path: '/sales/transaction/:id/show',
        //     element: <ViewSales />
        // },
        {
            path: '/sales/transaction/:id/edit',
            element: <EditSales />
        },
        {
            path: '/sales/sales-summary',
            element: <SalesSummary />
        },
        {
            path: '/customers',
            element: <Customer />
        },
        {
            path: '/customers/add',
            element: <AddCustomer />
        },
        {
            path: '/customers/:id',
            element: <EditCustomer />
        },
        {
            path: '/customers/customer-summary',
            element: <CustomerSummary />
        },
        {
            path: '/suppliers',
            element: <Supplier />
        },
        {
            path: '/suppliers/add',
            element: <AddSupplier />
        },
        {
            path: '/suppliers/:id',
            element: <EditSupplier />
        },
        {
            path: '/modal',
            element: <Modal />
        },
        {
            path: '*',
            element: <NotFound />,
        },
    ])
    return (
        element
    )
}
export default memo(AppRouter)