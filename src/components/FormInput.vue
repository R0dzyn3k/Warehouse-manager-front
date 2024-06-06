<script>
  import { format } from 'date-fns';

  export default {
    name: 'FormInput',
    props: {
      label: String,
      modelValue: [String, Number],
      fieldId: String,
      fieldName: String,
      required: Boolean,
      placeholder: String,
      disabled: Boolean,
      date: Boolean,
      type: {
        type: String,
        default: 'text',
      },
      errors: Array,
      min: Number,
    },
    methods: {
      handleInput($event) {
        this.$emit('update:modelValue', $event.target.value);
      },
    },
    computed: {
      localModelValue: {
        get() {
          return this.modelValue;
        },
        set(newValue) {
          this.$emit('update:modelValue', newValue);
        },
      },
      formattedDate() {
        if (this.date && this.modelValue) {
          return format(new Date(this.modelValue), 'dd-MM-yyyy');
        }
        return this.modelValue;
      },
    },
  };
</script>

<template>
  <div class="control-wrapper">
    <label :for="fieldId">{{ label }}</label>
    <input
      :type="type"
      :id="fieldId"
      :name="fieldName"
      :value="formattedDate"
      :required="required"
      :min="min"
      :placeholder="placeholder"
      :disabled="disabled"
      @input="handleInput"
    />
    <div class="error-container" v-if="errors && errors.length">
      <span class="error" v-for="(error, index) in errors" :key="index">{{ error }}</span>
    </div>
  </div>
</template>
