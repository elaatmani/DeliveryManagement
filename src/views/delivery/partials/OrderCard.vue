<template>
  <v-card
    class="mx-auto tw-border-dashed !tw-shadow-lg !tw-shadow-gray-100/70"
    :class="[!!order.note && 'tw-border-pink-00', order.delivery == 'livrer' && 'tw-border-emerald-400']"
    flat
    border
    
  >
    <v-card-item>

        <template v-slot:title>
            <div>
              <p class="tw-text-sm tw-text-orange-500x tw-bg-orange-500x/10 tw-underline tw-underline-offset-2 tw-px-1 tw-w-fit tw-rounded">{{order.city}}</p>
              <p class="tw-w-full tw-whitespace-normal">
                  {{ order.adresse }}
              </p>
            </div>
        <div  class="tw-border-b tw-mb-1 tw-border-dashed"></div>
        </template>
    </v-card-item>

    <v-card-text class="py-0">
      <v-row align="center" no-gutters>
        <v-col cols="12" class="tw-flex tw-items-center tw-flex-wrap tw-text-gray-500">
            <v-icon
            icon="mdi-account"
            size="small"
            class="tw-mr-2 tw-text-sm"
          ></v-icon>

          {{ order.fullname }}

            <v-icon
            v-if="!!order.note"
            icon="mdi-note-outline"
            size="small"
            class="tw-ml-2 tw-text-sm !tw-text-pink-500"
          ></v-icon>
        </v-col>

        <v-col cols="12" class="tw-flex tw-items-center tw-gap-3 tw-text-gray-500">
            <div class="tw-flex tw-items-center">
                <span><v-icon
              icon="mdi-shopping tw-text-sm"
              size="small"
              class="me-1 pb-1"
            ></v-icon>

            {{ order.product_name }}</span>
            </div>
            <div>
              <p class="tw-min-w-fit tw-w-[25px] tw-h-[25px] tw-flex tw-items-center tw-justify-center tw-text-md tw-font-bold tw-p-1 tw-rounded tw-text-orange-400 tw-bg-orange-400/10">
                <span class="tw-text-sm">x</span> {{ order.quantity }}
                </p>
            </div>
        </v-col>


        <v-col
          class="text-h4 tw-my-3"
          cols="12"
        >
          {{ order.price }} DH
        </v-col>

      </v-row>
    </v-card-text>

    <div v-if="false" class="d-flex py-3 justify-space-between">
      <v-list-item
        density="compact"
        
      >
        <v-list-item-title class="tw-flex tw-items-center tw-text-gray-500 tw-gap-2">
          <v-icon size="small" class="tw-text-gray-500">mdi-shopping</v-icon>
          <p>
             {{ order.product_name }}
          </p>
        </v-list-item-title>
      </v-list-item>

      <v-list-item
        density="compact"
      >
            <p class="tw-min-w-fit tw-w-[30px] tw-h-[30px] tw-flex tw-items-center tw-justify-center tw-text-lg tw-font-bold tw-p-1 tw-rounded tw-text-orange-400 tw-bg-orange-400/10">
            <span class="tw-text-sm">x</span> {{ order.quantity }}
            </p>

        <!-- <v-list-item-subtitle>48%</v-list-item-subtitle> -->
      </v-list-item>
    </div>

    <v-expand-transition>
      <div v-if="expand" >
        <div v-if="!!order.note" class="tw-px-5 tw-py-2 tw-mt-2 tw-border-neutral-200 tw-border-t tw-border-dashed">
            <p class="tw-text-md tw-font-bold tw-text-pink-500">NOTE</p>
            <p>
                {{ order.note }}
            </p>
        </div>
        <v-list class="bg-transparent tw-space-y-2 !tw-px-5 tw-py-3 tw-border-neutral-200 tw-border-dashed tw-border-t tw-mt-5">
          <div>
           <div class="tw-flex tw-items-center tw-text-gray-500">
              <v-icon
              icon="mdi-phone"
              class="mr-2 tw-text-sm"
            ></v-icon>
            {{ order.phone }}
          </div> 
          </div>
          <div>
           <div class="tw-flex tw-items-center tw-text-gray-500">
              <v-icon
              icon="mdi-calendar"
              class="mr-2 tw-text-sm"
            ></v-icon>
            {{ order.created_at?.split('T')[0].split('-').reverse().join('.') }}
          </div> 
          </div>
        </v-list>
      </div>

      
    </v-expand-transition>

    <v-divider></v-divider>

    <v-card-actions class="tw-flex tw-justify-end tw-gap-2 tw-flex-wrap">
      
      <v-btn class="tw-capitalize tw-mx-auto tw-bg-orange-500/5 tw-text-orange-500" rounded="lg" density="comfortable" icon variant="flat"  @click="expand = !expand">
            <v-icon>{{ expand ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn>
      
        <v-spacer></v-spacer>

      <v-btn v-if="!!order.phone" link target="_blank" :href="'https://api.whatsapp.com/send?phone=' + order.phone.replace('+', '').replace('-', '').replace(' ', '')" class="tw-capitalize tw-bg-green-500/5 tw-text-green-500 tw-border tw-border-green-500/30" icon rounded="lg" variant="flat" density="comfortable">
        <v-icon>mdi-whatsapp</v-icon>
      </v-btn>

      <v-btn v-if="!!order.phone" link target="_blank" :href="'tel:' + order.phone" class="tw-capitalize tw-bg-blue-500/5 tw-text-blue-500 tw-border tw-border-blue-500/30"  icon rounded="lg" variant="flat" density="comfortable">
        <v-icon>mdi-phone</v-icon>
      </v-btn>

      <v-btn @click="confirmPopup = true" class="tw-capitalize tw-bg-emerald-500 tw-text-white tw-border tw-border-emerald-500/30"  icon rounded="lg" variant="flat" density="comfortable">
        <v-icon>mdi-check</v-icon>
      </v-btn>
    </v-card-actions>

  <OrderCardDelivery :delivery="order.delivery" :order="order" :key="order" :visible="confirmPopup" @cancel="confirmPopup = false" />
  </v-card>
</template>

<script>
import OrderCardDelivery from '@/views/delivery/partials/OrderCardDelivery'
  export default {

    components: {OrderCardDelivery},
    props: ['order'],

    data: () => ({
      expand: false,
      confirmPopup: false,
      labels: [
        { name: 'Telephone', field: 'phone', icon: 'mdi-phone' },
        { name: 'Date', field: 'created_at', icon: 'mdi-calendar' },
      ],
    }),
  }
</script>