<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import DataTable from '../../components/DataTable.vue';

  export default {
    name: 'CategoryEdit',
    components: { DataTable },
    setup() {
      const category = ref({ categoryName: '' });
      const initialCategory = ref(null);
      const loading = ref(false);
      const error = ref(null);
      const route = useRoute();
      const router = useRouter();
      const isEditMode = ref(false);

      const columns = ref([
        { key: 'productId', label: 'ID' },
        { key: 'productName', label: 'Nazwa', to: '/products', id: 'productId' },
        { key: 'categoryId', label: 'Id kategorii', to: '/categories', id: 'categoryId' },
        { key: 'price', label: 'Cena' },
        { key: 'stockQuantity', label: 'Na stanie' },
        { key: 'empty', label: '' },
      ]);

      const fetchCategory = async (id) => {
        loading.value = true;
        try {
          const response = await axios.get(`/api/categories/${id}`);
          category.value = response.data;
          initialCategory.value = { ...response.data };
        } catch (err) {
          error.value = 'Nie udało się pobrać danych';
        } finally {
          loading.value = false;
        }
      };

      onMounted(() => {
        if (route.params.id) {
          isEditMode.value = true;
          fetchCategory(route.params.id);
        }
      });

      return {
        category,
        initialCategory,
        isEditMode,
        router,
        loading,
        error,
        columns,
      };
    },
  };
</script>

<template>
  <div class="main-content">
    <div class="header">
      <h1>Produkty kategorii "{{ category.categoryName }}"</h1>
    </div>
    <data-table :columns="columns" :rows="category.products" :loading="loading" :error="error" />
  </div>
</template>
