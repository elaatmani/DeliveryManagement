<template>
  <div class="md:tw-w-[400px] tw-w-[95%] tw-bg-white tw-rounded-lg tw-p-5 tw-mx-auto">
        <div class="tw-grid tw-grid-cols-12 md:tw-gap-3">
        <div class="tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Size</div>
            <v-text-field
            :error="!formStatus.size.valid"
            @keyup="resetError('size')"
            :hide-details="true"
            v-model="size"
            clearable
            clear-icon="mdi-close"
            class="tw-w-full"
            variant="outlined"
            color="primary-color"
            density="compact"
            ></v-text-field>
            <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">
            {{ formStatus.size.message }}
            </div>
        </div>
        <div class="tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Color</div>
            <v-text-field
            :error="!formStatus.color.valid"
            @keyup="resetError('color')"
            :hide-details="true"
            v-model="color"
            clearable
            clear-icon="mdi-close"
            class="tw-w-full"
            variant="outlined"
            color="primary-color"
            density="compact"
            ></v-text-field>
            <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">
            {{ formStatus.color.message }}
            </div>
        </div>
        <div class="tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Quantity</div>
            <v-text-field
            @change="handleQuantityChange"
            type="number"
            :error="!formStatus.quantity.valid"
            @keyup="resetError('quantity')"
            :hide-details="true"
            v-model="quantity"
            clearable
            clear-icon="mdi-close"
            class="tw-w-full"
            variant="outlined"
            color="primary-color"
            density="compact"
            ></v-text-field>
            <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">
            {{ formStatus.quantity.message }}
            </div>
        </div>
        <div class="tw-col-span-12">
            <div class="mb-1 text-body-2 tw-text-zinc-700">Stock Alert</div>
            <v-text-field
            @change="handleStockAlertChange"
            type="number"
            :error="!formStatus.stockAlert.valid"
            @keyup="resetError('stockAlert')"
            :hide-details="true"
            v-model="stockAlert"
            clearable
            clear-icon="mdi-close"
            class="tw-w-full"
            variant="outlined"
            color="primary-color"
            density="compact"
            ></v-text-field>
            <div class="tw-h-[3px] tw-text-red-700 tw-mb-3 tw-mt-1 tw-text-xs">
            {{ formStatus.stockAlert.message }}
            </div>
        </div>
        </div>
        <div>
        <div class="tw-col-span-12 tw-flex tw-gap-2 tw-justify-end">
            <button
            @click="cancel"
            class="tw-bg-neutral-400 tw-py-1 tw-px-4 tw-flex tw-items-center tw-gap-1 tw-text-white tw-rounded-md"
            >
            <span class="tw-text-white">Cancel</span>
            </button>
            <button
            :disabled="!size || !color || !quantity"
            :class="{ 'tw-bg-orange-500': size && color && quantity }"
            @click="updateVariant"
            class="tw-bg-neutral-400 tw-py-1 tw-px-4 tw-flex tw-items-center tw-gap-1 tw-text-white tw-rounded-md"
            >
            <span class="tw-text-white">Save</span>
            </button>
        </div>
        </div>
  </div>
</template>

<script>
export default {

    props: [ 'variant' ],

  data() {
    return {

        size:'',
        color: '',
        quantity: 0,

        newVariant: null,

        formStatus: {
            quantity: {
                valid: true,
                message: "",
            },
            size: {
                valid: true,
                message: "",
            },
            color: {
                valid: true,
                message: "",
            },
            stockAlert:{
                valid: true,
                message: "",
            }
        },
    };
  },

  methods: {
    updateVariant() {
        console.log('updated');
        const diffrent = this.quantity - this.newVariant.quantity
        this.newVariant.size = this.size.toLocaleUpperCase()
        this.newVariant.color = this.color.toLocaleUpperCase()
        this.newVariant.quantity = this.quantity
        this.newVariant.stockAlert = this.stockAlert
        this.newVariant.available_quantity = parseInt(this.newVariant.available_quantity) + parseInt(diffrent)

        // this.$emit('update', this.newVariant)
        this.cancel()
    },

    handleQuantityChange() {
        if (this.quantity <= 0) {
            this.quantity = 0;
        }
    },

    handleStockAlertChange() {
        if (this.stockAlert <= 0) {
            this.stockAlert = 0;
        }
    },

    cancel() {
        this.$emit('cancel')
    },
    resetError(field) {
        this.formStatus[field] = {
            valid: true,
            message: "",
        };
    },
    },

    mounted() {
        this.size = this.variant.size
        this.color = this.variant.color
        this.quantity = this.variant.quantity
        this.stockAlert = this.variant.stockAlert
        this.newVariant = this.variant
    }
};
</script>

<style>
</style>