import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/dashboard/DashboardView.vue';
import ProductsView from '../views/products/ProductsView.vue';
import CustomersView from '../views/customers/CustomersView.vue';
import OrdersView from '../views/orders/OrdersView.vue';
import CategoriesView from '../views/categories/CategoriesView.vue';
import CategoryEdit from '../views/categories/CategoryEdit.vue';
import SuppliersView from '../views/suppliers/SuppliersView.vue';
import SupplierEdit from '../views/suppliers/SupplierEdit.vue';
import CustomerEdit from '../views/customers/CustomerEdit.vue';
import ProductEdit from '../views/products/ProductEdit.vue';
import OrderNew from '../views/orders/OrderNew.vue';
import OrderEdit from '../views/orders/OrderEdit.vue';
import CategoryProduct from '../views/categories/CategoryProduct.vue';
import DeliveriesView from '../views/deliveries/DeliveriesView.vue';
import DeliveryNew from '../views/deliveries/DeliveryNew.vue';
import DeliveryEdit from '../views/deliveries/DeliveryEdit.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: DashboardView },
  { path: '/products', name: 'products', component: ProductsView },
  { path: '/products/:id', name: 'product-edit', component: ProductEdit },
  { path: '/products/new', name: 'product-new', component: ProductEdit },
  { path: '/categories', name: 'categories', component: CategoriesView },
  { path: '/categories/:id', name: 'category-edit', component: CategoryEdit },
  { path: '/categories/new', name: 'category-new', component: CategoryEdit },
  { path: '/category-products/:id', name: 'category-products', component: CategoryProduct },
  { path: '/suppliers', name: 'suppliers', component: SuppliersView },
  { path: '/suppliers/:id', name: 'supplier-edit', component: SupplierEdit },
  { path: '/suppliers/new', name: 'supplier-new', component: SupplierEdit },
  { path: '/customers', name: 'customers', component: CustomersView },
  { path: '/customers/:id', name: 'customer-edit', component: CustomerEdit },
  { path: '/customers/new', name: 'customer-new', component: CustomerEdit },
  { path: '/orders', name: 'orders', component: OrdersView },
  { path: '/orders/new', name: 'order-new', component: OrderNew },
  { path: '/orders/:id', name: 'order-edit', component: OrderEdit },
  { path: '/deliveries', name: 'deliveries', component: DeliveriesView },
  { path: '/deliveries/new', name: 'delivery-new', component: DeliveryNew },
  { path: '/deliveries/:id', name: 'delivery-edit', component: DeliveryEdit },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
