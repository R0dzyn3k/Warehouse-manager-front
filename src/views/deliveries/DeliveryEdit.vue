<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import DeleteButton from '../../components/DeleteButton.vue';
  import FormInput from '../../components/FormInput.vue';
  import FormComponentForDetails from '../../components/FormComponentForDetails.vue';
  import GetReportButton from '../../components/GetReportButton.vue';

  export default {
    name: 'DeliveryEdit',
    components: { GetReportButton, FormComponentForDetails, FormInput, DeleteButton },
    setup() {
      const delivery = ref({ supplier: {}, address: {}, deliveryDetails: [] });
      const loading = ref(false);
      const error = ref(null);
      const route = useRoute();
      const router = useRouter();

      const fetchDelivery = async (id) => {
        loading.value = true;

        try {
          const response = await axios.get(`/api/deliveries/${id}`);
          delivery.value = response.data;
        } catch (err) {
          error.value = 'Nie udało się pobrać danych';
        } finally {
          loading.value = false;
        }
      };

      onMounted(() => {
        if (route.params.id) {
          fetchDelivery(route.params.id);
        }
      });

      return {
        delivery,
        router,
      };
    },
  };
</script>

<template>
  <div class="main-content">
    <div class="header">
      <h1>Edytuj zamówienie</h1>
      <div class="button-group">
        <DeleteButton v-if="delivery.deliveryId" :deleteUrl="`/api/deliveries/${delivery.deliveryId}`" redirect-url="/deliveries" message="Usuń" />
      </div>
    </div>

    <FormComponentForDetails :api-url="`/api/deliveryDetails`" :item="delivery.deliveryDetails" >
      <template #form-fields="{ formRefs }">
        <div class="form-grid">
          <div class="full">
            <h3>Klient</h3>
          </div>
          <div class="half">
            <FormInput label="Nazwa" field-id="supplierName" :model-value="delivery.supplier.supplierName" disabled />
          </div>
          <div class="">
            <FormInput label="Nazwa kontaktu" field-id="contractName" :model-value="delivery.supplier.contractName" disabled />
          </div>
          <div class="half">
            <FormInput label="Telefon" field-id="contactPhone" :model-value="delivery.supplier.contactPhone" disabled />
          </div>
          <div class="">
            <FormInput label="Email" field-id="email" :model-value="delivery.supplier.email" disabled />
          </div>
        </div>

        <div class="form-grid">
          <div class="full">
            <h3>Adress</h3>
          </div>
          <div class="half">
            <FormInput label="Kraj" field-id="country" :model-value="delivery.address.country" disabled />
          </div>
          <div class="">
            <FormInput label="Województwo" field-id="state" :model-value="delivery.address.state" disabled />
          </div>
          <div class="half">
            <FormInput label="Miasto" field-id="city" :model-value="delivery.address.city" disabled />
          </div>
          <div class="">
            <FormInput label="Kod pocztowy" field-id="postalCode" :model-value="delivery.address.postalCode" disabled />
          </div>
          <div class="full">
            <FormInput label="Ulica" field-id="street" :model-value="delivery.address.street" disabled />
          </div>
        </div>

        <div class="form-grid">
          <div class="full">
            <h3>Szczegóły</h3>
          </div>
          <div class="half">
            <FormInput label="Suma" field-id="totalPrice" :model-value="delivery.totalPrice" disabled />
          </div>
          <div class="half">
            <FormInput label="Data zamówienia" field-id="deliveryDate" :model-value="delivery.deliveryDate" disabled :date="true" />
          </div>
        </div>
        <div class="form-grid">
          <div class="full">
            <h3>Produkty</h3>
          </div>
          <div class="full">
            <div v-for="(product, index) in delivery.deliveryDetails" :key="index" class="product-form">
              <FormInput label="Nazwa" field-id="productName" :model-value="product.productName" disabled :errors="formRefs[`${product.deliveryDetailId}-modelId`]?.quantity" />
              <input type="hidden" v-model="product.deliveryDetailId" >

              <FormInput
                label="Ilość"
                type="number"
                v-model="product.quantity"
                :min="1"
                required
                :errors="formRefs[`${product.deliveryDetailId}-modelId`]?.quantity"
              />
              <FormInput
                label="Cena"
                type="number"
                v-model="product.unitPrice"
                :min="1"
                required
                :errors="formRefs[`${product.deliveryDetailId}-modelId`]?.price"
              />
            </div>
          </div>
        </div>
      </template>
    </FormComponentForDetails>
  </div>
</template>
