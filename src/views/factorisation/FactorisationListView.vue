<template>
    <div :key="factorisations.length">
      <div class="mb-5 tw-flex tw-justify-between tw-items-center">
        <div>
          <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Factorisation List</h1>
          <h2 class="tw-text-gray-500 tw-text-sm">Manage your factorisations</h2>
        </div>
      </div>
  
      <div v-if="!isLoaded">
            <LoadingAnimation />
      </div>
  
      <div v-if="isLoaded" class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
  
        <div class="mb-5 tw-flex">
          <v-btn @click="showFilters = !showFilters" icon rounded="lg" variant="flat" size="small" color="primary-color" class="text-white">
            <v-icon color="white" size="xx-large">mdi-camera-control</v-icon>
          </v-btn>
          <div class="focus-within:tw-border-orange-400 tw-w-[250px] ml-2 px-2 tw-rounded-md tw-border tw-flex tw-items-center">
            <v-img width="18" height="18" max-width="18" class="ma-0 pa-0" :src="localUrl + 'assets/img/icons/search.svg'"></v-img>
            <input v-model="search" type="text" class="ml-2 tw-border-0 tw-outline-0 tw-h-full tw-text-sm" placeholder="Search by name">
          </div>
        </div>
  
        <div class="tw-max-h-0 tw-duration-500 tw-overflow-hidden" :class="{'!tw-max-h-[500px]': showFilters}">
          <div class="tw-grid tw-grid-cols-12 tw-gap-2 tw-mb-4">
            
  
            <div class="lg:tw-col-span-4 md:tw-col-span-6 tw-col-span-12 tw-h-fit"> 
              <span class="tw-text-sm tw-text-neutral-600">Date</span>
              <div class="tw-relative">
                <input type="date" v-model="date" class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm" />
              </div>
            </div>
          </div>
        </div>
  
        <div class="">
          <FactorisationsTable :columns="columns" :factorisations="filteredFactorisations" />
        </div>
  
        <!-- <AddFactorisation @cancel="showPopup = false" :visible="showPopup" /> -->
      </div>
    </div>
  </template>
  
  <script>
  import {localUrl} from '@/config/config'
  
  import Factorisation from '@/api/Factorisation'
  import FactorisationsTable from './FactorisationsTable.vue'
//   import AddFactorisation from './partials/AddFactorisation'
  
  export default {
    components: {  FactorisationsTable },
    data() {
      return {
        localUrl,
        isLoaded: false,
        showFilters: false,
        date: null,
        search: '',
        showPopup:false,
        columns: 
        [
          {
              prop: 'id',
              name: '#',
          },
          {
              prop: "factorisation_id",
              name: "Code",
          },
          {
              prop: "delivery_id",
              name: "Delivery",
          },
          {
              prop: "commands_number",
              name: "Nb Commands",
          },
          {
              prop: "price",
              name: "Total Price",
          },
          {
              prop: "close_at",
              name: "Closed at",
          },
          {
              prop: "paid_at",
              name: "Paid at",
          },
           {
              prop: "close",
              name: "Close",
          },
          {
              prop: "paid",
              name: "Paid",
          },
          {
              prop: 'created_at',
              name: 'Created at',
          },
          {
              prop: 'actions',
              name: 'Actions',
          },
          
      ],
      }
    },
    computed: {
      factorisations() {
        // console.log(this.$store.getters['factorisation/factorisations'])
        return this.$store.getters['factorisation/factorisations'];
        
      },
      filteredFactorisations() {
        const date = this.date;
        
        return this.factorisations.filter(item => {
          // filter by confirmation
          if (!!date  && item?.created_at.split('T')[0] !== date) {
            return false;
          }
  
        //   if(     
        //     !item.name.toLowerCase().includes(this.search.toLowerCase())
          
        //   ) {
        //     return false;
        //   }
          
  
          // if item passes all filters, include it in the filtered data
          return true;
        });
      }
    },
    mounted() {
   
      Factorisation.all()
      .then(
        res => {
          if (res.data.code == 'SUCCESS') {
            this.$store.dispatch('factorisation/setFactorisations', res.data.data.factorisations)
          
          }
          
        },
        err => {
          this.$handleApiError(err)
        }
      ).finally(() => this.isLoaded = true);
    }
  }
  </script>
  
  <style>
  </style>