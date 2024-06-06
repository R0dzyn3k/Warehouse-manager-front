<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import DataTable from '@/components/DataTable.vue';
  import AddIcon from '../../components/icons/AddIcon.vue';
  import AddButton from '../../components/AddButton.vue';

  export default {
    computed: {
      AddIcon() {
        return AddIcon
      }
    },
    components: {
      AddButton,
      DataTable
    },
    setup() {
      const categories = ref([]);
      const loading = ref(false);
      const error = ref(null);

      const columns = ref([
        { key: 'categoryId', label: 'ID' },
        { key: 'categoryName', label: 'Nazwa', to: '/categories', id: 'categoryId' },
        { key: 'productsCount', label: 'Produkty', to: '/category-products', id: 'categoryId' },
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
        error,
      };
    }
  };
</script>

<template>
  <div class="main-content">
    <div class="header">
      <h1>Kategorie</h1>
      <AddButton :url="'/categories/new'" />
    </div>
    <data-table :columns="columns" :rows="categories" :loading="loading" :error="error" />
  </div>
</template>

<style scoped lang="scss">

</style>
