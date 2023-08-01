<template>
  <div>
    <span class="tw-text-sm tw-text-neutral-600">Export</span>
    <div class="tw-relative tw-flex tw-items-center tw-gap-2 tw-justify-between">
      <div class="tw-relative tw-w-full">
        <select
        v-model="selection"
        class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200 tw-outline-0 tw-text-sm"
      >
        <option value="all">All Sales</option>
        <option value="selected">Selected Sales</option>
        <option value="filtered">Filtered Sales</option>
      </select>
      <v-icon
        class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2"
        >mdi-chevron-down</v-icon
      >
      </div>
      <download-csv
      delimiter=";"
          :data="toImport">
        <v-btn
        @click="handleImport"
          icon
          rounded="lg"
          variant="flat"
          size="x-small"
          color="green"
          class="text-white tw-mr-2"
        >

          <v-icon
            color="white"
            icon="mdi-download"
            size="x-large"
          ></v-icon>
        </v-btn>
        </download-csv>
    </div>
  </div>
</template>

<script>

export default {
  props: ["selected", "filtered", "sales"],

  data() {
    return {
        selection: 'all'
    };
  },

  computed: {
    toImport() {
      const copy = this.data.map(p => ({...p}));

        const data = copy.map(s => {
            const keys = Object.keys(s);
            keys.forEach(k => {
                s[k] = !s[k] ? "NONE" : s[k]
            });
            return s
        
        })
        const separator = ","
        const new_data = data.map(s => {
            // delete s['items'];
            delete s['factorisation_id'];
            delete s['note_d'];
            delete s['cmd'];
            delete s['product_name'];
            delete s['is_done'];
            delete s['factorisation'];
            delete s['doubles'];
            delete s['is_double'];
            delete s['has_doubles'];
            delete s['double'];

            return ({
            ...s,
            products: s.items.map(p => `id=${p.id}${separator}price=${!p.price ? 0 : p.price}${separator}name=${p.product?.name}${separator}ref=${p.product?.ref}${separator}variation_id=${p.product_variation_id}${separator}size=${!p.product_variation.size ? 'DEFAULT': p.product_variation.size}${separator}color=${!p.product_variation.color ? 'DEFAULT': p.product_variation.color}${separator}`)
        })});

        return new_data.map(i => {
            delete i['items'];

            return i;
        })
    },

    data() {
        switch (this.selection) {
            case 'selected':
                // console.log(this.selected);
                return this.selected

            case 'filtered':
                // console.log(this.filtered);
                return this.filtered
        
            default:
                return this.sales
        }
    }
  },

  methods: {
    handleImport() {
        if(this.data.length == 0) {
            this.$alert({
                title: 'No Data To Export',
                type: 'warning'
            })
        }
    }
  }

};
</script>

<style>
</style>