<script>
  export default {
    name: 'DataTable',
    props: {
      columns: {
        type: Array,
        required: true
      },
      rows: {
        type: Array,
        required: true
      },
      loading: {
        type: Boolean,
        default: false
      },
      error: {
        type: String,
        default: null
      }
    }
  };
</script>

<template>
  <div class="data-table">
    <p v-if="loading">Ładowanie...</p>
    <p v-else-if="error">{{ error }}</p>
    <table v-else>
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.key">{{ column.label }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in rows" :key="row.id">
          <td v-for="column in columns" :key="column.key">
            <span v-if="column.to">
              <router-link :to="`${column.to}/${row[column.id] !== undefined && row[column.id] !== null ? row[column.id] : ''}`">
                {{ row[column.key] !== undefined && row[column.key] !== null ? row[column.key] : '' }}
              </router-link>
            </span>
            <span v-else>{{ row[column.key] ?? '' }}</span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
  .data-table {
    width: 100%;
    margin-top: 20px;
    padding: 20px;
    background-color: #1e1e1e;
    border-radius: 5px;
    overflow-x: auto;
  }

  .data-table table {
    width: 100%;
    table-layout: fixed;
    border-collapse: collapse;
  }

  .data-table th,
  .data-table td {
    padding: 10px;
    border: 1px solid #ccc;
    word-wrap: break-word;
  }

  .data-table th {
    background-color: #333;
    color: #fff;
    text-align: left;
  }

  .data-table td {
    background-color: #2e2e2e;
    color: #fff;
  }

  .data-table th:nth-child(1),
  .data-table td:nth-child(1) {
    width: 50px;
  }

  .data-table th:nth-child(2),
  .data-table td:nth-child(2) {
    width: 200px;
  }

  .data-table th:nth-child(3),
  .data-table td:nth-child(3) {
    width: auto;
  }
</style>
