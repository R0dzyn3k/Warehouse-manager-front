<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import DataTable from '@/components/DataTable.vue';

  export default {
    components: {
      DataTable,
    },
    setup() {
      const suppliers = ref([]);
      const loading = ref(false);
      const error = ref(null);

      const columns = ref([
        { key: 'supplierId', label: 'ID' },
        { key: 'supplierName', label: 'Nazwa', to: '/suppliers', id: 'supplierId' },
        { key: 'contractName', label: 'Umowa' },
        { key: 'contactPhone', label: 'Telefon' },
        { key: 'empty', label: '' },
      ]);

      const fetchSuppliers = async () => {
        loading.value = true;

        try {
          const response = await axios.get('/api/suppliers');
          suppliers.value = response.data;
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
        fetchSuppliers();
      });

      return {
        categories: suppliers,
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
      <h1>Dostawcy</h1>
      <button class="btn primary" @click="navigateToNewCategory">Utwórz</button>
    </div>
    <data-table :columns="columns" :rows="categories" :loading="loading" :error="error" />
  </div>
</template>
