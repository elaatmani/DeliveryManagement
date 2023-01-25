<template>
  <div class="tw-flex tw-items-center  tw-h-full">
    <div :class="variants[model.status].bg" class="tw-px-2 tw-py-1 tw-rounded-lg">
        <div :class="variants[model.status].text" class="tw-text-xs tw-font-bold">
            {{ variants[model.status].value }}
        </div>
    </div>
  </div>
</template>
<script>
// myVue.vue

// your vue component
export default {
  // access any cell properties here
  props: ["rowIndex", "prop", "model"],
  name: "myVue",
  data() {
    return {
      variants: {
        outOfStock: {
            bg: 'tw-bg-pink-500/10',
            text: 'tw-text-pink-500',
            value: 'OUT OF STOCK'
        },
        'inShop': {
            bg: 'tw-bg-green-500/10',
            text: 'tw-text-green-500',
            value: 'IN SHOP'
        },
        'pending': {
            bg: 'tw-bg-yellow-500/10',
            text: 'tw-text-yellow-500',
            value: 'PENDING'
        },
      },
    };
  },
  methods: {
  },
  mounted() {
  }
};
</script>