<script>
  import axios from 'axios';
  import ThrashBinIcon from './icons/ThrashBinIcon.vue';

  export default {
    name: 'DeleteButton',
    computed: {
      ThrashBinIcon() {
        return ThrashBinIcon
      }
    },
    props: {
      deleteUrl: {
        type: String,
        required: true
      },
      redirectUrl: {
        type: String,
        required: true
      },
      message: {
        type: String,
        default: 'Usuń'
      }
    },
    methods: {
      async handleDelete() {
        if (confirm('Czy na pewno chcesz usunąć ten rekord?')) {
          try {
            await axios.delete(`${this.deleteUrl}`);
            this.$router.push(this.redirectUrl);
          } catch (error) {
            console.error('Nie udało się usunąć rekordu', error);
            if (error.response && error.response.data && error.response.data.errors) {
              const errorMessages = Object.entries(error.response.data.errors)
                .map(([key, messages]) => `${key}: ${messages.join(', ')}`)
                .join('\n');
              alert(`Błędy:\n${errorMessages}`);
            } else {
              alert('Nie udało się usunąć rekordu. Wystąpił nieznany błąd.');
            }
          }
        }
      }
    }
  }
</script>

<template>
  <button class="btn danger" @click="handleDelete">
    <span class="btn-icon">
      <component :is="ThrashBinIcon" class="icon" />
    </span>
    <span>{{ $props.message }}</span>
  </button>
</template>
