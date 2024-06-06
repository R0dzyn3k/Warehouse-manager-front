<script>
  import { ref, onMounted, watch } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import DeleteButton from '../../components/DeleteButton.vue';
  import FormComponent from '../../components/FormComponent.vue';
  import FormSelect from '../../components/FormSelect.vue';
  import FormInput from '../../components/FormInput.vue';

  export default {
    name: 'DeliveryNew',
    components: { FormSelect, FormInput, FormComponent, DeleteButton },
    setup() {
      const delivery = ref({ supplierId: '', addressId: 0, products: [{ productId: '', quantity: '', price: '', errors: {} }] });
      const suppliersDictionary = ref([]);
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
          const response = await axios.get(`/api/deliveries/${id}`);
          delivery.value = response.data;
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

      const fetchSuppliers = async () => {
        loading.value = true;
        try {
          const response = await axios.get('/api/suppliers');
          suppliersDictionary.value = response.data.map(supplier => ({
            value: supplier.supplierId,
            label: supplier.supplierName,
            addressId: supplier.addressId,
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
        delivery.value.products.push({ productId: '', quantity: '', price: '', errors: {} });
      };

      const removeProduct = (index) => {
        delivery.value.products.splice(index, 1);
      };

      const updateAddressId = () => {
        const selectedSupplier = suppliersDictionary.value.find(supplier => supplier.value === delivery.value.supplierId);
        if (selectedSupplier) {
          delivery.value.addressId = selectedSupplier.addressId;
        }
      };

      watch(() => delivery.value.supplierId, updateAddressId);

      onMounted(() => {
        if (route.params.id) {
          isEditMode.value = true;
          fetchOrder(route.params.id);
        }
        fetchSuppliers();
        fetchProducts();
      });

      return {
        delivery,
        initialData,
        isEditMode,
        router,
        suppliersDictionary,
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
      <h1>{{ 'Dodaj dostawę' }}</h1>
      <DeleteButton
        v-if="isEditMode && delivery.orderId"
        :deleteUrl="`/api/orders/${delivery.orderId}`"
        redirect-url="/orders"
        message="Usuń"
      />
    </div>

    <FormComponent
      :initial-item="initialData"
      :is-edit-mode="isEditMode"
      :api-url="'/api/deliveries'"
      :item="delivery"
    >
      <template #form-fields="{ formRefs }">
        <div class="form-grid">
          <div class="full">
            <FormSelect placeholder="Wybierz dostawcę" label="Dostawca" field-id="supplierId" field-name="supplierId" v-model="delivery.supplierId" :errors="formRefs['supplierId']" required :options="suppliersDictionary" />
          </div>

          <div class="full">
            <div v-for="(product, index) in delivery.products" :key="index" class="product-form">
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
