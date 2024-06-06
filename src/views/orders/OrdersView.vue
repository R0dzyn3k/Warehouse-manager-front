<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import DataTable from '@/components/DataTable.vue';
  import AddButton from '../../components/AddButton.vue';

  export default {
    components: {
      AddButton,
      DataTable,
    },
    setup() {
      const orders = ref([]);
      const loading = ref(false);
      const error = ref(null);

      const columns = ref([
        { key: 'orderId', label: 'ID', to: '/orders', id: 'orderId' },
        { key: 'client.clientName', label: 'Klient', to: '/customers', id: 'client.clientId' },
        { key: 'totalPrice', label: 'Cena' },
        { key: 'orderDate', label: 'Data', date: true},
        { key: 'empty', label: '' },
      ]);

      const fetchOrders = async () => {
        loading.value = true;

        try {
          const response = await axios.get('/api/orders');
          orders.value = response.data;
        } catch (err) {
          console.error('Error:', err);
          if (err.response) {
            error.value = `Błąd serwera: ${err.response.status} - ${err.response.data}`;
          } else if (err.request) {
            error.value = 'Brak odpowiedzi z serwera. Sprawdź połączenie sieciowe.';
          } else {
            error.value = `Błąd: ${err.message}`;
          }
        } finally {
          loading.value = false;
        }
      };

      onMounted(() => {
        fetchOrders();
      });

      return {
        orders,
        columns,
        loading,
        error,
      };
    },
  };
</script>

<template>
  <div class="main-content">
    <div class="header">
      <h1>Zamówienia</h1>
      <AddButton :url="'/orders/new'" />
    </div>
    <data-table :columns="columns" :rows="orders" :loading="loading" :error="error" />
  </div>
</template>
