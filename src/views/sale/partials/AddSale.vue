<template>
  <div>
    <popup-full @cancel="$emit('cancel')" :visible="visible">
      <div
        v-if="!isLoaded"
        class="md:tw-w-[80%] tw-w-[95%] tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg"
      >
        <LoadingAnimation />
      </div>
      <div
        v-if="isLoaded"
        class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5"
      >
        <h1 class="tw-text-lg">Create Order</h1>

        <div class="tw-grid tw-grid-cols-12 tw-gap-y-1 tw-gap-x-3 mt-5">
          <div class="md:tw-col-span-6 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Client</div>
            <input
              type="text"
              v-model="sale.fullname"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            />
          </div>

          <div class="md:tw-col-span-6 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Phone</div>
            <input
              type="text"
              v-model="sale.phone"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            />
          </div>
          <div class="md:tw-col-span-6 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">City</div>
            <select
              v-model="sale.city"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            >
              <option :value="c.name" v-for="c in cities" :key="c.id">
                {{ c.name }}
              </option>
            </select>
          </div>

          <div class="md:tw-col-span-6 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Address</div>
            <input
              type="text"
              v-model="sale.adresse"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            />
          </div>
          <div class="md:tw-col-span-12 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Price</div>
            <input
              type="text"
              v-model="sale.price"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            />
          </div>

          <div class="md:tw-col-span-6 tw-col-span-12  tw-mt-3 tw-border-t tw-border-neutral-300 tw-pt-3">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Warehouse</div>
            <select
              v-model="warehouse_id"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            >
              <option :value="0">
                Select
              </option>
              <option :value="w.id" v-for="w in warehouses" :key="w.id">
                {{ w.name }}
              </option>
            </select>
          </div>

          <div class="md:tw-col-span-6 tw-col-span-12  tw-mt-3 tw-border-t tw-border-neutral-300 tw-pt-3">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Product</div>
            <select
              v-model="product_id"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            >
              <option :value="0">
                Select
              </option>
              <option :value="p.id" v-for="p in filtredProducts" :key="p.id">
                {{ p.name }}
              </option>
            </select>
          </div>

          <div class="md:tw-col-span-6 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Variations</div>
            <select
              v-model="product_variation_id"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            >
              <option :value="0">
                Select
              </option>
              <option :value="v.id" v-for="v in variations" :key="v.id">
                {{ v.size }} / {{ v.color }}
              </option>
            </select>
          </div>
          <div class="md:tw-col-span-6 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Quantity</div>
            <input
              type="number"
              v-model="quantity"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            />
          </div>
          <div class="md:tw-col-span-6 tw-col-span-12">
            <div class="tw-flex tw-items-center tw-w-full tw-text-neutral-600 dark:tw-text-neutral-200 tw-text-md tw-py-1">
                <label class="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer tw-w-fit  -tw-rotate-90 tw-scale-75">
                    <input type="checkbox" v-model="sale.counts_from_warehouse" class="tw-sr-only tw-peer">
                    <div class="tw-w-11 tw-h-6 tw-bg-gray-200 peer-focus:tw-outline-none  tw-rounded-full tw-peer dark:tw-bg-neutral-600 peer-checked:after:tw-translate-x-full peer-checked:after:tw-border-white after:tw-content-[''] after:tw-absolute after:tw-top-[2px] after:tw-left-[2px] after:tw-bg-white after:tw-border-gray-300 after:tw-border after:tw-rounded-full after:tw-h-5 after:tw-w-5 after:tw-transition-all dark:tw-border-gray-600"></div>
                </label>
                <label class="tw-flex tw-flex-col tw-justify-center">

                    <span :class="[sale.counts_from_warehouse ? 'tw-text-orange-500' : 'tw-text-neutral-500']" class="tw-ml-1 tw-text-sm tw-font-medium tw-duration-300">Warehouse</span>
                    <span :class="[!sale.counts_from_warehouse ? 'tw-text-orange-500' : 'tw-text-neutral-500']" class="tw-ml-1 tw-text-sm tw-font-medium tw-duration-300">Delivery</span>
                </label>
            </div>
          </div>
          <div class="md:tw-col-span-6 tw-col-span-12">
            <button @click="addItem" class="tw-block tw-ml-auto tw-py-1 tw-px-4 tw-rounded tw-bg-emerald-500 tw-text-white">
              Add
            </button>
          </div>

          <div v-if="items.length" class="md:tw-col-span-12 tw-col-span-12">
            <div class="tw-max-w-full tw-overflow-auto">
              <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
                <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
                  <tr>
                    <th
                      v-for="column in [
                        'product',
                        'variation',
                        'quantity',
                        'warehouse',
                        'actions'
                      ]"
                      :class="[column == 'actions' && '!tw-w-[40px]']"
                      :key="column"
                      scope="col"
                      class="tw-px-6 tw-py-3 text-truncate"
                    >
                      <div
                        class="tw-w-fit tw-flex tw-whitespace-nowrap tw-capitalize"
                      >
                        {{ column }}
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="item in items"
                    :key="item"
                    class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50"
                  >
                    <th
                      scope="row"
                      class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
                    >
                      {{ item.product.name }}
                    </th>
                    <th
                      scope="row"
                      class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
                    >
                      {{ item.product_variation.size }} / {{ item.product_variation.color }}
                    </th>
                    <th
                      scope="row"
                      class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
                    >
                      {{ item.quantity }}
                    </th>
                    <th
                      scope="row"
                      class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
                    >
                      {{ item.product_variation.warehouse.name }}
                    </th>
                    <th
                      scope="row"
                      class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
                    >
                      <div>
                        <v-btn @click="deleteItem(item.id)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
                          <v-icon color="white">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="tw-flex tw-gap-2 mt-3 mb-2 tw-justify-end">
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
            @click="create"
            color="primary-color"
            variant="flat"
            class="text-capitalize"
          >
            <span class="text-white"> Save </span>
          </v-btn>
        </div>
      </div>
    </popup-full>
  </div>
