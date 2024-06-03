<script setup>
</script>

<template>
  <div class="main-content">
    <div class="header">
      <h1>Zamówienia</h1>
      <button class="btn primary" @click="navigateToNewCategory">Utwórz</button>
    </div>

    <div class="orders-list">
      <h2>Lista zamówień</h2>
      <p>tutaj ma być tabelka</p>
    </div>
  </div>
</template>

<style scoped>
  .orders-list {
    margin-top: 20px;
    padding: 10px;
    background-color: #1e1e1e;
    border-radius: 5px;
  }
</style>
