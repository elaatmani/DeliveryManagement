<template>
    <div
        class="tw-flex tw-items-center tw-w-full tw-text-neutral-600 dark:tw-text-neutral-200 tw-text-md tw-py-1"
      >
        <label
            class="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer tw-w-fit tw-scale-75"
        >
            <input
            :disabled="isLoadingClose"
            v-model="close"
            type="checkbox"
            class="tw-sr-only tw-peer"
            />
            <div
            class="tw-flex tw-items-center peer-checked:tw-bg-emerald-500 tw-w-11 tw-h-6 tw-bg-gray-200 peer-focus:tw-outline-none tw-rounded-full tw-peer dark:tw-bg-neutral-600 peer-checked:after:tw-translate-x-full peer-checked:after:tw-border-white after:tw-content-[''] after:tw-absolute after:tw-top-[2px] after:tw-left-[2px] after:tw-bg-white after:tw-border-gray-300 after:tw-border after:tw-rounded-full after:tw-h-5 after:tw-w-5 after:tw-transition-all dark:tw-border-gray-600"
            ></div>
        </label>
        <v-icon
            v-if="isLoadingClose"
            color="green"
            size="small"
            class="tw-animate-spin"
            >mdi-loading</v-icon
        >
    </div>
</template>

<script>
    import Factorisation from '@/api/Factorisation'
export default {
    props: {
        item: {
            required: true,
        }
    },

    data() {
        return {
            isLoadingClose: false,
        }
    },

    computed: {
        close: {
            get() {
                return this.item.close
            },
            set(v) {
                this.updateClose(v);
            }
        }
    },

    methods: {
        updateClose(value) {
            this.isLoadingClose = true;
            Factorisation.updateClose(this.item.id, value)
            .then((response) => {
                if (response.data.code == "FACTORISATION_UPDATED") {
                    const newFucktorisation = response.data.data.factorisation;
                    this.$emit('update', newFucktorisation);
                    // this.$store.dispatch(
                    //     "factorisation/update",
                    //     response.data.data.factorisation
                    // );
                    this.$alert({
                        title: 'Updated Successfully !',
                        type: 'success'
                    })
                }
            }, this.$handleApiError)
            .finally(() => {
                this.isLoadingClose = false;
            });

        }
    }

}
</script>