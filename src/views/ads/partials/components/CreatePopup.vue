<template>
  <div>
    <popup-new :visible="visible" :closeable="false" @cancel="cancel">
      <div
        class="tw-mx-auto tw-w-[95%] md:tw-max-w-[800px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg">
        <div
          class="tw-p-4 tw-text-lg tw-border-b tw-border-solid tw-font-medium tw-flex dark:tw-text-neutral-400 tw-text-neutral-500 tw-items-center tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50">
          Ads Informations
        </div>

        <div class="tw-bg-white tw-p-4">
          <div class="tw-grid tw-gap-6 tw-gap-y-5 tw-grid-cols-1 md:tw-grid-cols-2">
            <div class="tw-col-span-2 md:tw-col-span-1">
              <label
                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Source</label>
              <select @change="errors[0].source = null" v-model="items[0].source"
                :class="[errors.source && '!tw-border-red-400']" required
                class="tw-capitalize tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500">
                <option :value="0" selected>Choose Source</option>
                <option v-for="s in sources" :key="s" :value="s" class="tw-capitalize">
                  {{ s }}
                </option>
              </select>
              <label v-if="errors.source"
                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                errors.source }}</label>
            </div>

            <div class="tw-col-span-2 md:tw-col-span-1">
              <label
                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Amount</label>
              <input v-model="items[0].amount" @input="errors[0].amount = null"
                :class="[errors.amount && '!tw-border-red-400']" type="text"
                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                required />

              <label v-if="errors.amount"
                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{ errors.amount
                }}</label>
            </div>

            <div class="tw-col-span-2 md:tw-col-span-1">
              <label
                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Leads</label>
              <input v-model="items[0].leads" @input="errors[0].leads = null"
                :class="[errors.leads && '!tw-border-red-400']" type="text"
                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                required />

              <label v-if="errors.leads"
                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{ errors.leads
                }}</label>
            </div>

            <div v-if="products_fetched" class="tw-col-span-2 md:tw-col-span-1">
              <label
                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Product</label>
        
              <vue-select :reduce="(o) => o.id" @option:selected="e=> items.product_id = e.id"  :clearable="false" class="tw-bg-gray-50 tw-border-solid tw-outline-none  tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full"
                  placeholder="All" v-model="items[0].product_id" :options="products" label="name">
                </vue-select>
              <label v-if="errors[0].product_id"
                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                errors.product_id }}</label>
            </div>

            <div v-if="user.role == 'admin' " class="tw-col-span-2 md:tw-col-span-1">
              <label
                class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Marketer </label>
              <select @change="errors[0].marketer_id = null" v-model="items[0].marketer_id"
                :class="[errors.marketer_id && '!tw-border-red-400']" required
                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500">
                <option :value="0" selected>Choose Marketer</option>
                <option v-for="m in marketers" :key="m.id" :value="m.id">
                  {{ m.firstname }} {{m.lastname}}
                </option>
              </select>
              <label v-if="errors.marketer_id"
                class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                errors.marketer_id }}</label>
            </div>

            <div class="md:tw-col-span-1 tw-col-span-2">
              <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Ads
                Date</label>
              <input v-model="items[0].ads_at" @input="handleDateInput()"
                :class="[errors.ads_at && '!tw-border-red-400']" type="date"
                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                required />
              <label class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white">{{
                errors.ads_at }}</label>
            </div>

            <div class="tw-col-span-2">
              <label class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white">Note</label>
              <textarea v-model="items[0].note" @input="note" rows="3"
                class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                placeholder="Enter a note"></textarea>

            </div>
            <div class="tw-col-span-2">
                  <button @click="addAd" class="tw-py-2 tw-px-4 tw-bg-orange-400 tw-text-white tw-rounded">Add Ad</button>
              </div>
          </div>
        </div>
        <div class="tw-bg-gray-100 tw-rounded-lg tw-p-4 tw-shadow-md">
        <h2 class="tw-text-lg tw-font-medium tw-mb-4">Added Ads</h2>
        <table class="tw-min-w-full tw-divide-y tw-divide-gray-200">
          <thead class="tw-bg-gray-50">
            <tr>
              <th class="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Product ID</th>
              <th class="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Marketer</th>
              <th class="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Source</th>
              <th class="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Amount</th>
              <th class="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Leads</th>
              <th class="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Ads Date</th>
              <th class="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Note</th>
              <th class="tw-px-4 tw-py-3 tw-text-left tw-text-xs tw-font-medium tw-text-gray-500 tw-uppercase">Action</th>
            </tr>
          </thead>
          <tbody class="tw-bg-white tw-divide-y tw-divide-gray-200">
            <tr v-for="(item, index) in items.slice(1)" :key="index">
              <td class="tw-px-4 tw-py-3 tw-whitespace-nowrap">{{ item.product_id }}</td>
              <td class="tw-px-6 tw-py-4 tw-whitespace-nowrap">{{ getMarketerNameById(item.marketer_id) }}</td>
              <td class="tw-px-4 tw-py-3 tw-whitespace-nowrap">{{ item.source }}</td>
              <td class="tw-px-4 tw-py-3 tw-whitespace-nowrap">{{ item.amount }}</td>
              <td class="tw-px-4 tw-py-3 tw-whitespace-nowrap">{{ item.leads }}</td>
              <td class="tw-px-4 tw-py-3 tw-whitespace-nowrap">{{ item.ads_at }}</td>
              <td class="tw-px-4 tw-py-3 tw-whitespace-nowrap">{{ item.note }}</td>
              <td class="tw-px-4 tw-whitespace-nowrap">
                <button @click="deleteAd(index + 1)" class="tw-px-2 tw-py-1 tw-w-[25px] tw-h-[25px] tw-border tw-border-solid tw-border-red-500/20 hover:tw-bg-red-500/10 hover:tw-border-red-500/70 tw-duration-300 tw-text-red-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center"><v-icon size="x-small">mdi-trash-can-outline</v-icon></button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
        <div
          class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-50 tw-border-t tw-border-solid">
          <button @click="cancel"
            class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300">
            Cancel
          </button>
          <button @click="handleCreate" :disabled="isLoading"
            class="tw-py-2 tw-px-7 tw-flex tw-items-center tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white">
            <v-icon size="small" class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
              :class="[isLoading && '!tw-max-w-[50px] !tw-mr-3']">mdi-loading</v-icon>
            <span>Create</span>
          </button>
        </div>
      </div>
    </popup-new>
  </div>
