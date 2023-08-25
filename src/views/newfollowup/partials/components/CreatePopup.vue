<template>
  <div>
    <popup-new :visible="visible" :closeable="false" @cancel="cancel">
      <div
        class="tw-mx-auto tw-w-[95%] md:tw-max-w-[800px] tw-overflow-hidden tw-h-fit dark:tw-bg-neutral-900 tw-bg-white tw-border tw-border-solid dark:tw-border-neutral-700 tw-border-neutral-300 tw-shadow-md tw-my-5 tw-rounded-lg"
      >
        <div
          class="tw-p-4 tw-text-lg tw-border-b tw-border-solid tw-font-medium tw-flex dark:tw-text-neutral-400 tw-text-neutral-500 tw-items-center tw-gap-4 dark:tw-bg-neutral-800 tw-bg-gray-50"
        >
          Order Informations
        </div>

        <div class="tw-bg-white tw-p-4">
            <div class="tw-grid tw-gap-6 tw-gap-y-5 tw-grid-cols-1 md:tw-grid-cols-2">

              <div class="tw-col-span-2 md:tw-col-span-1">
                <label
                  class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >Client Name</label
                >
                <input
                  v-model="itemCopy.fullname"
                  @input="errors.fullname = null"
                  type="text"
                  :class="[errors.fullname && '!tw-border-red-400']"
                  class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                  placeholder="John"
                  required
                />
                <label
                  v-if="errors.fullname"
                  class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white"
                  >{{ errors.fullname }}</label
                >
              </div>

              <div class="tw-col-span-2 md:tw-col-span-1">
                <label
                  class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >Phone Number</label
                >
                <input
                  v-model="itemCopy.phone"
                  @input="errors.phone = null"
                  :class="[errors.phone && '!tw-border-red-400']"
                  type="text"
                  class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                  placeholder="123-45-678"
                  required
                />
                <label
                  v-if="errors.phone"
                  class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white"
                  >{{ errors.phone }}</label
                >
              </div>

              <div class="tw-col-span-2 md:tw-col-span-1">
                <label
                  class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
                  >City</label
                >
                <div class="tw-relative">
                  <select
                    v-model="itemCopy.city"
                    @change="errors.city = null"
                    :class="[errors.city && '!tw-border-red-400']"
                    class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 tw-pr-7"
                  >
                    <option :value="null" disabled>Choose a City</option>
                    <option :value="itemCopy.city" disabled>{{ itemCopy.city }}</option>
                    <option v-for="c in cities" :value="c.name" :key="c.id">{{ c.name }}</option>
                  </select>
                  <div
                    class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700"
                  >
                    <svg
                      class="tw-fill-current tw-h-4 tw-w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </div>
                <label
                  v-if="errors.city"
                  class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white"
                  >{{ errors.city }}</label
                >
              </div>

              <div class="tw-col-span-2 md:tw-col-span-1">
                <label
                  class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >Address</label
                >
                <input
                  v-model="itemCopy.adresse"
                  @input="errors.adresse = null"
                  :class="[errors.adresse && '!tw-border-red-400']"
                  type="text"
                  class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                  placeholder="Address"
                  required
                />
                <label
                  v-if="errors.adresse"
                  class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white"
                  >{{ errors.adresse }}</label
                >
              </div>

              <div class="tw-col-span-2">
                <label
                  class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
                  >Reconfirmation</label
                >
                <div class="tw-relative">
                  <select
                    v-model="itemCopy.followup_confirmation"
                    @change="errors.followup_confirmation = null"
                  :class="[errors.followup_confirmation && '!tw-border-red-400']"
                    class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
                  >
                    <option :value="c.value" :class="[c.text, !c.value && '!tw-text-green-500']" v-for="c in followup_confirmations" :key="c.id">{{ c.name }}</option>
                  </select>
                  <div
                    class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700"
                  >
                    <svg
                      class="tw-fill-current tw-h-4 tw-w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </div>
                <label
                  v-if="errors.followup_confirmation"
                  class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white"
                  >{{ errors.followup_confirmation }}</label
                >
              </div>

              <div class="md:tw-col-span-1 tw-col-span-2" v-if="itemCopy.followup_confirmation == 'reporter'">
                <label
                  class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >Reported Date</label
                >
                <input
                  v-model="itemCopy.followup_reported_date"
                  @input="errors.followup_reported_date = null"
                  :class="[errors.followup_reported_date && '!tw-border-red-400']"
                  type="date"
                  class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                  required
                />
                <label
                  v-if="errors.followup_reported_date"
                  class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white"
                  >{{ errors.followup_reported_date }}</label
                >
              </div>

              <div class="md:tw-col-span-1 tw-col-span-2" v-if="itemCopy.followup_confirmation == 'reporter'">
                <label
                  class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >Reported Note</label
                >
                <textarea
                    v-model="itemCopy.followup_reported_note"
                    rows="1"
                    class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                    placeholder="Enter a note"
                  ></textarea>
              </div>

              <div class="tw-col-span-2">
                <label
                  class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900 dark:tw-text-white"
                  >Note</label
                >
                <textarea
                v-model="itemCopy.note"
                @input="errors.note = null"
                  :class="[errors.note && '!tw-border-red-400']"
                rows="3"
                  class="tw-bg-gray-50 tw-border tw-border-solid focus:tw-outline-none tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
                  placeholder="Enter a note"
                ></textarea>
                <label
                  v-if="errors.note"
                  class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white"
                  >{{ errors.note }}</label
                >
              </div>

              <div class="md:tw-col-span-1 tw-col-span-2">
                <OrderAffectation :item="itemCopy" v-model:error="errors.affectation" v-model:affectation="itemCopy.affectation" />
              </div>

              <div class="md:tw-col-span-1 tw-col-span-2">
                <label
                  class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
                  >Upsell</label
                >
                <div class="tw-relative">
                  <select
                  v-model="itemCopy.upsell"
                    class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
                  >
                    <option :class="[u.text]" :value="u.value" v-for="u in upsells" :key="u.id">{{ u.name }}</option>
                  </select>
                  <div
                    class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700"
                  >
                    <svg
                      class="tw-fill-current tw-h-4 tw-w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <path
                        d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              <div class="tw-col-span-2">
                <label
                  class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
                  >Order Items <span v-if="errors.items" class="tw-text-red-400 tw-text-xs"> # {{errors.items}}</span></label
                >
                <div>
                  <OrderItems :order="itemCopy" :error="errors.items" :products="products" :products-fetched="products_fetched" v-model:items="itemCopy.items" />
                </div>
              </div>

              </div>
        </div>

        <div
          class="tw-flex tw-justify-end tw-items-center tw-p-4 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-50 tw-border-t tw-border-solid"
        >
          <button
            @click="cancel"
            class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300"
          >
            Cancel
          </button>
          <button
            @click="handleCreate"
            :disabled="isLoading"
            class="tw-py-2 tw-px-7 tw-flex tw-items-center  tw-rounded tw-text-sm tw-bg-orange-400 tw-border tw-border-solid tw-border-tansparent hover:tw-border-orange-600 dark:tw-border-neutral-900 dark:hover:tw-border-orange-500 hover:tw-bg-orange-500/80 dark:hover:tw-bg-orange-400 tw-duration-300 tw-text-white"
          >
            <v-icon
              size="small"
              class="tw-duration-300 tw-animate-spin tw-overflow-hidden tw-max-w-0 tw-mr-0"
              :class="[isLoading && '!tw-max-w-[50px] !tw-mr-3']"
              >mdi-loading</v-icon
            >
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
import { confirmationsFollowup, upsells } from '@/config/orders';
import OrderItems from '@/views/newfollowup/partials/components/OrderItems'
import OrderAffectation from '@/views/newfollowup/partials/components/OrderAffectation'
import Product from '@/api/Product';

