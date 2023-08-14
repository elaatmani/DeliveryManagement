<template>
  <div>
    <label
        class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
        >Affectation</label
    >
    <div v-if="fetched" class="tw-relative">
        <select
        :value="affectation"
        @change="handleChange"
        :disabled="item.followup_confirmation != 'reconfirmer'"
        :class="[error && '!tw-border-red-400', item.followup_confirmation != 'reconfirmer' && 'tw-cursor-not-allowed']"
        class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        >
        <option value="">Choose a Delivery</option>
        <option v-for="u in availableDeliveries" :value="u.id" :key="u.id">{{ u.name }}</option>
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
    v-if="fetched && error"
    class="tw-block tw-mb-2 tw-text-xs tw-font-medium tw-text-red-400 dark:tw-text-white"
    >{{ error }}</label
            >

    <div v-if="!fetched" class="tw-relative">
        <div class="tw-absolute tw-scale-75 tw-left-1/2 tw-top-1/2 -tw-translate-x-1/2 -tw-translate-y-1/2 tw-z-10">
            <loading />
        </div>

        <select
        disabled
        class="tw-opacity-30 tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        >
            <option :value="null" selected>Loading...</option>
        </select>
        <div
        class="tw-pointer-events-none tw-absolute tw-inset-y-0 tw-right-0 tw-flex tw-items-center tw-px-2 tw-text-gray-700"
        >
        </div>
    </div>
  </div>
</template>

<script>
import User from "@/api/User";

export default {
    props: {
        affectation: {
            required: true
        },
        error: {
            required: false,
            default: null
        },
        item: {
            required: true,
        },
    },

    data() {
        return {
            deliveries: [],
            fetched: false,
        }
    },

    computed: {
        availableDeliveries() {
            return this.deliveries.filter(d => d.has.some(id => this.item.items.some(p =>p.product_id == id)));
        },
        delivery() {
            return this.deliveries.find(d => d.id == this.affectation);
        }
    },

    watch: {
        'item.confirmation': {
            deep: true,
            handler() {
                // this.$emit('update:affectation', null)
            }
        },
        'item.items': {
            deep: true,
            handler() {
                if(!this.affectation) return false;

                if(!this.delivery.has.some(id => this.item.items.some(p =>p.product_id == id))) {
                    this.$emit('update:affectation', null)
                }
            }
        },
    },

  methods: {
    getDeliveries() {
        this.fetched = false;
        User.allDeliveries()
        .then((res) => {
            if (res?.data.code == "SUCCESS") {
            this.deliveries = res.data.data.deliveries;

            this.fetched = true;
            }
        })
        .catch(this.$handleApiError);
    },

    handleChange(e) {
        this.$emit('update:affectation', e.target.value)
        this.$emit('update:error', null)
    }
  },

  mounted() {
    this.getDeliveries()
  }
};
</script>

<style>
</style>