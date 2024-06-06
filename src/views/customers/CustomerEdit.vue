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
      const customer = ref({ clientName: '', contactName: '', contactPhone: '', email: '', country: '', state: '', city: '', postalCode: '', street: '' });
      const initialData = ref(null);
      const loading = ref(false);
      const error = ref(null);
      const route = useRoute();
      const router = useRouter();
      const isEditMode = ref(false);

      const fetchSupplier = async (id) => {
        loading.value = true;
        try {
          const customerResponse = await axios.get(`/api/clients/${id}`);
          const addressResponse = await axios.get(`/api/address/${customerResponse.data.addressId}`);

          customer.value = {
            ...customerResponse.data,
            ...addressResponse.data
          };

          initialData.value = { ...customerResponse.data };
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
        customer,
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
      <h1>{{ isEditMode ? 'Edytuj klienta' : 'Dodaj klienta' }}</h1>
      <DeleteButton
        v-if="isEditMode && customer.clientId"
        :deleteUrl="`/api/clients/${customer.clientId}`"
        redirect-url="/customers"
      />
    </div>

    <FormComponent
      :initial-item="initialData"
      :is-edit-mode="isEditMode"
      :api-url="'/api/clients'"
      :item="customer"
      :has-address="true"
      :model-id="customer.clientId">

      <template #form-fields="{ formRefs }">
        <div class="form-grid">
          <div class="full">
            <FormInput label="Nazwa" field-id="clientName" field-name="clientName" v-model="customer.clientName" :errors="formRefs['clientName']" required />
          </div>

          <div class="half">
            <FormInput label="Nazwa kontaktu" field-id="contactName" field-name="contactName" v-model="customer.contactName" :errors="formRefs['contactName']" required />
          </div>

          <div class="half">
            <FormInput label="Telefon" field-id="contactPhone" field-name="contactPhone" v-model="customer.contactPhone" :errors="formRefs['contactPhone']" required />
          </div>

          <div class="full">
            <FormInput label="Email" field-id="email" field-name="email" v-model="customer.email" :errors="formRefs['email']" required />
          </div>
        </div>

        <div class="form-grid">
          <div class="half">
            <FormInput label="Kraj" field-id="country" field-name="country" v-model="customer.country" :errors="formRefs['country']" required />
          </div>

          <div>
            <FormInput label="Województwo" field-id="state" field-name="state" v-model="customer.state" :errors="formRefs['state']" required />
          </div>

          <div class="half">
            <FormInput label="Miasto" field-id="city" field-name="city" v-model="customer.city" :errors="formRefs['city']" required />
          </div>

          <div>
            <FormInput label="Kod pocztowy" field-id="postalCode" field-name="postalCode" v-model="customer.postalCode" :errors="formRefs['postalCode']" required />
          </div>

          <div class="full">
            <FormInput label="Ulica" field-id="street" field-name="street" v-model="customer.street" :errors="formRefs['street']" required />
          </div>
        </div>
      </template>
    </FormComponent>
  </div>
</template>
