<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1
          class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg"
        >
          Expidation
        </h1>
      </div>
    </div>

    <div v-if="!isLoaded">
      <LoadingAnimation />
    </div>

    <div
      v-if="isLoaded"
      class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md"
    >
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
          v-if="$can(`handle_expidation`)"
          @click="showPopupTicket = true"
          :disabled="isButtonDisabled"
          icon
          rounded="lg"
          variant="flat"
          size="small"
          color="green"
          class="text-white tw-mr-2"
        >
          <v-icon
            color="white"
            icon="mdi-ticket-confirmation-outline"
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
          :key="filteredSales.length"
          :sales="filteredSales"
        />
      </div>
      <!-- new lane -->

      <AddSale @cancel="showPopup = false" :visible="showPopup" />
      <AddTicket
        :orders="selectedOrders"
        @cancel="showPopupTicket = false"
        :visible="showPopupTicket"
      />
    </div>
  </div>
</template>

<script>
import { localUrl } from "@/config/config";

import SalesTable from "./SalesTable.vue";
import Sale from "@/api/Sale";
import User from "@/api/User";
import AddSale from "@/views/sale/partials/AddSale";
import AddTicket from "@/views/sale/partials/AddTicket";
import IndexFilter from "@/views/sale/filters/IndexFilter";
import { confirmations, deliveryStatus } from "@/config/orders";

export default {
  components: { SalesTable, AddSale, AddTicket, IndexFilter },
  data() {
    return {
      localUrl,
      confirmations,
      deliveryStatus,
      isLoaded: false,
      showFilters: false,
      search: "",
      isButtonDisabled: true,
      filteredSales: [],

      selected: [],

      // new lane
      showPopup: false,
      showPopupTicket: false,
    };
  },
  computed: {
    selectedOrders() {
      return this.sales.filter((i) => this.selected.includes(i.id));
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
      return this.$store.getters["sale/sales"].filter(
        (sale) => sale.delivery == "dispatch"
      );
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
        console.log(res.data.data);
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
      this.isLoaded = false;
      return Sale.all()
        .then((res) => {
          if (res?.data.code == "SUCCESS") {
            const sales = res.data.data.orders;
            console.log(res.data);
            this.$store.dispatch("sale/setSales", sales);
            this.$store.dispatch("sale/setFetched", true);
            this.isLoaded = true;
          }
        })
        .catch(this.$handleApiError);
    },

    getCities() {
      if (this.cities.length == 0) {
        return User.cities().then((res) => {
          const cities = res.data.data;
          this.$store.dispatch("city/setCities", cities);
        });
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
    this.getCities();
  },
};
</script>

<style>
</style>