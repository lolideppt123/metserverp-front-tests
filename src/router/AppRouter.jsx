import { lazy, memo } from 'react'
import { useRoutes, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';

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
            element: (
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            )
        },
        {
            path: '/products',
            element: (
                <ProtectedRoute>
                    <Products />
                </ProtectedRoute>
            )
        },
        {
            path: '/products/:id',
            element: (
                <ProtectedRoute>
                    <EditProduct />
                </ProtectedRoute>
            )
        },
        {
            path: '/products/add',
            element: (
                <ProtectedRoute>
                    <AddProduct />
                </ProtectedRoute>
            )
        },
        {
            path: '/inventory/materials',
            element: (
                <ProtectedRoute>
                    <MaterialInventory />
                </ProtectedRoute>
            )
        },
        {
            path: '/inventory/products',
            element: (
                <ProtectedRoute>
                    <Inventory />
                </ProtectedRoute>
            )
        },
        {
            path: '/inventory/materials/add',
            element: (
                <ProtectedRoute>
                    <AddMaterialInventory />
                </ProtectedRoute>
            )
        },
        {
            path: '/inventory/product/add',
            element: (
                <ProtectedRoute>
                    <AddInventory />
                </ProtectedRoute>
            )
        },
        {
            path: '/inventory/materials/transaction/:id/edit',
            element: (
                <ProtectedRoute>
                    <EditMaterialInventory />
                </ProtectedRoute>
            )
        },
        {
            path: '/inventory/products/transaction/:id/edit',
            element: (
                <ProtectedRoute>
                    <EditInventory />
                </ProtectedRoute>
            )
        },
        {
            path: '/inventory/products/transaction/:product_pk/:product_name',
            element: (
                <ProtectedRoute>
                    <InventoryHistory />
                </ProtectedRoute>
            )
        },
        {
            path: '/inventory/inventory-summary',
            element: (
                <ProtectedRoute>
                    <InventorySummary />
                </ProtectedRoute>
            )
        },
        {
            path: '/materials',
            element: (
                <ProtectedRoute>
                    <Materials />
                </ProtectedRoute>
            )
        },
        {
            path: '/materials/:id',
            element: (
                <ProtectedRoute>
                    <EditMaterial />
                </ProtectedRoute>
            )
        },
        {
            path: '/materials/add',
            element: (
                <ProtectedRoute>
                    <AddMaterials />
                </ProtectedRoute>
            )
        },
        {
            path: 'inventory/materials/transaction/:material_pk/:material_name',
            element: (
                <ProtectedRoute>
                    <MaterialHistory />
                </ProtectedRoute>
            )
        },
        {
            path: '/sales',
            element: (
                <ProtectedRoute>
                    <Sales />
                </ProtectedRoute>
            )
        },
        {
            path: '/sales-draft',
            element: (
                <ProtectedRoute>
                    <SalesDraft />
                </ProtectedRoute>
            )
        },
        {
            path: '/salesorders',
            element: (
                <ProtectedRoute>
                    <SalesOrder />
                </ProtectedRoute>
            )
        },
        {
            path: '/sales/add',
            element: (
                <ProtectedRoute>
                    <AddSales />
                </ProtectedRoute>
            )
        },
        {
            path: '/sales/transaction/:id/edit',
            element: (
                <ProtectedRoute>
                    <EditSales />
                </ProtectedRoute>
            )
        },
        {
            path: '/sales/sales-summary',
            element: (
                <ProtectedRoute>
                    <SalesSummary />
                </ProtectedRoute>
            )
        },
        {
            path: '/customers',
            element: (
                <ProtectedRoute>
                    <Customer />
                </ProtectedRoute>
            )
        },
        {
            path: '/customers/add',
            element: (
                <ProtectedRoute>
                    <AddCustomer />
                </ProtectedRoute>
            )
        },
        {
            path: '/customers/:id',
            element: (
                <ProtectedRoute>
                    <EditCustomer />
                </ProtectedRoute>
            )
        },
        {
            path: '/customers/customer-summary',
            element: (
                <ProtectedRoute>
                    <CustomerSummary />
                </ProtectedRoute>
            )
        },
        {
            path: '/suppliers',
            element: (
                <ProtectedRoute>
                    <Supplier />
                </ProtectedRoute>
            )
        },
        {
            path: '/suppliers/add',
            element: (
                <ProtectedRoute>
                    <AddSupplier />
                </ProtectedRoute>
            )
        },
        {
            path: '/suppliers/:id',
            element: (
                <ProtectedRoute>
                    <EditSupplier />
                </ProtectedRoute>
            )
        },
        {
            path: '/modal',
            element: (
                <ProtectedRoute>
                    <Modal />
                </ProtectedRoute>
            )
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