<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1
          class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg"
        >
          Sales List
        </h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Manage your sales</h2>
      </div>

      <!-- New Line -->
      <div v-if="$can('create_sale') && fetched">
        <v-btn
          color="primary-color"
          @click="showPopup = true"
          variant="flat"
          class="text-capitalize"
        >
          <v-icon icon="mdi-plus" class="mr-2 text-white"></v-icon>
          <span class="text-white"> Add Sale </span>
        </v-btn>
      </div>
    </div>

    <div v-if="!fetched">
      <LoadingAnimation />
    </div>

    <div
      v-if="fetched"
      class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md"
    >
      <SalesAnalytics :sales="sales" />

      <div class="mb-5 tw-flex">
        <v-btn
          @click="showFilters = !showFilters"
          icon
          rounded="lg"
          variant="flat"
          size="small"
          color="primary-color"
          class="text-white"
        >
          <v-icon color="white" size="xx-large">mdi-camera-control</v-icon>
        </v-btn>
        <div
          class="focus-within:tw-border-orange-400 tw-w-[250px] ml-2 px-2 tw-rounded-md tw-border tw-flex tw-items-center"
        >
          <v-img
            width="18"
            height="18"
            max-width="18"
            class="ma-0 pa-0"
            :src="localUrl + 'assets/img/icons/search.svg'"
          ></v-img>
          <input
            v-model="search"
            type="text"
            class="ml-2 tw-border-0 tw-w-full tw-outline-0 tw-h-full tw-text-sm"
            placeholder="Search by name"
          />
        </div>

        <v-spacer></v-spacer>
        <v-btn
          @click="handleReset"
          icon
          rounded="lg"
          variant="flat"
          size="small"
          :disabled="isButtonDisabled"
          :loading="isLoadingReset"
          color="red"
          class="text-white tw-mr-2"
        >
          <v-icon
            color="white"
            icon="mdi-restart-alert"
            size="xx-large"
          ></v-icon>
        </v-btn>

        <v-btn
          @click="getSales"
          icon
          rounded="lg"
          variant="flat"
          size="small"
          color="blue"
          class="text-white tw-mr-2"
        >
          <v-icon color="white" icon="mdi-autorenew" size="xx-large"></v-icon>
        </v-btn>
      </div>
      <div
        class="tw-max-h-0 tw-duration-500 tw-overflow-hidden"
        :class="{ '!tw-max-h-[1000px] !tw-overflow-visible': showFilters }"
      >
        <IndexFilter
          :sales="sales"
          :search="search"
          v-model:filtered="filteredSales"
        />
      </div>
      <div class="">
        <SalesTable
          @selected="handleSelected"
          :selected-reset="selected"
          :key="filteredSales.length"
          :sales="filteredSales"
        />
      </div>
      <!-- new lane -->

      <AddSale @cancel="showPopup = false" :visible="showPopup" />
    </div>
  </div>
</template>

<script>
import { localUrl } from "@/config/config";

import SalesTable from "./SalesTable.vue";
import Sale from "@/api/Sale";
import User from "@/api/User";
import AddSale from "@/views/sale/partials/AddSale";
import Product from "@/api/Product";
import IndexFilter from "@/views/sale/filters/IndexFilter";
import SalesAnalytics from "@/views/sale/partials/SalesAnalytics";

export default {
  components: {
    SalesTable,
    AddSale,
    SalesAnalytics,
    IndexFilter,
  },
  data() {
    return {
      localUrl,
      isLoaded: false,
      isLoadingReset: false,
      showFilters: false,
      isButtonDisabled: true,
      filteredSales: [],
      search: "",

      selected: [],
      // new lane
      showPopup: false,
    };
  },

  watch: {
    dateFilter(v) {
      console.log("date: ", v);
    },
  },

  computed: {
    fetched() {
      return this.$store.getters["sale/fetched"];
    },
    users() {
      return this.$store.getters["user/users"];
    },
    deliveries() {
      return this.users.filter((i) => i.role.id == 3);
    },
    agentes() {
      return this.users.filter((i) => i.role.id == 2);
    },
    sales() {
      return this.$store.getters["sale/sales"];
    },
    cities() {
      return this.$store.getters["city/cities"];
    },
  },
  methods: {
    handleSelected(value) {
      this.selected = value;

      // Enable the button if selected is not empty
      if (this.selected.length > 0) {
        this.isButtonDisabled = false;
      } else {
        this.isButtonDisabled = true;
      }
    },

    async getDeliveries() {
      await User.deliveries().then((res) => {
        this.$store.dispatch("user/setDeliveries", res.data.data);
      }, this.$handleApiError);
    },

    async getUsers() {
      await User.all().then((res) => {
        console.log(res.data.data);
        this.$store.dispatch("user/setUsers", res.data.data.users);
      }, this.$handleApiError);
    },

    getSales() {
      return Sale.all()
        .then((res) => {
          if (res?.data.code == "SUCCESS") {
            const sales = res.data.data.orders;
            console.log(res.data);
            this.$store.dispatch("sale/setSales", sales);
            this.$store.dispatch("sale/setFetched", true);
          }
        })
        .catch(this.$handleApiError);
    },

    getProducts() {
      return Product.all().then(
        (res) => {
          if (res.data.code == "SUCCESS") {
            this.$store.dispatch("product/setProducts", res.data.data.products);
            this.$store.dispatch("product/setFetched", true);
          }
        },
        (err) => {
          this.$handleApiError(err);
        }
      );
      // .finally(() => (this.isLoaded = true));
    },

    getCities() {
      if (this.cities.length == 0) {
        return User.cities().then((res) => {
          const cities = res.data.data;
          this.$store.dispatch("city/setCities", cities);
        });
      }
    },

    handleReset() {
      this.isLoadingReset = true;
      if (this.selected.length != 0) {
        Sale.resetSale(this.selected)
          .then((res) => {
            if (res.data.code == "SUCCESS") {
              this.$alert({
                type: "success",
                title: res.data.message,
              });
              this.$store.dispatch("sale/resetSales", this.selected);
              this.selected = [];
            }
          })
          .catch((err) => {
            this.$handleApiError(err);
          })
          .finally(() => (this.isLoadingReset = false));
      }
    },
  },

  async mounted() {
    if (this.deliveries.length == 0) {
      await this.getDeliveries();
      this.getUsers();
    }
    if (!this.$store.getters["sale/fetched"]) {
      this.getSales();
    } else {
      this.isLoaded = true;
    }

    if (this.fetched) {
      this.getProducts();
      this.getCities();
    }
  },
};
</script>

<style>
</style>