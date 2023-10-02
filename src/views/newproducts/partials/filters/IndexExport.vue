<template>
  <div class="tw-mb-4">
    <div class="tw-flex tw-items-center tw-gap-2">
      <button
        @click="handleExportFiltered"
        :disabled="isLoadingFiltered"
        class="tw-py-2 tw-px-7 tw-flex tw-items-center tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white"
      >
        <v-icon
          size="small"
          class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
          :class="[isLoadingFiltered && '!tw-max-w-[50px] !tw-mr-3']"
          >mdi-loading</v-icon
        >
        <span>Select Filtered</span>
      </button>

    </div>

    <div class="tw-flex tw-justify-end">

        <button 
        :disabled="readyToDownload"
        :class="[!readyToDownload && '!tw-bg-gray-200 !tw-cursor-not-allowed hover:tw-bg-gray-200 !tw-text-gray-600']"
        class="tw-py-2 tw-px-7 tw-flex tw-items-center tw-cursor-pointer tw-rounded tw-text-sm tw-bg-emerald-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-emerald-600 dark:tw-border-neutral-900 dark:hover:tw-border-emerald-500 hover:tw-bg-emerald-500/80 dark:hover:tw-bg-emerald-400 tw-duration-300 tw-text-white">
          <download-csv  delimiter=";" :data="toImport" >
              Download
          </download-csv>
        </button>
    </div>
  </div>
</template>

<script>
import Admin from "@/api/Admin";
// import Admin from '@/api/Admin'

export default {
  props: {
    filters: {
      required: true,
    },
  },

  data() {
    return {
      isLoadingFiltered: false,
      isLoading: false,

      toImport: [],
      readyToDownload: false

    };
  },

  watch: {
    filters: {
      deep: true,
      handler() {
        this.readyToDownload = false;
      }
    }
  },

  methods: {
    handleExportFiltered() {
      this.isLoadingFiltered = true;
      this.readyToDownload = false
      Admin.export({ filters: this.filters })
        .then((res) => {
          if (res.data.code == "SUCCESS") {
            const orders = res.data.data.orders;
            this.importOrders(orders);
            this.readyToDownload = true;
            
          }
        })
        .catch(this.$handleApiError)
        .finally(() => {
          this.isLoadingFiltered = false;
        });
    },

    importOrders(orders) {
      const data = orders.map((s) => {
        const keys = Object.keys(s);
        keys.forEach((k) => {
          s[k] = !s[k] ? "NONE" : s[k];
        });
        return s;
      });
      const separator = ",";
      const new_data = data.map((s) => {
        // delete s['items'];
        delete s["factorisation_id"];
        delete s["note_d"];
        delete s["cmd"];
        delete s["product_name"];
        delete s["is_done"];
        delete s["factorisation"];
        delete s["doubles"];
        delete s["is_double"];
        delete s["has_doubles"];
        delete s["double"];

        return {
          ...s,
          products: s.items.map(
            (p) =>
              `id=${p.id}${separator}price=${
                !p.price ? 0 : p.price
              }${separator}name=${p.product?.name}${separator}ref=${
                p.product?.ref
              }${separator}variation_id=${
                p.product_variation_id
              }${separator}size=${
                !p.product_variation.size ? "DEFAULT" : p.product_variation.size
              }${separator}color=${
                !p.product_variation.color
                  ? "DEFAULT"
                  : p.product_variation.color
              }${separator}`
          ),
        };
      });

      this.toImport = new_data.map((i) => {
        delete i["items"];

        return i;
      });
    },
  },
};
</script>

<style>
</style>