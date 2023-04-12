<template>
  <div v-if="newOrder">
    <v-btn link target="_blank" :href="'https://api.whatsapp.com/send?phone=' + order.phone.replace('+', '')" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="green" variant="flat" density="comfortable" :ripple="false" size="small">
      <v-icon color="white">mdi-whatsapp</v-icon>
    </v-btn>
    </div>
</template>
<script>

// your vue component
export default {
  // access any cell properties here
  props: [ "order"],
  name: "orderActions",
  data() {
    return {
        newOrder: null
    };
  },
  computed: {
  },
  methods: {
  },

  mounted() {
    this.newOrder = {...this.order};
  }
};
</script>