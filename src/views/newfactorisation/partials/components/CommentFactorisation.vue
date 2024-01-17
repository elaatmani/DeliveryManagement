<template>
    <div v-if="!!itemCopy">
      <popup-full @cancel="$emit('update:visible', false)" :visible="visible">
        <div
          class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5"
        >
          <h1 class="tw-text-lg">Update Factorisation Comment</h1>
  
          <div class="tw-grid tw-grid-cols-12 tw-gap-y-1 tw-gap-x-3 mt-5">
            <div class="tw-w-full tw-col-span-6">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Total Price</div>
              <v-text-field
                :error="!formStatus.price.valid"
                @keyup="resetError('price')"
                :hide-details="true"
                v-model="itemCopy.price"
                clearable
                clear-icon="mdi-close"
                class="tw-w-full"
                variant="outlined"
                color="primary-color"
                disabled
                density="compact"
              ></v-text-field>
              <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">
                {{ formStatus.price.message }}
              </div>
            </div>
  
            <div class="tw-w-full tw-col-span-6">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Nb Commands</div>
              <v-text-field
                :error="!formStatus.commands_number.valid"
                @keyup="resetError('commands_number')"
                :hide-details="true"
                v-model="itemCopy.commands_number"
                clearable
                clear-icon="mdi-close"
                class="tw-w-full"
                variant="outlined"
                disabled
                color="primary-color"
                density="compact"
              ></v-text-field>
              <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">
                {{ formStatus.commands_number.message }}
              </div>
            </div>
  
            <div class="tw-w-full tw-col-span-12">
              <div class="mb-1 text-body-2 tw-text-zinc-700">Comment</div>
  
              <textarea
                :error="!formStatus.commands_number.valid"
                @keyup="resetError('commands_number')"
                :hide-details="true"
                clearable
                clear-icon="mdi-close"
                v-model="itemCopy.comment"
                variant="outlined"
                density="compact"
                cols="30"
                rows="5"
                color="primary-color"
                class="tw-rounded-lg tw-px-3 tw-py-1 tw-outline-none tw-w-full tw-border tw-border-solid tw-border-neutral-400 focus:tw-border-orange-500"
              >
              </textarea>
              <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">
                {{ formStatus.commands_number.message }}
              </div>
            </div>
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
  import { validateName } from "@/helpers/validators";
  import Factorisation from "@/api/Factorisation";
  
  export default {
    components: {},
    
    props: ["item", "visible"],
    data() {
      return {
        isLoading: false,
        isLoaded: false,

        itemCopy: null,
  
        Factorisation: {
          price: 0,
          commands_number: 0,
          comment: "",
        },
  
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
      update() {
        if (!this.validate()) return false;
  
        this.isLoading = true;
  
        // let Factorisation = this.Factorisation;
  
        Factorisation.updateComment(this.itemCopy.id, this.itemCopy)
          .then((res) => {
            if (res.data.code == "FACTORISATION_UPDATED") {
              this.$alert({
                type: "success",
                title: res.data.message,
              });

              this.$store.dispatch("factorisation/update", this.itemCopy);
              this.$emit('update:visible', false)
              this.$emit('update', this.itemCopy)
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
        this.formStatus.comment = validateName(
          this.itemCopy.comment,
          "Factorisation Comment"
        );
  
        return this.formStatus.comment.valid;
      },
    },
  
    mounted() {
      console.log(this.item);
      this.itemCopy = JSON.parse(JSON.stringify(this.item));
    },
  };
  </script>
  
  <style></style>
  