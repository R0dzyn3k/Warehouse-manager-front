<script>
  import { ref, watch, computed } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';

  export default {
    name: 'FormComponent',
    props: {
      item: {
        type: Object,
        required: true,
      },
      apiUrl: {
        type: String,
        required: true,
      },
      isEditMode: {
        type: Boolean,
        required: true,
      },
      initialItem: {
        type: Object,
        required: true,
      },
      modelId: {
        type: Number,
          },
      hasAddress: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const loading = ref(false);
      const error = ref(null);
      const formErrors = ref({});
      const router = useRouter();
      const formRefs = ref({});

      const hasUnsavedChanges = computed(() => {
        return JSON.stringify(props.item) !== JSON.stringify(props.initialItem);
      });

      const submitForm = async () => {
        loading.value = true;

        if (props.hasAddress) {
          try {
            formErrors.value = {};
            formRefs.value = {};
            let addressUrl = '/api/address';

            if (props.isEditMode) {
              await axios.put(`${addressUrl}/${props.item.addressId}`, props.item);
            } else {
              const response = await axios.post(addressUrl, props.item);
              // eslint-disable-next-line vue/no-mutating-props
              props.item.addressId = response.data.id;
            }
          } catch (err) {
            if (err.response && err.response.data && err.response.data.errors) {
              formErrors.value = err.response.data.errors;
              loading.value = false;
              return;
            } else {
              error.value = 'Nie udało się zapisać danych';
              loading.value = false;
              return;
            }
          } finally {
            loading.value = false;
          }
        }

        try {
          formErrors.value = {};
          formRefs.value = {};


          if (props.isEditMode) {
            await axios.put(`${props.apiUrl}/${props.modelId}`, props.item);
          } else {
            await axios.post(props.apiUrl, props.item);
          }
        } catch (err) {
          if (err.response && err.response.data && err.response.data.errors) {
            formErrors.value = err.response.data.errors;
          } else {
            error.value = 'Nie udało się zapisać danych';
          }
        } finally {
          loading.value = false;
        }
      };

      const cancelAction = () => {
        router.back();
      };

      watch(() => props.item, (newVal, oldVal) => {
        if (!newVal || !oldVal) return;
        hasUnsavedChanges.value = JSON.stringify(newVal) !== JSON.stringify(oldVal);
      });

      watch(formErrors, (newErrors) => {
        for (const key of Object.keys(newErrors)) {
          if (key != null && newErrors[key] != null) {
            formRefs.value[key] = newErrors[key];
          }
        }
      });

      return {
        loading,
        error,
        formErrors,
        hasUnsavedChanges,
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
        <button class="btn primary" type="submit" :class="{ disabled: !hasUnsavedChanges }" :disabled="!hasUnsavedChanges">{{ isEditMode ? 'Zapisz' : 'Dodaj' }}</button>
        <button class="btn" type="button" @click="cancelAction">Powrót</button>
      </div>
    </form>
  </div>
</template>

