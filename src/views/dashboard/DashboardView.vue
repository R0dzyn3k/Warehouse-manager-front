<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import DataTable from '@/components/DataTable.vue';

  export default {
    components: {
      DataTable,
    },
    setup() {
      const products = ref([]);
      const loading = ref(false);
      const error = ref(null);

      const columns = ref([
        { key: 'productId', label: 'ID' },
        { key: 'productName', label: 'Nazwa', to: '/products', id: 'productId' },
        { key: 'stockQuantity', label: 'Na stanie' },
        { key: 'warningQuantity', label: 'Stan krytyczny' },
        { key: 'empty', label: '' },
      ]);

      const fetchProducts = async () => {
        loading.value = true;

        try {
          const response = await axios.get('/api/products', {
            params: {
              onlyWarningQuantities: true
            }}
          );
          products.value = response.data;
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
        fetchProducts();
      });

      return {
        products: products,
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
      <h1>Podgląd</h1>
    </div>

      <h2>Niskie staniy magazynowe</h2>
    <data-table :columns="columns" :rows="products" :loading="loading" :error="error" />
  </div>
</template>
