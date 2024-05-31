<script>
  import SidebarMenu from './components/SidebarMenu.vue';

  export default {
    name: 'App',
    components: {
      SidebarMenu
    }
  };
</script>

<template>
    <SidebarMenu />
    <div class="content">
      <router-view />
    </div>
</template>

<style>
  #app {
    display: flex;
    height: 100vh;
    width: ;
    background-color: #121212;
  }
  .content {
    flex-grow: 1;
    padding: 20px;
    color: #fff;
  }
</style>
