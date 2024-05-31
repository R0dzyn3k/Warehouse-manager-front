import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '../views/dashboard/DashboardView.vue';
import ProductsView from '../views/products/ProductsView.vue';
import CustomersView from '../views/customers/CustomersView.vue';
import OrdersView from '../views/orders/OrdersView.vue';
import CategoriesView from '../views/categories/CategoriesView.vue';
import CategoryEdit from '../views/categories/CategoryEdit.vue';

const routes = [
  { path: '/', name: 'Dashboard', component: DashboardView },
  { path: '/products', name: 'Products', component: ProductsView },
  { path: '/categories', name: 'Categories', component: CategoriesView },
  { path: '/categories/:id', name: 'category-edit', component: CategoryEdit },
  { path: '/categories/new', name: 'category-new', component: CategoryEdit },
  { path: '/orders', name: 'Orders', component: OrdersView },
  { path: '/customers', name: 'Customers', component: CustomersView },
  // { path: '/inventory', name: 'Inventory', component: () => import('../views/InventoryView.vue') },
  // { path: '/reports', name: 'Reports', component: () => import('../views/ReportsView.vue') },

];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
