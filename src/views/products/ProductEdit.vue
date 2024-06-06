<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import FormInput from '../../components/FormInput.vue';
  import DeleteButton from '../../components/DeleteButton.vue';
  import FormComponent from '../../components/FormComponent.vue';
  import FormTextArea from '../../components/FormTextArea.vue';
  import FormSelect from '../../components/FormSelect.vue';

  export default {
    name: 'ProductEdit',
    components: { FormSelect, FormTextArea, FormComponent, DeleteButton, FormInput },
    setup() {
      const product = ref({ productName: '', description: '', price: 0, categoryId: 0, stockQuantity: 0, warningQuantity: 0 });
      const categoriesDictionary = ref([]);
      const initialData = ref(null);
      const loading = ref(false);
      const error = ref(null);
      const route = useRoute();
      const router = useRouter();
      const isEditMode = ref(false);

      const fetchProduct = async (id) => {
        loading.value = true;

        try {
          const customerResponse = await axios.get(`/api/products/${id}`);
          const categoryResponse = await axios.get(`/api/categories/${customerResponse.data.categoryId}`);

          product.value = {
            ...customerResponse.data,
            ...categoryResponse.data,
          };

          initialData.value = { ...customerResponse.data };
        } catch (err) {
          error.value = 'Nie udało się pobrać danych';
        } finally {
          loading.value = false;
        }
      };

      const fetchCategories = async () => {
        loading.value = true;
        try {
          const response = await axios.get('/api/categories');

          categoriesDictionary.value = response.data.map(category => ({
            value: category.categoryId,
            label: category.categoryName,
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

      onMounted(() => {
        if (route.params.id) {
          isEditMode.value = true;
          fetchProduct(route.params.id);
        }
        fetchCategories();
      });

      return {
        product: product,
        initialData,
        isEditMode,
        router,
        categoriesDictionary,
      };
    },
  };
</script>

<template>
  <div class="main-content">
    <div class="header">
      <h1>{{ isEditMode ? 'Edytuj produkt' : 'Dodaj produkt' }}</h1>
      <div class="button-group">
        <DeleteButton
          v-if="isEditMode && product.productId"
          :deleteUrl="`/api/products/${product.productId}/safe`"
          redirect-url="/products"
          message="Bezpieczne usuwanie"
        />
        <DeleteButton
          v-if="isEditMode && product.productId"
          :deleteUrl="`/api/products/${product.productId}/unsafe`"
          redirect-url="/products"
          message="Niebezpieczne usuwanie"
        />
      </div>
    </div>

    <FormComponent
      :initial-item="initialData"
      :is-edit-mode="isEditMode"
      :api-url="'/api/products'"
      :item="product"
      :model-id="product.productId">

      <template #form-fields="{ formRefs }">
        <div class="form-grid">
          <div class="full">
            <FormInput label="Nazwa" field-id="productName" field-name="productName" v-model="product.productName" :errors="formRefs['productName']" required />
          </div>

          <div class="full">
            <FormTextArea label="Opis" field-id="description" field-name="description" v-model="product.description" :errors="formRefs['description']" required />
          </div>

          <div class="full">
            <FormSelect label="Kategoria" field-id="categoryId" field-name="categoryId" v-model="product.categoryId" :errors="formRefs['categoryId']" required  :options="categoriesDictionary"/>
          </div>

          <div class="half">
            <FormInput type="number" label="Cena" field-id="price" :min=0 field-name="price" v-model="product.price" :errors="formRefs['price']" required />
          </div>
        </div>

        <div class="form-grid">
          <div class="half">
            <FormInput type="number" label="Na stanie" field-id="stockQuantity" :min=0 field-name="stockQuantity" v-model="product.stockQuantity" :errors="formRefs['stockQuantity']" required />
          </div>

          <div class="half">
            <FormInput type="number" label="Stan krytyczny" field-id="warningQuantity" :min=0 field-name="warningQuantity" v-model="product.warningQuantity" :errors="formRefs['warningQuantity']" required />
          </div>
        </div>
      </template>
    </FormComponent>
  </div>
</template>
