<template>
  <div>
    <div class="mb-5">
      <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Update Inventory Movement</h1>
      <h2 class="tw-text-gray-500 tw-text-sm">Edit an existing Movement</h2>
    </div>

    <div v-if="!isLoaded">
          <LoadingAnimation />
    </div>

    <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

      <div>

        <v-row>
              <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Product Name</div>
                  <div>
                  <v-select
                    class="text-capitalize"
                    :items="products"
                    item-title="name"
                    item-value="id"
                    v-model="product"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-select>
                </div>
                </div>
              </v-col>

              <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Delivery</div>
                  <div>
                  <v-select
                    class="text-capitalize"
                    :items="deliveries"
                    item-title="firstname"
                    item-value="id"
                    v-model="delivery"
                    variant="outlined"
                    color="primary-color"
                    density="compact"
                  ></v-select>
                </div>
                </div>
              </v-col>

              <v-col class="!tw-py-2" cols="12" sm="6" md="6">
                <div class="tw-w-full">
                  <div class="mb-1 text-body-2 tw-text-zinc-700">Quantity</div>
                  <div>
                  <v-text-field type="number" @change="handleQuantityChange"  :hide-details="true" v-model="quantity" clear-icon="mdi-close" class="tw-w-full"  variant="outlined" color="primary-color" density="compact"></v-text-field>
                  <!-- <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">{{  }}</div> -->
                </div>
                </div>
              </v-col>
              
          
        </v-row>
      </div>


      
      <div class="mt-8 tw-flex tw-justify-end tw-gap-3">
        <v-btn color="grey-darken-2" variant="flat" size="large">
          <span class="text-white text-capitalize">Cancel</span>
        </v-btn>
        <v-btn @click="update" :loading="isLoading" color="primary-color" variant="flat" size="large">
          <span class="text-white text-capitalize">Update</span>
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import User from '@/api/User'
import Product from '@/api/Product'
import Inventory from '@/api/Inventory'
export default {
    data() {
      return {
        isLoading: false,
        isLoaded: false,
        
        product: 1,
        delivery: 1,
        quantity: 0,
      }
    },

    computed: {
      products() {
        return this.$store.getters['product/products']
      },
      deliveries() {
        return this.$store.getters['user/deliveries']
      },
      id() {
        return this.$route.params.id
      }
    },

    methods: {
      update() {
        if(this.quantity == 0) return false;

        this.isLoading = true
        Inventory.inventoryMovementUpdate(this.id, {
          product_id: this.product, 
          delivery_id: this.delivery, 
          quantity: this.quantity
        })
        .then(
          res => {
            if(res.data.code == 'SUCCESS') {
              this.$alert({
                type: 'success',
                title: res.data.message
              })
            }

            if (res.data.code == 'ERROR_QUANTITY') {
              this.$alert({
                type: 'warning',
                title: res.data.message
              })
            }
          }
        )
        .finally(
          () => this.isLoading = false
        )
      },
      handleQuantityChange() {
        if (this.quantity <= 0) {
          this.quantity = 0
        }
      },
      async getDeliveries() {
      
          await User.deliveries()
          .then(
              res => {
                  const deliveries = res.data.data;
                  this.$store.dispatch('user/setDeliveries', deliveries);
                  if(deliveries.length > 0) {
                    this.delivery = deliveries[0].id
                  } else {
                    this.delivery = null
                  }
              },
              this.$handleApiError
          )
      },
      getProducts() {
        return Product.all()
        .then(
          res => {
            if (res.data.code == 'SUCCESS') {
              const products = res.data.data.products
              this.$store.dispatch('product/setProducts', products)

              if(products.length > 0) {
                this.product = products[0].id
              } else {
                this.product = null
              }
            }
            
          },
          err => {
            this.$handleApiError(err)
          }
        )
      },
      getMovement() {
        return Inventory.getMovement(this.id)
        .then(
          res => {
            if (res.data.code == 'SUCCESS') {
              const movement = res.data.data.movement
                this.product = movement.product.id
                this.delivery = movement.delivery.id
                this.quantity = movement.qty_to_delivery
            }
            
          },
          err => {
            this.$handleApiError(err)
          }
        )
      }
    },

    mounted() {
      Promise.allSettled([this.getProducts(), this.getDeliveries(), this.getMovement()])
      .then(() => {
        this.isLoaded = true
      })
    }

}
</script>

<style>

</style>