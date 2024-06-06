<script>
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import DeleteButton from '../../components/DeleteButton.vue';
  import FormComponent from '../../components/FormComponent.vue';
  import FormSelect from '../../components/FormSelect.vue';
  import FormInput from '../../components/FormInput.vue';

  export default {
    name: 'OrderEdit',
    components: { FormSelect, FormInput, FormComponent, DeleteButton },
    setup() {
      const order = ref({ clientId: '', addressId: 0, products: [{ productId: '', quantity: '', price: '', errors: {} }] });
      const customersDictionary = ref([]);
      const productsDictionary = ref([]);
      const initialData = ref(null);
      const loading = ref(false);
      const error = ref(null);
      const route = useRoute();
      const router = useRouter();
      const isEditMode = ref(false);

      const fetchOrder = async (id) => {
        loading.value = true;

        try {
          const response = await axios.get(`/api/orders/${id}`);
          order.value = response.data;
          initialData.value = { ...response.data };
        } catch (err) {
          error.value = 'Nie udało się pobrać danych';
        } finally {
          loading.value = false;
        }
      };

      const fetchProducts = async () => {
        loading.value = true;

        try {
          const response = await axios.get('/api/products');
          productsDictionary.value = response.data.map(product => ({
            value: product.productId,
            label: product.productName,
          }));
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

      const fetchCustomers = async () => {
        loading.value = true;
        try {
          const response = await axios.get('/api/clients');
          customersDictionary.value = response.data.map(client => ({
            value: client.clientId,
            label: client.clientName,
            addressId: client.addressId,
          }));
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

      const addProduct = () => {
        order.value.products.push({ productId: '', quantity: '', price: '', errors: {} });
      };

      const removeProduct = (index) => {
        order.value.products.splice(index, 1);
      };

      const updateAddressId = () => {
        const selectedClient = customersDictionary.value.find(client => client.value === order.value.clientId);
        if (selectedClient) {
          order.value.addressId = selectedClient.addressId;
        }
      };

      watch(() => order.value.clientId, updateAddressId);

      onMounted(() => {
        if (route.params.id) {
          isEditMode.value = true;
          fetchOrder(route.params.id);
        }
        fetchCustomers();
        fetchProducts();
      });

      return {
        order,
        initialData,
        isEditMode,
        router,
        customersDictionary,
        productsDictionary,
        addProduct,
        removeProduct,
      };
    },
  };
</script>

<template>
  <div class="main-content">
    <div class="header">
      <h1>{{ 'Dodaj zamówienie' }}</h1>
      <DeleteButton
        v-if="isEditMode && order.orderId"
        :deleteUrl="`/api/orders/${order.orderId}`"
        redirect-url="/orders"
        message="Usuń"
      />
    </div>

    <FormComponent
      :initial-item="initialData"
      :is-edit-mode="isEditMode"
      :api-url="'/api/orders'"
      :item="order"
      :model-id="order.orderId"
    >
      <template #form-fields="{ formRefs }">
        <div class="form-grid">
          <div class="full">
            <FormSelect placeholder="Wybierz klienta" label="Klient" field-id="clientId" field-name="clientId" v-model="order.clientId" :errors="formRefs['clientId']" required :options="customersDictionary" />
          </div>

          <div class="full">
            <div v-for="(product, index) in order.products" :key="index" class="product-form">
              <FormSelect
                :options="productsDictionary"
                v-model="product.productId"
                placeholder="Wybierz produkt"
                :errors="formRefs[`productId[${index}].productId`]"
              />
              <FormInput
                type="number"
                v-model="product.quantity"
                :min="1"
                placeholder="Ilość"
                required
                :errors="formRefs[`quantity[${index}].quantity`]"
              />
              <FormInput
                type="number"
                v-model="product.price"
                :min="0"
                placeholder="cena"
                required
                :errors="formRefs[`price[${index}].price`]"
              />
              <button type="button" class="btn danger" @click="removeProduct(index)">Usuń</button>
            </div>
            <button type="button" class="btn primary" @click="addProduct">Dodaj produkt</button>
          </div>
        </div>
      </template>
    </FormComponent>
  </div>
</template>
