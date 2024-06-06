<script>
  export default {
    name: 'FormSelect',
    props: {
      label: String,
      modelValue: [String, Number],
      fieldId: String,
      fieldName: String,
      required: Boolean,
      errors: Array,
      options: {
        type: Array,
        required: true,
      },
      placeholder: String,
      addWrapperClass: {
        type: Boolean,
        default: true,
      },
      addLabel: {
        type: Boolean,
        default: true,
      },
    },
    computed: {
      localModelValue: {
        get() {
          return this.modelValue
        },
        set(newValue) {
          this.$emit('update:modelValue', newValue)
        },
      },
    },
    methods: {
      handleInput($event) {
        this.$emit('update:modelValue', $event.target.value);
      },
    },
  };
</script>

<template>
  <div v-if="addWrapperClass" class="control-wrapper">
    <label v-if="addLabel" :for="fieldId">{{ label }}</label>
    <select
      :id="fieldId"
      :name="fieldName"
      :required="required"
      @input="handleInput"
      v-model="localModelValue"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value">{{ option.label }}</option>
    </select>

    <div class="error-container" v-if="errors && errors.length">
      <span class="error" v-for="(error, index) in errors" :key="index">{{ error }}</span>
    </div>
  </div>
</template>
