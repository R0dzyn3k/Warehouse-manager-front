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
      itemId: {
        type: [String, Number],
        required: true
      },
      iconComponent: {
        type: Object,
        required: true
      }
    },
    methods: {
      async handleDelete() {
        if (!this.itemId) return;

        if (confirm('Czy na pewno chcesz usunąć ten rekord?')) {
          try {
            await axios.delete(`${this.deleteUrl}/${this.itemId}`);
            this.$router.push('/categories');
          } catch (error) {
            console.error('Nie udało się usunąć rekordu', error);
          }
        }
      }
    }
  }
</script>

<template>
  <button v-if="itemId" class="btn danger" @click="handleDelete">
    <span class="btn-icon">
      <component :is="ThrashBinIcon" class="icon" />
    </span>
    <span>Usuń</span>
  </button>
</template>
