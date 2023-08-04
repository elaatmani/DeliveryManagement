<template>
  <div>
    <h1 class="tw-font-medium">Offers</h1>
    <div class="tw-grid tw-grid-cols-12 tw-mb-5 tw-mt-3 tw-gap-3">
      <div class="md:tw-col-span-3 tw-col-span-12">
          <div class="mb-1 text-body-2 tw-text-zinc-700">Quantity</div>
          <v-text-field
            type="number"
            :hide-details="true"
            v-model="quantity"
            clearable
            clear-icon="mdi-close"
            class="tw-w-full"
            variant="outlined"
            color="primary-color"
            density="compact"
          ></v-text-field>
        </div>
      <div class="md:tw-col-span-3 tw-col-span-12">
          <div class="mb-1 text-body-2 tw-text-zinc-700">Price</div>
          <v-text-field
            type="number"
            :hide-details="true"
            v-model="price"
            clearable
            clear-icon="mdi-close"
            class="tw-w-full"
            variant="outlined"
            color="primary-color"
            density="compact"
          ></v-text-field>
        </div>
      <div class="md:tw-col-span-5 tw-col-span-12">
          <div class="mb-1 text-body-2 tw-text-zinc-700">Note</div>
          <v-text-field
            type="text"
            :hide-details="true"
            v-model="note"
            clearable
            clear-icon="mdi-close"
            class="tw-w-full"
            variant="outlined"
            color="primary-color"
            density="compact"
          ></v-text-field>
        </div>
      <div class="md:tw-col-span-1 tw-col-span-12">
          <div class="mb-1 text-body-2 tw-text-transparent">Note</div>
          <v-btn @click="handleAdd" class="mx-auto !tw-px-0 !tw-py-0" min-height="40px" min-width="40" color="green" variant="flat" density="comfortable" :ripple="false" size="small">
              <v-icon color="white">mdi-plus</v-icon>
          </v-btn>
      </div>
    </div>
    <div class="tw-mt-2">
      <div class="tw-relative tw-overflow-x-auto tw-shadow sm:tw-rounded">
        <table
          class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500"
        >

          <thead
            class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50 "
          >
            <tr>
              <th scope="col" class="tw-px-6 tw-py-3 tw-w-32">Quantity</th>
              <th scope="col" class="tw-px-6 tw-py-3 tw-w-32">Price</th>
              <th scope="col" class="tw-px-6 tw-py-3">Note</th>
              <th scope="col" class="tw-px-6 tw-py-3 tw-w-24">Action</th>
            </tr>
          </thead>

          <tbody>

            <tr
              v-for="offer in offers"
              :key="offer.key"
              class="odd:tw-bg-white even:tw-bg-gray-50 tw-border-b "
            >
              <td class="tw-px-6 tw-py-4">{{ offer.quantity }}</td>
              <td class="tw-px-6 tw-py-4">{{ offer.price }} {{ currency }}</td>
              <td class="tw-px-6 tw-py-4">
                <p class="tw-max-w-[250px] tw-text-sm">
                  {{ offer.note }}
                </p>
              </td>
              <td class="tw-px-6 tw-py-4">
                <v-btn @click="handleDeleteClicked(offer.id)" class="mr-2 !tw-px-0 !tw-py-0" min-height="25px" min-width="30" color="red" variant="flat" density="comfortable" :ripple="false" size="small">
                  <v-icon color="white">mdi-delete-outline</v-icon>
                  <!-- <span class="text-white text-capitalize">Delete</span> -->
                </v-btn>
              </td>
            </tr>
            <tr v-if="offers.length == 0">
              <td colspan="5">
                <p class="tw-text-center tw-p-5">
                  No Offers
                </p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <popup type="warning" title="Warning" body="<p>Are you sure you want to delete this offer?</p> You won't be able to revert this!" :visible="deletePopup" @resolved="handleDelete" />

  </div>
</template>

<script>
import { currency } from '@/config/config';

export default {
  props: ["offers"],

  data() {
    return {
      currency,
      deletePopup: false,
      toDeleteID: null,
      quantity: 1,
      price: 0,
      note: ''
    }
  },

  methods: {
    handleDeleteClicked(id) {
      this.toDeleteID = id;
      this.deletePopup = true
    },

    handleDelete(result) {
      this.deletePopup = false;
      if(!result) {
        return false;
      }

      this.$emit('update:offers', this.offers.filter(o => o.id != this.toDeleteID))
    },

    handleAdd() {
      // Find the id of the last offer and add 1 to it, or use 1 if the list is empty
      const lastId = this.offers.length > 0 ? this.offers[this.offers.length - 1].id : 0;
      const id = lastId + 1;

      const offer = {
        id,
        quantity: this.quantity,
        price: this.price,
        note: this.note
      };

      this.$emit('update:offers', [...this.offers, offer]);

      // Reset the input fields for the next entry
      this.quantity = 1;
      this.price = 0;
      this.note = '';
    }

  }
};
</script>

<style>
</style>