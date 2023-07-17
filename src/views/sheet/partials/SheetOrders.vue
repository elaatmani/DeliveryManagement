<template>
  <div>
    <popup-full @cancel="$emit('cancel')" :visible="visible">
      <div
        class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5"
      >
        <div v-if="orders.length > 0">
            <div class="tw-flex tw-items-center tw-gap-2 tw-mb-2">
                <h1 class="tw-text-sm tw-font-medium tw-text-neutral-700">Sheet's New Orders</h1>
                <div class="tw-bg-emerald-500 tw-text-white tw-px-1 tw-text-sm tw-rounded">
                    {{ orders.length }}
                </div>
            </div>

          <div>
            <div class="tw-relative tw-overflow-x-auto">
              <table
                class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500 tw-border tw-rounded "
              >
                <thead
                  class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50 tw-rounded-t tw-overflow-hidden"
                >
                  <tr>
                    <th scope="col" class="tw-px-6 tw-py-3">Fullname</th>
                    <th scope="col" class="tw-px-6 tw-py-3">Product</th>
                    <th scope="col" class="tw-px-6 tw-py-3">SKU</th>
                    <th scope="col" class="tw-px-6 tw-py-3">Qty</th>
                    <th scope="col" class="tw-px-6 tw-py-3">Price</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="o in orders" :key="o"
                    class="tw-bg-white tw-border-b "
                  >
                    <td class="tw-px-6 tw-py-2">{{ o['Full name'] }}</td>
                    <td class="tw-px-6 tw-py-2">
                        <div>
                            <p v-for="p in o['Product name'].split('\n')" :key="p">- {{ p }}</p>
                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-2">
                        <div>
                            <p v-for="p in o['SKU'].split('\n')" :key="p">{{ p }}</p>
                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-2">
                        <div>
                            <p v-for="p in o['Total quantity'].split('\n')" :key="p">{{ p }}</p>
                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-2">{{ o['Total charge'] }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          <div class="tw-flex tw-gap-2 mt-3 tw-justify-end">
            <v-btn
              @click="$emit('cancel')"
              color="grey-darken-2"
              variant="flat"
              class="text-capitalize"
            >
              <span class="text-white"> Cancel </span>
            </v-btn>
            <v-btn
              :loading="isLoading"
              @click="save"
              color="primary-color"
              variant="flat"
              class="text-capitalize"
            >
              <span class="text-white"> Save Orders</span>
            </v-btn>
          </div>
        </div>
      </div>
    </popup-full>
  </div>
</template>

<script>
import Sheet from '@/api/Sheet';
// import Sheet from '@/api/Sheet';

export default {
  props: ["visible", "sheet", "orders"],

  data() {
    return {
      isLoading: false,
    };
  },

  computed: {
    sales() {
      return this.$store.getters["sale/sales"];
    }
  },

  methods: {
    save() {
        this.isLoading = true
        Sheet.saveOrders(this.sheet.id)
        .then(
            res => {
                if(res.data.code == 'SUCCESS') {
                    this.$alert({
                        title: res.data.data.orders.length + ' Order has been added',
                        type: 'success'
                    })
                    this.$store.dispatch("sale/setSales", [...res.data.data.orders, ...this.sales]);
                    this.$emit('cancel');
                }
            },
          err => { 
            this.$handleApiError(err);
            if(err?.response?.data?.code == 'PERMISSION_DENIED') {
              this.$alert({
                title: 'Access denied to this sheet',
                type: 'warning'
              })
            }
          }
)
        .finally(
            () => {
                this.isLoading = false;
            }
        )
        
    }
  },
};
</script>

<style>
</style>