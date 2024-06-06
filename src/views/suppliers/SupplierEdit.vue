<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import FormInput from '../../components/FormInput.vue';
  import DeleteButton from '../../components/DeleteButton.vue';
  import FormComponent from '../../components/FormComponent.vue';

  export default {
    name: 'SupplierEdit',
    components: { FormComponent, DeleteButton, FormInput },
    setup() {
      const supplier = ref({ supplierName: '', contractName: '', contactPhone: '', email: '', country: '', state: '', city: '', postalCode: '', street: '' });
      const initialData = ref(null);
      const loading = ref(false);
      const error = ref(null);
      const route = useRoute();
      const router = useRouter();
      const isEditMode = ref(false);

      const fetchSupplier = async (id) => {
        loading.value = true;
        try {
          const supplierResponse = await axios.get(`/api/suppliers/${id}`);
          const addressResponse = await axios.get(`/api/address/${supplierResponse.data.addressId}`);

          supplier.value = {
            ...supplierResponse.data,
            ...addressResponse.data
          };

          initialData.value = { ...supplierResponse.data };
        } catch (err) {
          error.value = 'Nie udało się pobrać danych';
        } finally {
          loading.value = false;
        }
      };


      onMounted(() => {
        if (route.params.id) {
          isEditMode.value = true;
          fetchSupplier(route.params.id);
        }
      });

      return {
        supplier: supplier,
        initialData,
        isEditMode,
        router,
      };
    },
  };
</script>

<template>
  <div class="main-content">
    <div class="header">
      <h1>{{ isEditMode ? 'Edytuj dostawce' : 'Dodaj dostawcę' }}</h1>
      <DeleteButton
        v-if="isEditMode && supplier.supplierId"
        :deleteUrl="`/api/suppliers/${supplier.supplierId}`"
        redirect-url="/suppliers"/>
    </div>

    <FormComponent
      :initial-item="initialData"
      :is-edit-mode="isEditMode"
      :api-url="'/api/suppliers'"
      :item="supplier"
      :has-address="true"
      :model-id="supplier.supplierId">

      <template #form-fields="{ formRefs }">
        <div class="form-grid">
          <div class="full">
            <FormInput label="Nazwa" field-id="supplierName" field-name="supplierName" v-model="supplier.supplierName" :errors="formRefs['supplierName']" required />
          </div>

          <div class="half">
            <FormInput label="Nazwa kontaktu" field-id="contractName" field-name="contractName" v-model="supplier.contractName" :errors="formRefs['contractName']" required />
          </div>

          <div class="half">
            <FormInput label="Telefon" field-id="contactPhone" field-name="contactPhone" v-model="supplier.contactPhone" :errors="formRefs['contactPhone']" required />
          </div>

          <div class="full">
            <FormInput label="Email" field-id="email" field-name="email" v-model="supplier.email" :errors="formRefs['email']" required />
          </div>
        </div>

        <div class="form-grid">
          <div class="half">
            <FormInput label="Kraj" field-id="country" field-name="country" v-model="supplier.country" :errors="formRefs['country']" required />
          </div>

          <div>
            <FormInput label="Województwo" field-id="state" field-name="state" v-model="supplier.state" :errors="formRefs['state']" required />
          </div>

          <div class="half">
            <FormInput label="Miasto" field-id="city" field-name="city" v-model="supplier.city" :errors="formRefs['city']" required />
          </div>

          <div>
            <FormInput label="Kod pocztowy" field-id="postalCode" field-name="postalCode" v-model="supplier.postalCode" :errors="formRefs['postalCode']" required />
          </div>

          <div class="full">
            <FormInput label="Ulica" field-id="street" field-name="street" v-model="supplier.street" :errors="formRefs['street']" required />
          </div>
        </div>
      </template>
    </FormComponent>
  </div>
</template>
