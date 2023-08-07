<template>
  <div>
    <popup-full @cancel="$emit('update:visible', false)" :visible="visible">
      <div
        v-if="!isLoaded"
        class="md:tw-w-[80%] tw-w-[95%] tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg"
      >
        <LoadingAnimation />
      </div>
      <div
        v-if="isLoaded"
        class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[950px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5"
      >
        <h1 class="tw-text-lg">Update Order</h1>

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
            <option disabled :value="sale.city">
                {{ sale.city }}
              </option>
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

          <div
            class="md:tw-col-span-12 tw-col-span-12 tw-mt-3 tw-border-t tw-border-neutral-300 tw-pt-3"
          >
            <div class="mb-1 text-body-2 tw-text-zinc-700">Confirmation</div>
            <AddOrderConfirmation
              :order="sale"
              :id="sale.id"
              v-model:confirmation="sale.confirmation"
              @change="handleConfirmationChange"
              @confirmed="(note) => sale.note = note"
              @reported="handleReported"
            />
            <div class="tw-grid tw-grid-cols-12 tw-gap-3 tw-my-3">
              <div class="tw-col-span-12">
                <div class="mb-1 text-body-2 tw-text-zinc-700">Note:</div>
                <textarea class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500" v-model="sale.note"></textarea>
              </div>
            </div>
            <div v-if="sale.confirmation == 'reporter' && !!sale.reported_agente_date" class="tw-grid tw-grid-cols-12 tw-gap-3 tw-my-3">
              <div class="tw-col-span-12 md:tw-col-span-4">
                <div class="mb-1 text-body-2 tw-text-zinc-700">Reported Date:</div>
                <div>{{ sale.reported_agente_date.split('T')[0]   }}</div>
              </div>
              <div class="tw-col-span-12 md:tw-col-span-8">
                <div class="mb-1 text-body-2 tw-text-zinc-700">Reported Note:</div>
                <textarea class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500" v-model="sale.reported_agente_note"></textarea>
              </div>
            </div>
            
          </div>
          <div class="md:tw-col-span-6 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Affectation</div>
            <AddOrderAffectation :product-ids="product_ids" :items="formatedItems" :order="sale" :confirmation="sale.confirmation" v-model:affectation="sale.affectation" :id="sale.id" />
          </div>
          <div class="md:tw-col-span-6 tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Upsell</div>
            <select
              v-model="sale.upsell"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            >
              <option :value="u.value" v-for="u in upsells" :key="u.id">
                {{ u.name }}
              </option>
            </select>
          </div>

          <div
v-if="false"

            class="md:tw-col-span-6 tw-col-span-12 tw-mt-3 tw-border-t tw-border-neutral-300 tw-pt-3"
          >
            <div class="mb-1 text-body-2 tw-text-zinc-700">Warehouse</div>
            <select
              v-model="warehouse_id"
              class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
            >
              <option :value="0">Select</option>
              <option :value="w.id" v-for="w in warehouses" :key="w.id">
                {{ w.name }}
              </option>
            </select>
          </div>

          <!-- <div class="md:tw-col-span-6 tw-col-span-12">
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
          </div> -->

          <p class="tw-col-span-12 tw-mt-5 tw-mb-2">Order Items</p>

          <p v-if="!items.length" class="tw-col-span-12 tw-rounded tw-text-center tw-p-5 tw-text-gray-700 tw-bg-gray-50">
            No Order items 
          </p>

          <div v-if="items.length" class="md:tw-col-span-12 tw-col-span-12">
            <div class="tw-max-w-full tw-overflow-auto">
              <table :key="items.length" class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
                <thead
                  class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50"
                >
                  <tr>
                    <th
                      v-for="column in [
                        'product',
                        '',
                        'variation',
                        'quantity',
                        'price',
                        'actions',
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
                    v-for="(item, i) in items"
                    :key="item"
                    class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50"
                  >
                  <th
                      scope="row"
                      class="tw-px-2 tw-py-2"
                      :key="item.product.id"
                    >
                      <div class="tw-mx-auto tw-w-[50px] tw-h-[35px] tw-shadow tw-shadow-gray-200 tw-rounded tw-overflow-hidden tw-cursor-pointer">
                        <img v-if="!!product_images[i]" class="tw-w-full tw-h-full tw-object-contain" :src="serverUrl + 'storage/' + product_images[i]" />
                      </div>
                    </th>
                    <th
                      scope="row"
                      class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
                    >
                      <div>
                        <div
                          
                        >
                          <select
                            v-model="item.product.id"
                            class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-min-w-[150px] tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
                          >
                            <option :value="0">Select</option>
                            <option :value="p.id" v-for="p in filtredProducts" :key="p.id">
                              {{ p.name }}
                            </option>
                          </select>
                        </div>
                      </div>
                    </th>
                    <th
                      scope="row"
                      class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
                    ><div>
                      <select
                        v-model="item.product_variation.id"
                        class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-min-w-[150px] tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
                      >
                        <option :value="0">Select</option>
                        <option :value="v.id" v-for="v in getVariations(item.product)?.variations" :key="v.id">
                          <p v-if="!v.size && !v.color">-</p>
                          <p v-else-if="!!v.size && !!v.color">
                            {{ v.size }} / {{ v.color }}
                          </p>
                          <p v-else-if="!!v.size">{{v.size}}</p>  
                          <p v-else-if="!!v.color">{{v.color}}</p>  
                        </option>
                      </select>
                    </div>
                    </th>
                    <th
                      scope="row"
                      class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
                    >
                    <div class="md:tw-col-span-6 tw-col-span-12">
                        <input
                          type="number"
                          v-model="item.quantity"
                          placeholder="Quantity"
                          class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-w-[80px] tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
                        />
                      </div>
                    </th>
                    <th
                      scope="row"
                      class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
                    >
                    <div>
                      <div v-if="item.price == null">
                        -
                      </div>
                      <div v-else class="md:tw-col-span-6 tw-col-span-12">
                          <input
                            type="number"
                            v-model="item.price"
                            placeholder="Price"
                            class="tw-py-2 tw-outline-none tw-duration-300 tw-px-3 tw-min-w-[100px] tw-max-w-[150px] tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
                          />
                        </div>
                    </div>
                    </th>
                    <!-- <th
                      scope="row"
                      class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
                    >
                      {{ item.product_variation.warehouse.name }}
                    </th> -->
                    <th
                      scope="row"
                      class="tw-px-6 tw-py-2 tw-font-medium tw-text-gray-900"
                    >
                      <div>
                        <v-btn
                          @click="deleteItem(item.id)"
                          class="mr-2 !tw-px-0 !tw-py-0"
                          min-height="25px"
                          min-width="30"
                          color="red"
                          variant="flat"
                          density="comfortable"
                          :ripple="false"
                          size="small"
                        >
                          <v-icon color="white">mdi-delete-outline</v-icon>
                        </v-btn>
                      </div>
                    </th>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
            <div class="tw-w-full tw-col-span-12 tw-flex tw-justify-end tw-mt-3">
              <div>
                <v-btn
                @click="addNewRow"
                  class="mr-2 !tw-px-1 !tw-py-1 !tw-pr-2 tw-flex tw-items-center tw-gap-2"
                  min-height="25px"
                  min-width="30"
                  color="green"
                  variant="flat"
                  density="comfortable"
                  :ripple="false"
                >
                  <v-icon color="white">mdi-plus</v-icon>
                  <span class="!tw-text-sm !tw-capitalize">Add</span>
                </v-btn>
              </div>
            </div>

            <div class="md:tw-col-span-12 tw-col-span-12">
              <ProductOffers :product-ids="product_ids" />
            </div>

          <div class="md:tw-col-span-12 tw-col-span-12 tw-grid tw-grid-cols-12 tw-mt-5 tw-gap-5">
            <div class="md:tw-col-span-6 tw-col-span-12"></div>
            <div class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-items-center tw-mb-2 tw-gap-5 tw-justify-end">
              <div class="tw-font-medium tw-text-zinc-700 tw-mb-2 tw-whitespace-nowrap">Price: </div>
              <input
                type="number"
                v-model="sale.price"
                class="tw-py-1 tw-max-w-[100px] tw-outline-none tw-duration-300 tw-px-3 tw-w-full tw-rounded-lg tw-border tw-border-solid tw-border-neutral-300 focus:tw-border-orange-500"
              />
            </div>
          </div>
          <div class="md:tw-col-span-12 tw-col-span-12 tw-grid tw-grid-cols-12 tw-mt-5 tw-gap-5">
            <div class="md:tw-col-span-6 tw-col-span-12"></div>
            <div class="md:tw-col-span-6 tw-col-span-12 tw-flex tw-items-center tw-mb-2 tw-gap-5 tw-justify-end">
              <div class="tw-font-medium tw-text-zinc-700 tw-whitespace-nowrap">Total Price: </div>
              <div class="tw-font-medium">{{ total_price }}</div>
            </div>
          </div>
        </div>

        <div class="tw-flex tw-gap-2 mt-3 mb-2 tw-justify-end">
          <v-btn
            @click="handleCancel"
            color="grey-darken-2"
            variant="flat"
            class="text-capitalize"
          >
            <span class="text-white"> Cancel </span>
          </v-btn>
          <v-btn
            :loading="isLoading"
            @click="update"
            color="primary-color"
            variant="flat"
            class="text-capitalize"
          >
            <span class="text-white"> Update </span>
          </v-btn>
        </div>
      </div>
    </popup-full>
  </div>
</template>

<script>
import Sale from "@/api/Sale";
import { upsells } from "@/config/orders";
import Product from "@/api/Product";
import AddOrderConfirmation from "@/views/order/partials/AddOrderConfirmation";
import AddOrderAffectation from '@/views/order/partials/AddOrderAffectation';
import ProductOffers from '@/views/sale/partials/ProductOffers'
import { serverUrl } from '@/config/config';

export default {
  components: { AddOrderConfirmation , AddOrderAffectation, ProductOffers },
  props: ["visible", "order"],

  data() {
    return {
      upsells,
      serverUrl,
      isLoading: false,
      isAddItem: false,

      product_id: 0,
      product_variation_id: 0,
      warehouse_id: 0,
      quantity: 1,

      item_id: 1,
      items: [],

      reported_date: null,
      price: 0,

      sale: {
        fullname: "",
        phone: "",
        city: "",
        adresse: "",
        price: 0,
        upsell: null,
        confirmation: null,
        counts_from_warehouse: false,
      },
    };
  },

  watch: {
    product_id() {
      
      if(!!this.selectedProduct && this.selectedProduct.variations.length > 0) {
        this.product_variation_id = this.selectedProduct.variations[0].id;
      } else {
        this.product_variation_id = 0;
      }
    },
    warehouse_id() {
      this.product_id = 0;
      this.product_variation_id = 0;
    },

    'sale.confirmation': {
      deep: true,
      handler(newConfirmation) {
        if(newConfirmation != 'confirmer') {
          this.sale.affectation = null;
          this.sale.delivery = null;
        }
      }
    },

    // product_ids() {
    //     this.items.map(i => {
    //     if(!i) return i;
    //     const {exists, variation} = this.checkVariant(i.product.id, i.product_variation.id);

    //     if((i.product.id != 0 || !i.product.id) && exists) {
    //       i.product_variation = variation;
    //       i.product_variation_id = variation.id;
    //     }

    //     return i;
    //   })
    // }
  },

  computed: {
    products() {
      return this.$store.getters["product/products"];
    },

    product_images() {
      return this.items.map(i => {
        if(i.product.id == 0) return null;
        return this.products.find(p => p.id == i.product.id)?.image;
      })
    },

    product_ids() {
      return this.items.map(i => i.product.id)
    },

    isLoaded() {
      return this.$store.getters["product/fetched"];
    },

    warehouses() {
      const warehouses = this.products.flatMap((p) => {
        return p.variations.map((v) => v.warehouse);
      });

      const warehouses_ids = warehouses.map((w) => w.id);

      return warehouses.filter(
        (item, index) => warehouses_ids.indexOf(item.id) === index
      );
    },

    filtredProducts() {
      return this.products
      // if (this.warehouse_id == 0) {
      //   return [];
      // }

      // return this.products.filter((p) =>
      //   p.variations.some((v) => v.warehouse_id == this.warehouse_id)
      // );
    },

    cities() {
      return this.$store.getters["city/cities"];
    },

    variations() {
      if (this.product_id == 0) {
        return [];
      }

      return this.products.find((p) => p.id == this.product_id).variations;
    },

    selectedProduct() {
      return this.products.find(p => p.id == this.product_id);
    },

    total_price: {
      get() {
        const total = this.items.reduce((s, i) => s += (!i.price ? 0 : i.price), 0);
        return parseFloat(!this.sale.price ? 0 : this.sale.price) + parseFloat(total);
      },
    },

    isItemsValid() {
      if(this.items.length == 0) return false;
      const check = this.items.some(i => (i.product.id == 0) || (i.product_variation_id == 0) || i.quantity == 0);
      return !check;
    },

    isFormValid() {
      return (
        !!this.sale.fullname &&
        !!this.sale.phone &&
        !!this.sale.adresse &&
        // this.total_price != 0 &&
        this.items.length > 0 &&
        !!this.sale.city
      );
    },

    formatedItems() {
      // console.log();
      const items = this.items.map(i => {
        const p = this.products.find(x => x.id == i.product.id);

        if(!p) return i;

        const v = p.variations.find(j => j.id == i.product_variation.id);

        if(!v) return i;
        // return false;
        return {
          ...i,
          product: p,
          product_id: p.id,
          product_variation: v,
          product_variation_id: v.id,
          product_ref: p.ref
        }
      })
          return items;
      // return this.items;
    },
  },

  methods: {
    deleteItem(id) {
      this.items = this.items.filter((i) => i.id != id);
    },

    handleConfirmationChange() {
      if(this.sale.confirmation != 'confirmer') {
        this.sale.affectation = null
      }
    },

    addNewRow() {
      const item = {
        id: this.item_id,
        product_id: 0,
        product_ref: null,
        product: {id: 0},
        product_variation: {id: 0},
        product_variation_id: 0,
        order_id: this.order.id,
        quantity: 0,
        price: 0,
      };

      this.items.push(item);
    },

    getVariations(product) {
      return this.products.find(p => p.id == product.id)
    },

    formatItems() {
      // console.log();
      const items = this.items.map(i => {
        const p = this.products.find(x => x.id == i.product.id);

        if(!p) return i;

        const v = p.variations.find(j => j.id == i.product_variation.id);

        if(!v) return i;
        // return false;
        return {
          ...i,
          product: p,
          product_id: p.id,
          product_variation: v,
          product_variation_id: v.id,
          product_ref: p.ref
        }
      })
          this.items = items;
          return items;
      // return this.items;
    },

    addItem() {
      if (
        [
          this.product_id,
          this.product_variation_id,
        ].includes(0)
      ) {
        this.$alert({
          title: "Choose a product",
          type: "warning",
        });
        return false;
      }

      const product = this.filtredProducts.find((p) => p.id == this.product_id);
      const product_variation = this.variations.find(
        (p) => p.id == this.product_variation_id
      );

      const item = {
        id: this.item_id,
        product_id: product.id,
        product_ref: product.ref,
        product: product,
        product_variation: product_variation,
        product_variation_id: product_variation.id,
        quantity: this.quantity,
        price: this.price,
      };

      this.items.push(item);
      this.product_id = 0;
      this.product_variation_id = 0;
      this.price = 0;
      this.item_id += 1;
    },

    update() {
      this.formatItems()
      if (!this.isFormValid) {
        this.$alert({
          type: "warning",
          title: "Please fill all the form",
        });
        return false;
      }

      if(this.sale.confirmation == 'annuler' && !this.sale.note) {
        this.$alert({
          type: "warning",
          title: "Add Cancellation note.",
        });
        return false;
      }

      if(!this.isItemsValid) {
        this.$alert({
          type: "warning",
          title: "Order Items are not valid",
        });
        return false;
      }

      // if(this.total_price == 0) {
      //   this.$alert({
      //     type: "warning",
      //     title: "Total price cannot be 0",
      //   });
      //   return false;
      // }

      this.isLoading = true;

      const order = {
        id: this.sale.id,
        fullname: this.sale.fullname,
        phone: this.sale.phone,
        city: this.sale.city,
        price: this.sale.price,
        adresse: this.sale.adresse,
        upsell: this.sale.upsell,
        counts_from_warehouse: this.sale.counts_from_warehouse,
        orderItems: this.items,
        confirmation: this.sale.confirmation,
        note: this.sale.note,
        affectation: this.sale.affectation,
        reported_agente_note: this.sale.reported_agente_note,
        reported_agente_date: this.sale.reported_agente_date,
      };

      if(order.confirmation != 'confirmer') {
        order.affectation = null;
        order.delivery = null;
      }

      this.isLoading = true;
      Sale.update(order.id, order)
        .then((res) => {
          if (res.data.code == "SUCCESS") {
            this.showUpdatePopup = false;
            this.$alert({
              type: "success",
              title: "Order updated",
            });

            this.$store.dispatch("order/update", {
              id: order.id,
              order: res.data.data.sale,
            });
            this.$emit("update:visible", false);
            this.$emit("updateOrder", res.data.data.sale);
          }
        })
        .catch((err) => {
          this.$handleApiError(err);
        })
        .finally(() => {
          this.isLoading = false;
        });
    },
    handleCancel() {
      this.sale = { ...this.order };
      this.items = [...this.order.items];
      this.$emit("update:visible", false);
    },
    handleReported(data) {
      this.sale.reported_agente_note = data.reported_agente_note
      this.sale.reported_agente_date = data.reported_agente_date
    },
    checkVariant(product_id, variation_id) {
      const product = this.products.find(p => p.id == product_id);
      if(!product) return {exists: false};

      let variation = product.variations.find(v => v.id == variation_id);
      if (variation) {
        return { exists: true, variation }
      }
      variation = product.variations.length > 0 ? product.variations[0] : null;

      return { exists: true, variation };
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
    },
  },

  mounted() {
    this.sale = { ...this.order };
    this.items = [...this.order.items];

    // if (!this.isLoaded) {
    //   this.getProducts();
    // }

  },
};
</script>

<style></style>
