<template>
  <div>
    <popup-full @cancel="$emit('cancel')" :visible="visible">
      <div
        class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[500px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5"
      >
        <h1 class="tw-text-lg">Create Warehouse</h1>

        <div class="tw-grid tw-grid-cols-12 tw-gap-y-1 tw-gap-x-3 mt-5">
          <div class="tw-w-full tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Warehouse Name</div>
            <v-text-field
              :error="!formStatus.name.valid"
              @keyup="resetError('name')"
              :hide-details="true"
              v-model="warehouse.name"
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
            @click="create"
            color="primary-color"
            variant="flat"
            class="text-capitalize"
          >
            <span class="text-white"> Create </span>
          </v-btn>
        </div>
      </div>
    </popup-full>
  </div>
</template>

<script>
import { validateName } from "@/helpers/validators";
import Warehouse from "@/api/Warehouse";

export default {
  props: ["visible"],
  components: {},
  data() {
    return {
      isLoading: false,

      warehouse: {
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

  methods: {
    create() {
      if (!this.validate()) return false;

      this.isLoading = true;

      let warehouse = this.warehouse;

      Warehouse.create(warehouse)
        .then((res) => {
          if (res.data.code == "WAREHOUSE_CREATED") {
            this.$alert({
              type: "success",
              title: res.data.message,
            });
            const warehouse = res.data.data.warehouse
            this.$store.dispatch('warehouse/addWarehouse',warehouse)
            this.$emit('cancel')
            this.warehouse = {
              name: "",
            };
          }
          if (res.data.code == "VALIDATION_ERROR") {
            this.$alert({
              type: "warning",
              title: res.data.errors.ref,
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
        this.warehouse.name,
        "Warehouse name"
      );

      return this.formStatus.name.valid;
    },
  },
};
</script>

<style></style>
