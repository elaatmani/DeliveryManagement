<template>
    <div v-if="!!itemCopy"> 
      <popup-full @cancel="$emit('update:visible', false)" :visible="visible">
        <div
          class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5"
        >
          <h1 class="tw-text-lg">Update Factorisation Fees</h1>
  
          <div
            class="tw-grid tw-grid-cols-12 tw-gap-y-1 tw-gap-x-3 mt-5"
            :key="fee.id"
            v-for="fee in fees"
          >
            <div class="tw-w-full tw-col-span-6">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Fee Name</div>
              <v-text-field
                :error="!formStatus.price.valid"
                @keyup="resetError('price')"
                :hide-details="true"
                v-model="fee.feename"
                clearable
                clear-icon="mdi-close"
                class="tw-w-full"
                variant="outlined"
                color="primary-color"
                density="compact"
              ></v-text-field>
              <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">
                {{ formStatus.price.message }}
              </div>
            </div>
  
            <div class="tw-w-full tw-col-span-6">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Fee Price</div>
              <v-text-field
                :error="!formStatus.commands_number.valid"
                @keyup="resetError('commands_number')"
                :hide-details="true"
                v-model.number="fee.feeprice"
                clearable
                clear-icon="mdi-close"
                class="tw-w-full"
                type="number"
                variant="outlined"
                color="primary-color"
                density="compact"
              ></v-text-field>
              <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">
                {{ formStatus.commands_number.message }}
              </div>
              <div class="tw-flex tw-gap-2 mt-0 mb-3 tw-justify-end">
                <button
                  @click="deletefee(fee.id)"
                  class="bg-red tw-py-1 tw-px-4 tw-flex tw-items-center tw-gap-1 tw-text-white tw-rounded-md"
                >
                  <v-icon size="small" color="white">mdi-delete</v-icon>
                  <span class="tw-text-white">Delete</span>
                </button>
              </div>
            </div>
  
          </div>
          <div class="tw-flex tw-gap-2 mt-0 mb-10 tw-justify-end">
            <button
              @click="addFees"
              class="bg-primary-color tw-py-1 tw-px-4 tw-flex tw-items-center tw-gap-1 tw-text-white tw-rounded-md"
            >
              <v-icon size="small" color="white">mdi-plus</v-icon>
              <span class="tw-text-white">Add</span>
            </button>
          </div>
  
          <div class="tw-flex tw-gap-2 mt-3 mb-2 tw-justify-end">
            <v-btn
              @click="$emit('update:visible', false)"
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
  // import { validateName } from "@/helpers/validators";
  import Factorisation from "@/api/Factorisation";
  
  export default {
    components: {},
    props: ["item", "visible"],
    data() {
      return {
        isLoading: false,
        isLoaded: false,
        itemCopy : null,
        fees: [],
        formStatus: {
          price: {
            valid: true,
            message: "",
          },
  
          commands_number: {
            valid: true,
            message: "",
          },
  
          comment: {
            valid: true,
            message: "",
          },
        },
      };
    },
  
    computed: {},
  
    methods: {
      addFees() {
        const lastFee =
          this.fees.length > 0 ? this.fees[this.fees.length - 1].id : 1;
  
        const newId = lastFee ? lastFee + 1 : 1;
  
        const fee = {
          id: newId,
          feename: "",
          feeprice: 0,
        };
  
        this.fees.push(fee);
      },
      deletefee(id){
        this.fees = this.fees.filter((i)=>i.id != id);
  
      },
      update() {
        if (!this.validate()) return false;
  
        this.isLoading = true;
  
        // let Factorisation = this.Factorisation;
  
        Factorisation.updateFees(this.itemCopy.id, this.fees)
          .then((res) => {
            if (res.data.code == "FACTORISATION_UPDATED") {
              this.$alert({
                type: "success",
                title: res.data.message,
              });
           
              this.$emit("update",this.itemCopy);
              this.$emit("update:visible",false);
            }
  
            if (res.data.code == "FACTORISATION_NOT_UPDATED") {
              this.$alert({
                type: "warning",
                title: res.data.message,
              });
            }
          })
          .catch((err) => {
            this.$handleApiError(err);
          })
          .finally(() => (this.isLoading = false));
      },
  
      resetError(field) {
        this.formStatus[field] = {
          valid: true,
          message: "",
        };
      },
  
      validate() {
        
        for(let i = 0; i < this.fees.length; i++ ) {
          if(!this.fees[i].feename) {
            this.$alert({
              type: 'warning',
              title: 'Add Fee Name'
            })
            return false;
          }
  
          if(!this.fees[i].feeprice) {
            this.$alert({
              type: 'warning',
              title: 'Add Fee Price'
            })
            return false;
          }
        }
  
        return true;
      },
    },
  
    mounted() {
    //   this.Factorisation = { ...this.factorisation };
      this.itemCopy = JSON.parse(JSON.stringify(this.item));
      this.fees = this.itemCopy.fees ?? [];
    },
  };
  </script>
  
  <style></style>
  