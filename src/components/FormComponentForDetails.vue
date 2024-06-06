<script>
  import { ref, watch } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  export default {
    name: 'FormComponentForDetails',
    props: {
      item: {
        type: Object,
        required: true,
      },
      apiUrl: {
        type: String,
        required: true,
      },

    },
    setup(props) {
      const loading = ref(false);
      const error = ref(null);
      const formErrors = ref({});
      const router = useRouter();
      const formRefs = ref({});

      const submitForm = async () => {
        loading.value = true;
        formErrors.value = {};
        formRefs.value = {};

        for (const item of props.item) {
          const transformedItem = {
            ...item,
            price: item.unitPrice,
          };

          let modelId = item.orderDetailId ?? item.deliveryDetailId;

          try {
            await axios.put(`${props.apiUrl}/${modelId}`, transformedItem);
          } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
              formErrors.value[modelId] = { modelId: err.response.data.errors};
            } else {
              error.value = 'Nie udało się zapisać danych';
            }
          } finally {
            loading.value = false;
          }
        }
      };

      const cancelAction = () => {
        router.back();
      };

      watch(formErrors, (newErrors) => {
        for (const modelId in newErrors) {
          if (newErrors[modelId]) {
            for (const key in newErrors[modelId]) {
              formRefs.value[`${modelId}-${key}`] = newErrors[modelId][key];
            }
          }
        }
      }, { deep: true });

      return {
        loading,
        error,
        formErrors,
        submitForm,
        cancelAction,
        formRefs,
      };
    },
  };
</script>

<template>
  <div class="model-edit">
    <p v-if="loading">Ładowanie...</p>
    <p v-else-if="error">{{ error }}</p>
    <form v-else @submit.prevent="submitForm">
      <slot name="form-fields" :form-refs="formRefs"></slot>
      <div class="toolbar">
        <button class="btn primary" type="submit">{{ 'Zapisz' }}</button>
        <button class="btn" type="button" @click="cancelAction">Powrót</button>
      </div>
    </form>
  </div>
</template>

