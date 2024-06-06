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
      const products = ref([]);
      const loading = ref(false);
      const error = ref(null);

      const columns = ref([
        { key: 'productId', label: 'ID' },
        { key: 'productName', label: 'Nazwa', to: '/products', id: 'productId' },
        { key: 'categoryId', label: 'Id kategorii', to: '/categories', id: 'categoryId' },
        { key: 'price', label: 'Cena' },
        { key: 'stockQuantity', label: 'Na stanie' },
        { key: 'empty', label: '' },
      ]);

      const fetchProducts = async () => {
        loading.value = true;

        try {
          const response = await axios.get('/api/products');
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
      <h1>Produkty</h1>
      <AddButton :url="'/products/new'" />
    </div>
    <data-table :columns="columns" :rows="products" :loading="loading" :error="error" />
  </div>
</template>
