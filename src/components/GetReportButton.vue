<script>
  import axios from 'axios';

  export default {
    name: 'GetReportButton',
    props: {
      url: {
        type: String,
        required: true,
      },
      message: {
        type: String,
        default: 'Pobierz raport',
      },
    },
    methods: {
      async handleRequest() {
        try {
          const response = await axios.get(this.url, {
            responseType: 'blob',
          });

          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;

          const contentDisposition = response.headers['content-disposition'];
          let fileName = 'report';

          if (contentDisposition) {
            const fileNameMatch = contentDisposition.match(/filename="?(.+)"?/);
            if (fileNameMatch.length === 2) {
              fileName = fileNameMatch[1];
            }
          }

          link.setAttribute('download', fileName);
          document.body.appendChild(link);
          link.click();

          document.body.removeChild(link);
        } catch (error) {
          console.error('Nie udało się pobrać rekordu', error);
        }
      },
    },
  };
</script>

<template>
  <button class="btn" @click="handleRequest">
    <span>{{ message }}</span>
  </button>
</template>
