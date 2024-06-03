<script>
  import { useRouter } from 'vue-router';
  import AddIcon from './icons/AddIcon.vue';

  export default {
    name: 'AddButton',
    computed: {
      AddIcon() {
        return AddIcon
      }
    },
    props: {
      url: {
        type: String,
        required: true
      },
    },
    setup(props) {
      const router = useRouter();

      const navigate = () => {
        router.push(props.url);
      };

      return {
        navigate
      };
    }
  };
</script>


<template>
  <button class="btn primary add" @click="navigate">
    <span class="btn-icon"><component :is="AddIcon" class="icon" /></span>
    <span>Utwórz</span>
  </button>
</template>
