<template>
  <tr>
    <td>
      
    </td>
    <td>
      <div class="tw-p-2">
        <div class="tw-relative">
          <select
            @change="handleProductChange"
            :value="item.product_id"
            class="tw-block tw-border-solid focus:tw-outline-none tw-w-full tw-p-2 tw-pr-6 tw-text-xs tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded tw-bg-gray-50 focus:tw-ring-orange-500 focus:tw-border-orange-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
          >
            <option :value="0" selected>Choose Product</option>
            <option v-for="p in products" :key="p.id" :value="p.id">{{ p.name }}</option>
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
    </td>
    <td>
      <div class="tw-p-2">
        <div class="tw-relative" v-if="item.product_id">

          <select
            v-if="product.variations.length > 1"
            @change="handleVariationChange"
            :value="item.product_variation_id"
            class="tw-block tw-border-solid focus:tw-outline-none tw-w-full tw-p-2 tw-pr-6 tw-text-xs tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded tw-bg-gray-50 focus:tw-ring-orange-500 focus:tw-border-orange-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
          >
            <option value="" disabled>Choose Variation</option>
            <option v-for="pv in product.variations" :key="pv.id" :value="pv.id">{{ pv.color }} {{ pv.size }}</option>
          </select>
            <!-- <div v-else class="tw-block tw-whitespace-nowrap tw-border-solid focus:tw-outline-none tw-w-full tw-p-2 tw-pr-6 tw-text-xs tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded tw-bg-gray-50 focus:tw-ring-orange-500 focus:tw-border-orange-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500">
                Default
            </div> -->

          <!-- <select
            v-else
            class="tw-block tw-border-solid focus:tw-outline-none tw-w-full tw-p-2 tw-pr-6 tw-text-xs tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded tw-bg-gray-50 focus:tw-ring-orange-500 focus:tw-border-orange-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
          >
            <option :value="0">Default {{  }}</option>
          </select> -->

          <div
          v-if="product.variations.length > 1"
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
    </td>
    <td>
      <div class="tw-p-2">
        <input
          @input="e => $emit('update', {...item, quantity: parseInt(e.target.value) >= 0 ? parseInt(e.target.value) : 0})"
          :value="item.quantity"
          min="0"
          type="number"
          class="focus:tw-outline-none tw-border-solid tw-block tw-w-24 tw-p-2 tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-gray-50 sm:tw-text-xs focus:tw-ring-orange-500 focus:tw-border-orange-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
        />
      </div>
    </td>
    <td>
      <div class="tw-p-2">
        <input
          @input="e => $emit('update', {...item, price: parseFloat(e.target.value)})"
          :value="item.price"
          min="0"
          type="number"
          class="focus:tw-outline-none tw-border-solid tw-block tw-w-24 tw-p-2 tw-text-gray-900 tw-border tw-border-gray-300 tw-rounded-lg tw-bg-gray-50 sm:tw-text-xs focus:tw-ring-orange-500 focus:tw-border-orange-500 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-white dark:focus:tw-ring-orange-500 dark:focus:tw-border-orange-500"
        />
      </div>
    </td>
    <td>
      <div class="tw-flex tw-justify-center">
        <button
            @click="handleDelete"
          class="tw-px-2 tw-py-1 tw-w-[25px] tw-h-[25px] tw-border tw-border-solid tw-border-red-500/20 hover:tw-bg-red-500/10 hover:tw-border-red-500/70 tw-duration-300 tw-text-red-500/80 tw-rounded-md tw-flex tw-items-center tw-justify-center"
        >
          <v-icon size="x-small">mdi-delete-outline</v-icon>
        </button>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
    props: {
        item: {
            required: true,
        },
        products:{
            required: true,
        }
    },

    computed: {
        product() {
            if(this.item.product_id == 0) return null;
            return this.products.find(p => p.id == this.item.product_id)
        }
    },

    methods: {
        handleProductChange(e) {
            const id = parseInt(e.target.value);
            if(!id) return false;

            const product = this.products.find(p => p.id == id);
            console.log(product.variations.length > 0 ? product.variations[0].id : null);
            const item = {
                ...this.item,
                product_id: id,
                product: product,
                product_ref: product.ref,
                product_variation_id: product.variations.length > 0 ? product.variations[0].id : null,
                product_variation: product.variations.length > 0 ? product.variations[0] : null,
            }
            
            this.$emit('update', item)
        },

        handleVariationChange(e) {
            this.$emit('update', {
                ...this.item, 
                product_variation: this.product.variations.find(v => v.id == parseInt(e.target.value)),
                product_variation_id: parseInt(e.target.value)
            })
        },

        handleDelete() {
            this.$emit('delete', this.item.id)
        }
    },

    mounted() {
    }

};
</script>

<style>
</style>