export default {
  components: { OrderItems, OrderAffectation },

  props: {
    visible: {
      required: true,
    },
  },

  data() {
    return {
      followup_confirmations: confirmationsFollowup,
      upsells: upsells,
      isLoading: false,

      products_fetched: null,
      products: null,
      itemCopy: null,

      errors: {
        fullname: null,
        phone: null,
        city: null,
        adresse: null,
        note: null,
        reported_agente_date: null,
        affectation: null,
        items: null
      }
    };
  },

  computed: {
    cities() {
      return this.$store.getters["city/cities"];
    }
  },

  methods: {
    handleCreate() {
      const validated = validate(this, this.itemCopy);
      if (!validated) return false;

      create(this, this.itemCopy);
    },

    cancel() {
      if (this.isLoading) return false;
      this.$emit("update:visible", false);
    },

    getProducts() {
      this.products_fetched = false;
      Product.allForOrder()
      .then((res) => {
        if(res.data.code == 'SUCCESS') {
          this.products = res.data.data.products;
        } else {
          this.products = [];
        }

        this.products_fetched = true;
      })
      .catch(this.$handleApiError)
    }
  },

  mounted() {
    this.itemCopy = {
        confirmation: 'confirmer',
        upsell: null,
        items: []
    }
    this.getProducts();
  
  }
};
</script>

<style>
</style>