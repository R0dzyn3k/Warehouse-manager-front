<script>
  import { ref, onMounted } from 'vue';
  import axios from 'axios';
  import { useRoute, useRouter } from 'vue-router';
  import DeleteButton from '../../components/DeleteButton.vue';
  import FormComponent from '../../components/FormComponent.vue';
  import FormInput from '../../components/FormInput.vue';

  export default {
    name: 'CategoryEdit',
    components: { FormInput, FormComponent, DeleteButton },
    setup() {
      const category = ref({ categoryName: '' });
      const initialCategory = ref(null);
      const loading = ref(false);
      const error = ref(null);
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

      onMounted(() => {
        if (route.params.id) {
          isEditMode.value = true;
          fetchCategory(route.params.id);
        }
      });

      return {
        category,
        initialCategory,
        isEditMode,
        router
      };
    },
  };
</script>

<template>
  <div class="main-content">
    <div class="header">
      <h1>{{ isEditMode ? 'Edytuj kategorię' : 'Dodaj kategorię' }}</h1>
      <DeleteButton
        v-if="isEditMode && category.categoryId"
        :deleteUrl="`/api/categories/${category.categoryId}`"
       redirect-url="/categories"/>
    </div>

    <FormComponent
      :initial-item="initialCategory"
      :is-edit-mode="isEditMode"
      :api-url="'/api/categories'"
      :item="category"
      :modelId="category.categoryId"
      >
    <template #form-fields="{ formRefs }">
        <div class="form-grid">
          <div class="full">
            <FormInput
              label="Nazwa"
              field-id="categoryName"
              field-name="categoryName"
              v-model="category.categoryName"
              :errors="formRefs['categoryName']"
              required
            />
          </div>
        </div>
      </template>
    </FormComponent>
  </div>
</template>
