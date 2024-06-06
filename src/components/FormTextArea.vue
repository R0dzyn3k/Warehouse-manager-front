<script>
  export default {
    name: 'FormTextArea',
    props: {
      label: String,
      modelValue: [String, Number],
      fieldId: String,
      fieldName: String,
      required: Boolean,
      errors: Array,
    },
    methods: {
      handleInput($event) {
        this.$emit('update:modelValue', $event.target.value);
      },
    },
  };
</script>

<template>
  <div class="control-wrapper">
    <label :for="fieldId">{{ label }}</label>
    <textarea
      :id="fieldId"
      :name="fieldName"
      :value="modelValue"
      :required="required"
      @input="handleInput"
    />
    <div class="error-container" v-if="errors && errors.length">
      <span class="error" v-for="(error, index) in errors" :key="index">{{ error }}</span>
    </div>
  </div>
</template>
