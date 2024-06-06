<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import DeleteButton from '../../components/DeleteButton.vue';
  import FormInput from '../../components/FormInput.vue';
  import FormComponentForDetails from '../../components/FormComponentForDetails.vue';
  import GetReportButton from '../../components/GetReportButton.vue';

  export default {
    name: 'OrderEdit',
    components: { GetReportButton, FormComponentForDetails, FormInput, DeleteButton },
    setup() {
      const order = ref({ client: {}, address: {}, orderDetails: [] });
      const loading = ref(false);
      const error = ref(null);
      const route = useRoute();
      const router = useRouter();

      const fetchOrder = async (id) => {
        loading.value = true;

        try {
          const response = await axios.get(`/api/orders/${id}`);
          order.value = response.data;
        } catch (err) {
          error.value = 'Nie udało się pobrać danych';
        } finally {
          loading.value = false;
        }
      };

      onMounted(() => {
        if (route.params.id) {
          fetchOrder(route.params.id);
        }
      });

      return {
        order,
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
        <GetReportButton v-if="order.orderId" :url="`/api/orders/${order.orderId}/report`" />
        <DeleteButton v-if="order.orderId" :deleteUrl="`/api/orders/${order.orderId}`" redirect-url="/orders" message="Usuń" />
      </div>
    </div>

    <FormComponentForDetails :api-url="`/api/orderDetails`" :item="order.orderDetails" >
      <template #form-fields="{ formRefs }">
        <div class="form-grid">
          <div class="full">
            <h3>Klient</h3>
          </div>
          <div class="half">
            <FormInput label="Nazwa" field-id="clientName" :model-value="order.client.clientName" disabled />
          </div>
          <div class="">
            <FormInput label="Nazwa kontaktu" field-id="contactName" :model-value="order.client.contactName" disabled />
          </div>
          <div class="half">
            <FormInput label="Telefon" field-id="contactPhone" :model-value="order.client.contactPhone" disabled />
          </div>
          <div class="">
            <FormInput label="Email" field-id="email" :model-value="order.client.email" disabled />
          </div>
        </div>

        <div class="form-grid">
          <div class="full">
            <h3>Adress</h3>
          </div>
          <div class="half">
            <FormInput label="Kraj" field-id="country" :model-value="order.address.country" disabled />
          </div>
          <div class="">
            <FormInput label="Województwo" field-id="state" :model-value="order.address.state" disabled />
          </div>
          <div class="half">
            <FormInput label="Miasto" field-id="city" :model-value="order.address.city" disabled />
          </div>
          <div class="">
            <FormInput label="Kod pocztowy" field-id="postalCode" :model-value="order.address.postalCode" disabled />
          </div>
          <div class="full">
            <FormInput label="Ulica" field-id="street" :model-value="order.address.street" disabled />
          </div>
        </div>

        <div class="form-grid">
          <div class="full">
            <h3>Szczegóły</h3>
          </div>
          <div class="half">
            <FormInput label="Suma" field-id="totalPrice" :model-value="order.totalPrice" disabled />
          </div>
          <div class="half">
            <FormInput label="Data zamówienia" field-id="orderDate" :model-value="order.orderDate" disabled :date="true" />
          </div>
        </div>
        <div class="form-grid">
          <div class="full">
            <h3>Produkty</h3>
          </div>
          <div class="full">
            <div v-for="(product, index) in order.orderDetails" :key="index" class="product-form">
              <FormInput label="Nazwa" field-id="productName" :model-value="product.productName" disabled :errors="formRefs[`${product.orderDetailId}-modelId`]?.quantity" />
              <input type="hidden" v-model="product.orderDetailId" >

              <FormInput
                label="Ilość"
                type="number"
                v-model="product.quantity"
                :min="1"
                required
                :errors="formRefs[`${product.orderDetailId}-modelId`]?.quantity"
              />
              <FormInput
                label="Cena"
                type="number"
                v-model="product.unitPrice"
                :min="1"
                required
                :errors="formRefs[`${product.orderDetailId}-modelId`]?.price"
              />
            </div>
          </div>
        </div>
      </template>
    </FormComponentForDetails>
  </div>
</template>
