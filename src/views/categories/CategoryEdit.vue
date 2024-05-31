<script>
  import { ref, onMounted, watch, computed } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import { cancel } from '@/utils';

  export default {
    name: 'CategoryEdit',
    setup() {
      const category = ref({ categoryName: '' });
      const initialCategory = ref(null);
      const loading = ref(false);
      const error = ref(null);
      const formErrors = ref({});
      const route = useRoute();
      const router = useRouter();
      const isEditMode = ref(false);

      const fetchCategory = async (id) => {
        loading.value = true;
        try {
          const response = await axios.get(`/api/categories/${id}`);
          category.value = response.data;
          initialCategory.value = { ...response.data };
        } catch (err) {
          error.value = 'Nie udało się pobrać danych';
        } finally {
          loading.value = false;
        }
      };

      const hasUnsavedChanges = computed(() => {
        return JSON.stringify(category.value) !== JSON.stringify(initialCategory.value);
      });

      const submitForm = async () => {
        loading.value = true;
        formErrors.value = {};
        try {
          let url = `/api/categories`;

          if (isEditMode.value) {
            await axios.put(url, category.value);
          } else {
            const response = await axios.post(url, category.value);
            await router.push(`/categories/${response.data.categoryId}`);
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



      onMounted(() => {
        if (route.params.id) {
          isEditMode.value = true;
          fetchCategory(route.params.id);
        }
      });

      return {
        category,
        loading,
        error,
        formErrors,
        isEditMode,
        submitForm,
        cancel: () => cancel(router),
        hasUnsavedChanges,
      };
    },
  };
</script>

<template>
  <div class="category">
    <h1>{{ isEditMode ? 'Edytuj Kategorię' : 'Dodaj Kategorię' }}</h1>
    <div class="category-edit">
      <form @submit.prevent="submitForm">
        <div class="form-group">
          <label for="categoryName">Nazwa</label>
          <input
            type="text"
            id="categoryName"
            v-model="category.categoryName"
            required
          />
          <span v-if="formErrors.categoryName" class="error">{{ formErrors.categoryName[0] }}</span>
        </div>

        <div class="toolbar">
          <button class="btn primary" type="submit" :class="{ disabled: !hasUnsavedChanges }" :disabled="!hasUnsavedChanges">{{ isEditMode ? 'Zapisz' : 'Dodaj' }}</button>
          <button class="btn" type="button" @click="cancel">Powrót</button>
        </div>

      </form>
      <p v-if="loading">Ładowanie...</p>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<style scoped>
  .category-edit {
    margin-top: 20px;
    padding: 20px;
    background-color: #1e1e1e;
    border-radius: 5px;
    color: #fff;
  }
</style>
