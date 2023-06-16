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
            {{ factorisation.id }}
        </th>
        <td class="tw-px-6 tw-py-4">
            <button class="tw-underline" @click="download(factorisation.id)">
                {{ factorisation.factorisation_id }}
            </button>
        </td>

        <td class="tw-px-6 tw-py-4">
            {{ deliveryName }}
        </td>
        <td class="tw-px-6 tw-py-4">
            {{ factorisation.commands_number }}
        </td>
        <td class="tw-px-6 tw-py-4">
            {{ factorisation.price }}
        </td>
        <td class="tw-px-6 tw-py-4">
            {{ factorisation.close_at?.split("T")[0] }}
        </td>
        <td class="tw-px-6 tw-py-4">
            {{ factorisation.paid_at?.split("T")[0] }}
        </td>
        <td class="tw-px-6 tw-py-4">
            <div
                class="tw-flex tw-items-center tw-w-full tw-text-neutral-600 dark:tw-text-neutral-200 tw-text-md tw-py-1">
                <label class="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer tw-w-fit tw-scale-75">
                    <input :disabled="isLoadingClose" v-model="close" type="checkbox" class="tw-sr-only tw-peer" />
                    <div
                        class="tw-flex tw-items-center peer-checked:tw-bg-emerald-500 tw-w-11 tw-h-6 tw-bg-gray-200 peer-focus:tw-outline-none tw-rounded-full tw-peer dark:tw-bg-neutral-600 peer-checked:after:tw-translate-x-full peer-checked:after:tw-border-white after:tw-content-[''] after:tw-absolute after:tw-top-[2px] after:tw-left-[2px] after:tw-bg-white after:tw-border-gray-300 after:tw-border after:tw-rounded-full after:tw-h-5 after:tw-w-5 after:tw-transition-all dark:tw-border-gray-600">
                    </div>
                </label>
                <v-icon v-if="isLoadingClose" color="green" size="small" class="tw-animate-spin">mdi-loading</v-icon>
            </div>
        </td>
        <td class="tw-px-6 tw-py-4">
            <div
                class="tw-flex tw-items-center tw-w-full tw-text-neutral-600 dark:tw-text-neutral-200 tw-text-md tw-py-1">
                <label class="tw-relative tw-inline-flex tw-items-center tw-cursor-pointer tw-w-fit tw-scale-75">
                    <input :disabled="isLoadingPaid" v-model="paid" type="checkbox" class="tw-sr-only tw-peer" />
                    <div
                        class="tw-flex tw-items-center peer-checked:tw-bg-emerald-500 tw-w-11 tw-h-6 tw-bg-gray-200 peer-focus:tw-outline-none tw-rounded-full tw-peer dark:tw-bg-neutral-600 peer-checked:after:tw-translate-x-full peer-checked:after:tw-border-white after:tw-content-[''] after:tw-absolute after:tw-top-[2px] after:tw-left-[2px] after:tw-bg-white after:tw-border-gray-300 after:tw-border after:tw-rounded-full after:tw-h-5 after:tw-w-5 after:tw-transition-all dark:tw-border-gray-600">
                    </div>
                </label>
                <v-icon v-if="isLoadingPaid" color="green" size="small" class="tw-animate-spin">mdi-loading</v-icon>
            </div>
        </td>
        <td class="tw-px-6 tw-py-4">
            {{ factorisation.created_at.split("T")[0] }}
        </td>
        <td class="tw-flex tw-items-center tw-px-6 tw-py-4 tw-space-x-3">
            <FactorisationActions :factorisation="factorisation" />
        </td>
    </tr>
</template>
<script>
    import FactorisationActions from "@/views/factorisation/partials/FactorisationActions";
    import Factorisation from "@/api/Factorisation";
    // import Api from "@/api/Api";
    import { serverUrl } from "@/config/config";
    export default {
        props: ["factorisation"],
        components: { FactorisationActions },

        data() {
            return {
                isLoadingPaid: false,
                isLoadingClose: false,
            };
        },

        computed: {
            deliveryName: {
                get() {
                    return (
                        this.factorisation.delivery.firstname +
                        " " +
                        this.factorisation.delivery.lastname
                    );
                },
                set(v) {
                    console.log(v);
                },
            },
            paid: {
                get() {
                    return this.factorisation.paid == 1 ? true : false;
                },
                set(v) {
                    this.updatePaid(v);
                },
            },
            close: {
                get() {
                    return this.factorisation.close == 1 ? true : false;
                },
                set(v) {
                    this.updateClose(v);
                },
            },
        },

        methods: {
            updatePaid(value) {
                this.isLoadingPaid = true;
                Factorisation.updatePaid(this.factorisation.id, value)
                    .then((response) => {
                        if (response.data.code == "FACTORISATION_UPDATED") {
                            this.$store.dispatch(
                                "factorisation/update",
                                response.data.data.factorisation
                            );
                        }
                    }, this.$handleApiError)
                    .finally(() => {
                        this.isLoadingPaid = false;
                    });
            },
            updateClose(value) {
                this.isLoadingClose = true;
                Factorisation.updateClose(this.factorisation.id, value)
                    .then((response) => {
                        if (response.data.code == "FACTORISATION_UPDATED") {
                            this.$store.dispatch(
                                "factorisation/update",
                                response.data.data.factorisation
                            );
                        }
                    }, this.$handleApiError)
                    .finally(() => {
                        this.isLoadingClose = false;
                    });
            },
            download(id) {
                const url = serverUrl + "api/factorisations/generate-pdf/" + id;
                const link = document.createElement("a");
                link.href = url;
                link.target = "_blank";
                link.setAttribute("download", "dd.pdf");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            },
        },
    };
</script>
<style></style>