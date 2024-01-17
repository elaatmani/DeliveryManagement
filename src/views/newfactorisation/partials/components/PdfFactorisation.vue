<template>
  <h2 class="tw-font-medium tw-text-gray-800 darkx:tw-text-white">
    <button class="tw-underline" @click="download(item.id)">
      {{ item.factorisation_id }}
    </button>
  </h2>
</template>

<script>
import { serverUrl } from "@/config/config";

export default {
  props: {
    item: {
      required: true,
    },
  },

  methods: {
    download(id) {
      const url = serverUrl + "api/factorisations/generate-pdf/" + id;
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.setAttribute("download", "dd.pdf");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
  }
};

</script>
