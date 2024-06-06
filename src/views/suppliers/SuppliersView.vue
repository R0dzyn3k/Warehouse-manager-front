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
      const suppliers = ref([]);
      const loading = ref(false);
      const error = ref(null);

      const columns = ref([
        { key: 'supplierId', label: 'ID' },
        { key: 'supplierName', label: 'Nazwa', to: '/suppliers', id: 'supplierId' },
        { key: 'contractName', label: 'Nazwa kontaktu' },
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
        suppliers: suppliers,
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
      <AddButton :url="'/suppliers/new'" />
    </div>
    <data-table :columns="columns" :rows="suppliers" :loading="loading" :error="error" />
  </div>
</template>
