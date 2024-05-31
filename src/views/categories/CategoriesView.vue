<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import DataTable from '@/components/DataTable.vue';

  export default {
    components: {
      DataTable
    },
    setup() {
      const categories = ref([]);
      const loading = ref(false);
      const error = ref(null);

      const columns = ref([
        { key: 'categoryId', label: 'ID' },
        { key: 'categoryName', label: 'Nazwa', to: '/categories', id: 'categoryId' },
        { key: 'empty', label: '' }
      ]);

      const fetchCategories = async () => {
        loading.value = true;

        try {
          const response = await axios.get('/api/categories');
          categories.value = response.data;
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
        fetchCategories();
      });

      return {
        categories,
        columns,
        loading,
        error
      };
    }
  };
</script>

<template>
  <div class="category">
    <h1>Kategorie</h1>
    <data-table :columns="columns" :rows="categories" :loading="loading" :error="error" />
  </div>
</template>

<style scoped>
  .category {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
</style>
