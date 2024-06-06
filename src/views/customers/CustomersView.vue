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
      const customers = ref([]);
      const loading = ref(false);
      const error = ref(null);

      const columns = ref([
        { key: 'clientId', label: 'ID' },
        { key: 'clientName', label: 'Nazwa', to: '/customers', id: 'clientId' },
        { key: 'contactName', label: 'Nazwa Kontaktu' },
        { key: 'contactPhone', label: 'Telefon' },
        { key: 'email', label: 'Email' },
        { key: 'empty', label: '' },
      ]);

      const fetchCustomers = async () => {
        loading.value = true;

        try {
          const response = await axios.get('/api/clients');
          customers.value = response.data;
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
        fetchCustomers();
      });

      return {
        customers: customers,
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
      <h1>Klienci</h1>
      <AddButton :url="'/customers/new'" />
    </div>
    <data-table :columns="columns" :rows="customers" :loading="loading" :error="error" />
  </div>
</template>