</template>

<script>
import Product from "@/api/Product";
import Sale from "@/api/Sale";
export default {
  props: ["visible"],

  data() {
    return {
      isLoading: false,
      isLoaded: false,

      product_id: 0,
      product_variation_id: 0,
      warehouse_id: 0,
      quantity: 1,

      item_id: 1,
      items: [],

      sale: {
        fullname: "",
        phone: "",
        city: "",
        adresse: "",
        price: 0,
        counts_from_warehouse: true
      },
    };
  },

  watch: {
    product_id() {
      this.product_variation_id = 0;
    },
    warehouse_id() {
      this.product_id = 0
      this.product_variation_id = 0
    }
  },

  computed: {
    products() {
      return this.$store.getters["product/products"];
    },

    warehouses() {
      const warehouses = this.products.flatMap(
        p => {
          return p.variations.map(v => v.warehouse)
        })

      const warehouses_ids = warehouses.map(w => w.id)

      return warehouses.filter((item, index) => warehouses_ids.indexOf(item.id) === index);
    },

    filtredProducts() {
      if(this.warehouse_id == 0) {
        return []
      }

      return this.products.filter(p => p.variations.some(v => v.warehouse_id == this.warehouse_id))
    },

    cities() {
      return this.$store.getters["city/cities"];
    },

    variations() {
      if(this.product_id == 0) {
        return []
      }

      return this.products.find(p => p.id == this.product_id) .variations
    },

    isFormValid() {
      return (
        !!this.sale.fullname &&
        !!this.sale.phone &&
        !!this.sale.adresse &&
        this.sale.price != 0 &&
        this.items.length > 0 &&
        !!this.sale.city
      );
    },
  },

  methods: {
    create() {

  
      if(!this.isFormValid) {
        this.$alert({
              type: "warning",
              title: "Please fill all the form",
            });
        return false
      }
      this.isLoading = true;

      const sale = {
        fullname: this.sale.fullname,
        phone: this.sale.phone,
        city: this.sale.city,
        price: this.sale.price,
        adresse: this.sale.adresse,
        orderItems: this.items,
        counts_from_warehouse: true
      }

      Sale.create(sale)
        .then((res) => {
          if (res.data.code == "SALE_ADDED") {
            this.$emit("cancel");
            this.$alert({
              type: "success",
              title: "Sale created successfully",
            });

            this.$store.dispatch('sale/add', res.data.data.sale)
          }
        }, this.$handleApiError)
        .finally(() => (this.isLoading = false));
    },

    deleteItem(id) {
      this.items = this.items.filter(i => i.id != id)
    },

    addItem() {
      if([this.warehouse_id, this.product_id, this.product_variation_id].includes(0)) {
        this.$alert({
          title: 'Choose a product',
          type: 'warning'
        })
        return false;
      }

      const product = this.filtredProducts.find(p => p.id == this.product_id);
      const product_variation = this.variations.find(p => p.id == this.product_variation_id);

      const item = {
        id: this.item_id,
        product_id: product.id,
        product_ref: product.ref,
        product: product,
        product_variation: product_variation,
        product_variation_id: product_variation.id,
        quantity: this.quantity
      }

      this.items.push(item)
      this.product_id = 0
      this.product_variation_id = 0
      this.item_id += 1
    
    },

    getProducts() {
      Product.all()
        .then(
          (res) => {
            if (res.data.code == "SUCCESS") {
              this.$store.dispatch(
                "product/setProducts",
                res.data.data.products
              );

            }
          },
          (err) => {
            this.$handleApiError(err);
          }
        )
        .finally(() => (this.isLoaded = true));
    },
  },

  mounted() {
    this.getProducts();
    this.sale.city = this.cities[0].name || 1;
  },
};
</script>

<style>
</style>