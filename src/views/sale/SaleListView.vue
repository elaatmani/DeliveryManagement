<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Sales List</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Manage your sales</h2>
      </div>

      <!-- New Line -->
      <div v-if="$can('create_sale') && isLoaded">
        <v-btn color="primary-color" @click="showPopup = true" variant="flat" class="text-capitalize">
          <v-icon icon="mdi-plus" class="mr-2 text-white "></v-icon>
          <span class="text-white">
            Add Sale
          </span>
        </v-btn>
      </div>


    </div>

    <div v-if="!isLoaded">
      <LoadingAnimation />
    </div>

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

      <div class="mb-5 tw-border-b  tw-border-solid tw-pb-5 tw-border-neutral-200">
        <div class="tw-grid tw-grid-cols-4 lg:tw-grid-cols-5 tw-gap-2">

          <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-2">
            <DashItem :dash="newSales" />
          </div>

          <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-2">
            <DashItem :dash="toProcess" />
          </div>

          <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-2">
            <DashItem :dash="confirmedSales" />
          </div>

          <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-2">
            <DashItem :dash="deliveredSales" />
          </div>


          <div class="lg:tw-col-span-1 md:tw-col-span-4 tw-col-span-4">
            <DashItem :dash="shippedSales" />
          </div>

        </div>
        <!-- <v-row >
            <v-col
            cols="12" sm="6" md="3"
            v-for="dash in filledDashItems"
            :key="dash.id"
            >
            </v-col>
        </v-row> -->
      </div>

      <div class="mb-5 tw-flex">
        <v-btn @click="showFilters = !showFilters" icon rounded="lg" variant="flat" size="small" color="primary-color"
          class="text-white">
          <v-icon color="white" size="xx-large">mdi-camera-control</v-icon>
        </v-btn>
        <div
          class="focus-within:tw-border-orange-400 tw-w-[250px] ml-2 px-2 tw-rounded-md tw-border tw-flex tw-items-center">
          <v-img width="18" height="18" max-width="18" class="ma-0 pa-0"
            :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
          <input v-model="search" type="text" class="ml-2 tw-border-0 tw-w-full tw-outline-0 tw-h-full tw-text-sm"
            placeholder="Search by name">
        </div>

        <v-spacer></v-spacer>
        <v-btn @click="handleReset" icon rounded="lg" variant="flat" size="small" :disabled="isButtonDisabled"
        :loading="isLoadingReset" color="red" class="text-white tw-mr-2">
          <v-icon color="white" icon="mdi-restart-alert" size="xx-large"></v-icon>
        </v-btn>


        <v-btn @click="getSales" icon rounded="lg" variant="flat" size="small" color="blue" class="text-white tw-mr-2">
          <v-icon color="white" icon="mdi-autorenew" size="xx-large"></v-icon>
        </v-btn>
      </div>
      <div class="tw-max-h-0 tw-duration-500 tw-overflow-hidden" :class="{'!tw-max-h-[500px]': showFilters}">
        <div class="tw-grid tw-grid-cols-12 tw-gap-2 tw-mb-4">
          <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Upsell</span>
            <div class="tw-relative">
              <select v-model="upsellFilter"
                class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                <option value="all">Select</option>
                <option value="oui">Oui</option>
                <option value="non">Non</option>
              </select>
              <v-icon
                class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
          </div>
          <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Confirmation</span>
            <div class="tw-relative">
              <select v-model="confirmationFilter"
                class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                <option v-for="c in confirmations" :key="c.id" :value="!c.value ? 'all' : c.value">{{ c.name }}</option>
              </select>
              <v-icon
                class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
          </div>
          <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Affecté</span>
            <div class="tw-relative">
              <select v-model="affectationFilter"
                class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                <option value="all">Select</option>
                <option :value="null">Without delivery</option>
                <option :value="delivery.id" :key="delivery.id" v-for="delivery in deliveries">
                  {{ delivery.firstname }} {{ delivery.lastname }}
                </option>
              </select>
              <v-icon
                class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
          </div>
          <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Agente</span>
            <div class="tw-relative">
              <select v-model="agenteFilter"
                class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                <option value="all">Select</option>
                <option :value="null">Without agente</option>
                <option :value="agente.id" :key="agente.id" v-for="agente in agentes">
                  {{ agente.firstname }} {{ agente.lastname }}
                </option>
              </select>
              <v-icon
                class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
          </div>
          <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit">
            <span class="tw-text-sm tw-text-neutral-600">Delivery</span>
            <div class="tw-relative">
              <select v-model="deliveryFilter"
                class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
                <option :value="!delivery.value ? 'all' : delivery.value" :key="delivery.id"
                  v-for="delivery in deliveryStatus">
                  {{ !delivery.value ? 'Select' : delivery.value }}
                </option>
              </select>
              <v-icon
                class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
            </div>
          </div>
        </div>
      </div>
      <div class="">
        <SalesTable @selected="handleSelected" :selected-reset="selected" :key="filteredSales.length" :columns="columns" :sales="filteredSales" />
      </div>
      <!-- new lane -->

      <AddSale @cancel="showPopup = false" :visible="showPopup" />
    </div>
  </div>






</template>