</template>

<script>
  import { validate } from "../lib/validate";
  import { create } from "../lib/create";
  import Product from "@/api/Product";
  import vueSelect from 'vue-select';

  export default {
    components: {
      'vue-select': vueSelect
    },

    props: {
      visible: {
        required: true,
      },
    },

    data() {
      return {
        isLoading: false,

        sources: ['facebook', 'google', 'tiktok','snapchat'],
        initialDate: null,
        products_fetched: null,
        products: [{id: 0, name: "Choose a product"}],
        items: [{
          product_id: 0,
          marketer_id:0,
          source: 0,
          amount: 0,
          leads:0,
          ads_at: null,
          note: null
        }],

        errors: [{
          product_id: null,
          marketer_id:null,
          source: null,
          amount: null,
          leads:null,
          ads_at: null,
        }],
      };
    },

    computed: {
      cities() {
        return this.$store.getters["city/cities"];
      },
      user() {
      return this.$store.getters["user/user"];
      },
      users() {
        return this.$store.getters['user/users']
      },
      marketers() {
        return this.fetched ? this.users.filter(u => u.role.name == 'marketer') : []
      },
      fetched() {
        return this.$store.getters['user/fetched']
      },
    },

    methods: {
      getMarketerNameById(id) {
        const marketer = this.marketers.find(m => m.id === id);
        return marketer ? `${marketer.firstname} ${marketer.lastname}` : '';
      },
      deleteAd(index) {
        this.items.splice(index, 1);
      },
      addAd() {
      // Create a new ad object
      const newAd = {
        product_id: this.items[0].product_id,
        marketer_id: this.items[0].marketer_id,
        source: this.items[0].source,
        amount: this.items[0].amount,
        leads: this.items[0].leads,
        ads_at: this.items[0].ads_at,
        note: this.items[0].note,
      };
      if (this.items[0].product_id !== 0 && this.items[0].source !== 0) {
        this.items.push(newAd);
        this.items[0] = {
          product_id: 0,
          marketer_id:0,
          source: newAd.source,
          amount: 0,
          leads:0,
          ads_at: this.initialDate,
          note: null
        };
        this.errors[0] = {
          product_id: null,
          marketer_id:null,
          source: null,
          amount: null,
          leads:null,
          ads_at: null,
        };
      }
    }, 
    handleDateInput() {
      if (!this.initialDate) {
        this.initialDate = this.items[0].ads_at;
      }
    },
    handleCreate() {
        const ads = this.items.map((ad) => {
          const validated = validate(this, ad);
          if (!validated) return null;
          return ad;
        });

        // Filter out any null values from failed validations
        const validAds = ads.filter(ad => ad !== null);

        if (validAds.length > 0) {
          create(this, validAds);
        }
      },

      cancel() {
        if (this.isLoading) return false;
        this.$emit("update:visible", false);
      },

      getProducts() {
        this.products_fetched = false;
        Product.allForOrder()
          .then((res) => {
            if (res.data.code == "SUCCESS") {
              this.products = [{id: 0, name: "Choose a product"} , ...res.data.data.products];
            } else {
              this.products = [{id: 0, name: "Choose a product"}];
            }

            this.products_fetched = true;
          })
          .catch(this.$handleApiError);
      },
    },

    mounted() {
      this.getProducts();
    },
  };
</script>

<style></style>