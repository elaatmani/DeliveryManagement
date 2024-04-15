<template>
    <tr class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
        <td class="tw-w-4 tw-p-4">
            <div class="tw-flex tw-items-center">
                <input id="checkbox-table-search-1" type="checkbox"
                    class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500 focus:tw-ring-2" />
                <label for="checkbox-table-search-1" class="tw-sr-only">checkbox</label>
            </div>
        </td>
        <th scope="row" class="tw-px-6 tw-py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap">
            {{ sheet.id }}
        </th>
        <td class="tw-px-6 tw-py-4">
            <div>
                <span class="tw-inline-block tw-w-[8px] tw-h-[8px] tw-rounded-full tw-mr-1" :class="[sheet.active == 1 && sheet.auto_fetch == 1 ? 'tw-bg-emerald-500' : 'tw-bg-red-500']"></span>
                {{ sheet.name }} 
            </div>
        </td>
        <td class="tw-px-6 tw-py-4">
            <div class="tw-max-w-[120px] tw-truncate">
                {{ sheet.sheet_name }} 
            </div>
        </td>
        <td class="tw-px-6 tw-py-4">
            <div class="tw-max-w-[120px] tw-truncate">
                {{ sheet.user_name }} 
            </div>
        </td>
        <td class="tw-px-6 tw-py-4">
            <div
                class="tw-flex tw-items-center tw-w-full tw-text-neutral-600 dark:tw-text-neutral-200 tw-text-md tw-py-1">
                <label class="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer tw-w-fit tw-scale-75">
                    <input :disabled="isLoadingAuto" v-model="autoFetch" type="checkbox" class="tw-sr-only tw-peer" />
                    <div
                        class="tw-flex tw-items-center peer-checked:tw-bg-emerald-500 tw-w-11 tw-h-6 tw-bg-gray-200 peer-focus:tw-outline-none tw-rounded-full tw-peer dark:tw-bg-neutral-600 peer-checked:after:tw-translate-x-full peer-checked:after:tw-border-white after:tw-content-[''] after:tw-absolute after:tw-top-[2px] after:tw-left-[2px] after:tw-bg-white after:tw-border-gray-300 after:tw-border after:tw-rounded-full after:tw-h-5 after:tw-w-5 after:tw-transition-all dark:tw-border-gray-600">
                    </div>
                </label>
                <v-icon v-if="isLoadingAuto" color="green" size="small" class="tw-animate-spin">mdi-loading</v-icon>
            </div>
        </td>
        <td class="tw-px-6 tw-py-4">
            {{ sheet.created_at.split("T")[0] }}
        </td>
        <td class="tw-flex tw-items-center tw-px-6 tw-py-4 tw-space-x-3">
            <SheetActions :sheet="sheet" />
        </td>
    </tr>
</template>
<script>
    import SheetActions from "@/views/sheet/partials/SheetActions";
    import Sheet from "@/api/Sheet";
    
    export default {
        props: ["sheet"],
        components: { SheetActions },

        data() {
            return {
                isLoadingAuto: false,
            };
        },

        computed: {
            autoFetch: {
                get() {
                    return this.sheet.auto_fetch == 1 ? true : false;
                },
                set(v) {
                    this.updateAutoFetch(v)
                }
            },
        },

        methods: {
            updateAutoFetch(value) {
                this.isLoadingAuto = true
                Sheet.updateAutoFetch(this.sheet.id, value).then(
                    (response) => {
                        if (response.data.code == 'SUCCESS') {
                            this.$alert({
                                title: value ? 'Activated' : 'Disabled',
                                type: 'success'
                            })
                            this.$store.dispatch('sheet/update', response.data.data.sheet)
                        }

                    },
                    this.$handleApiError
                ).finally(() => {
                    this.isLoadingAuto = false
                })
            }
        },
    };
</script>
<style></style>