<script>
  import { localUrl } from '@/config/config'

  import SalesTable from './SalesTable.vue'
  import DashItem from '@/views/sale/partials/DashItem'
  import Sale from '@/api/Sale'
  import User from '@/api/User'
  import AddSale from '@/views/sale/partials/AddSale'
  import { confirmations, deliveryStatus } from '@/config/orders'


  export default {
    components: { SalesTable, DashItem, AddSale },
    data() {
      return {
        localUrl,
        confirmations,
        deliveryStatus,
        isLoaded: false,
        isLoadingReset: false,
        showFilters: false,
        confirmationFilter: 'all',
        affectationFilter: 'all',
        upsellFilter: 'all',
        deliveryFilter: 'all',
        agenteFilter: 'all',
        search: '',
        isButtonDisabled:true,

        selected: [],
        // new lane
        showPopup: false,

        columns:
          [
            {
              prop: 'id',
              name: '#',
            },
            {
              prop: 'date',
              name: 'Date',
            },
            {
              prop: 'city',
              name: 'City',
            },
              {
                prop: 'product',
                name: 'Product',
              },
            {
              prop: "client",
              name: "Client",
            },
            {
              prop: 'upsell',
              name: 'Upsell',
            },
            {
              prop: 'confirmation',
              name: 'Confirmation',
            },
            {
              prop: 'affectation',
              name: 'Affected',
            },
            {
              prop: 'delivery',
              name: 'Delivery',
            },
            {
              prop: "quantity",
              name: "Qty",
            },
            {
              prop: 'price',
              name: 'Price',
            },

            {
              prop: 'actions',
              name: 'Actions',
            },

          ],
      }
    },
    computed: {
      users() {
        return this.$store.getters['user/users']
      },
      deliveries() {
        return this.users.filter(i => i.role.id == 3)
      },
      agentes() {
        return this.users.filter(i => i.role.id == 2)
      },
      sales() {
        return this.$store.getters['sale/sales']
      },
      cities() {
        return this.$store.getters['city/cities']
      },
      newSales() {
        return {
          id: 1,
          title: 'New',
          value: this.sales.filter(i => !i.confirmation || i.confirmation == 'new').length,
          // value: 35,
          color: 'primary-green',
          icon: 'mdi mdi-new-box'
        }
      },
      toProcess() {
        return {
          id: 2,
          title: 'Process',
          value: this.sales.filter(
            i => (!!i.confirmation)
              && !(['confirmer', 'livre', 'expidier'].includes(i.confirmation))
          ).length,
          // value: 231,
          color: 'primary-orange',
          icon: 'mdi-reload'
        }
      },
      confirmedSales() {
        return {
          id: 3,
          title: 'Confirmed',
          value: this.sales.filter(i => i.confirmation == 'confirmer').length,
          // value: 112,
          color: 'deep-purple-accent-2',
          icon: 'mdi-phone-check'
        }
      },
      deliveredSales() {
        return {
          id: 4,
          title: 'Delivered',
          value: this.sales.filter(i => i.delivery == 'livrer').length,
          // value: 412,
          color: 'primary-blue',
          icon: 'mdi-account-check-outline'
        }
      },
      shippedSales() {
        return {
          id: 5,
          title: 'Shipped',
          value: this.sales.filter(i => i.delivery == 'expidier').length,
          // value: 112,
          color: 'red',
          icon: 'mdi-truck'
        }
      },
      filteredSales() {
        const confirmationFilter = this.confirmationFilter;
        const affectationFilter = this.affectationFilter;
        const upsellFilter = this.upsellFilter;
        const deliveryFilter = this.deliveryFilter;
        const agenteFilter = this.agenteFilter

        return this.sales.filter(item => {
          // filter by confirmation
          if (confirmationFilter !== 'all' && item.confirmation !== confirmationFilter) {
            return false;
          }

          // filter by affectation
          if (affectationFilter !== 'all' && parseInt(item.affectation) !== parseInt(affectationFilter)) {
            return false;
          }

          // filter by upsell
          if (upsellFilter !== 'all' && item.upsell != upsellFilter) {
            return false;
          }

          // filter by delivery
          if (deliveryFilter !== 'all' && item.delivery != deliveryFilter) {
            return false;
          }

          // filter by agente
          if (agenteFilter !== 'all' && parseInt(item.agente_id) != parseInt(agenteFilter)) {
            return false;
          }

          if (!item.fullname.toLowerCase().includes(this.search.toLowerCase()) && !item.product_name.toLowerCase().includes(this.search.toLowerCase())) {
            return false;
          }


          // if item passes all filters, include it in the filtered data
          return true;
        });
      }
    },
    methods: {

      handleSelected(value) {
        this.selected = value;
        
        // Enable the button if selected is not empty
        if (this.selected.length > 0) {
          this.isButtonDisabled = false;
        }else{
          this.isButtonDisabled = true;
        }
      },


      async getDeliveries() {

        await User.deliveries()
          .then(
            res => {
              console.log(res.data.data);
              this.$store.dispatch('user/setDeliveries', res.data.data);
            },
            this.$handleApiError
          )
      },

      async getUsers() {

        await User.all()
          .then(
            res => {
              console.log(res.data.data);
              this.$store.dispatch('user/setUsers', res.data.data.users);
            },
            this.$handleApiError
          )
      },

      getSales() {
        this.isLoaded = false
        return Sale.all().then(
          res => {
            if (res?.data.code == "SUCCESS") {
              const sales = res.data.data.orders
              console.log(res.data);
              this.$store.dispatch('sale/setSales', sales)
              this.$store.dispatch('sale/setFetched', true)
              this.isLoaded = true
            }
          }
        ).catch(this.$handleApiError)
      },

      getCities() {
        if (this.cities.length == 0) {
          return User.cities().then(
            res => {
              const cities = res.data.data
              this.$store.dispatch('city/setCities', cities)
            }
          )
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
                this.$store.dispatch('sale/resetSales', this.selected);
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
        await this.getDeliveries()
        this.getUsers()
      }
      if (!this.$store.getters['sale/fetched']) {
        this.getSales()
      } else {
        this.isLoaded = true
      }
      this.getCities()
    }
  }
</script>

<style>
</style>