<template>
  <div>
    <popup-full @cancel="$emit('cancel')" :visible="visible">
      <div
        class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[500px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5"
      >
        <h1 class="tw-text-lg">Update Warehouse</h1>

        <div class="tw-grid tw-grid-cols-12 tw-gap-y-1 tw-gap-x-3 mt-5">
          <div class="tw-w-full tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Warehouse Name</div>
            <v-text-field
              :error="!formStatus.name.valid"
              @keyup="resetError('name')"
              :hide-details="true"
              v-model="Warehouse.name"
              clearable
              clear-icon="mdi-close"
              class="tw-w-full"
              variant="outlined"
              color="primary-color"
              density="compact"
            ></v-text-field>
            <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">
              {{ formStatus.name.message }}
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
import Warehouse from '@/api/Warehouse';

export default {
  components: {},
  props: ['warehouse','visible'],
  data() {
    return {
      isLoading: false,
      isLoaded: false,

      Warehouse: {
        name: "",
      },

      formStatus: {
        name: {
          valid: true,
          message: "",
        },
      },
    };
  },

  computed: {
    
  },

  methods: {
    update() {
      if (!this.validate()) return false;

      this.isLoading = true;

      // let Warehouse = this.Warehouse;

      Warehouse.update(this.warehouse.id , this.Warehouse)
        .then((res) => {
          if (res.data.code == "WAREHOUSE_UPDATED") {
            this.$alert({
              type: "success",
              title: res.data.message,
            });
            this.$store.dispatch('warehouse/update',this.Warehouse)
            this.$emit('cancel');
          }
          
          if (res.data.code == "WAREHOUSE_NOT_UPDATED") {
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
      this.formStatus.name = validateName(
        this.Warehouse.name,
        "Warehouse name"
      );

      return this.formStatus.name.valid;
    },
  },

  mounted() {
    this.Warehouse = {...this.warehouse}
  },
};
</script>

<style></style>
