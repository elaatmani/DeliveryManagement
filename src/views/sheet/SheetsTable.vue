<template>
    <div>
        <div class="tw-relative tw-overflow-x-auto sm:tw-rounded-lg">
            <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
                <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
                    <tr>
                        <th scope="col" class="tw-p-4">
                            <div class="tw-flex tw-items-center">
                                <input id="checkbox-all-search" type="checkbox"
                                    class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500 focus:tw-ring-2" />
                                <label for="checkbox-all-search" class="tw-sr-only">checkbox</label>
                            </div>
                        </th>
                        <th v-for="column in columns" :key="column" scope="col"
                            class="tw-px-6 tw-py-3 text-truncate">
                            <div class="tw-w-fit tw-flex tw-whitespace-nowrap">
                                {{ column }}
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <SheetRow :sheet="sheet" v-for="sheet in sheets" :key="sheet.id" />
                </tbody>
            </table>
        </div>

        <!-- Pagination -->
        <div class="mt-5 tw-grid tw-grid-cols-12 tw-gap-5">
            <div class="tw-col-span-12 md:tw-col-span-6 d-flex align-center">
                <div class="text-body-2 tw-h-fit mr-2 tw-text-zinc-700 tw-whitespace-nowrap">
                    Show per page:
                </div>
                <select v-model="paginationLimit"
                    class="focus:tw-border-orange-400 tw-border-solid tw-w-[70px] ml-2 px-2 tw-py-2 tw-rounded-md tw-border tw-flex tw-items-center">
                    <option :value="o" :key="o" v-for="o in allowedLimit">{{ o }}</option>
                </select>
            </div>
            <div class="tw-col-span-12 md:tw-col-span-6 d-flex tw-justify-end tw-flex-wrap align-center">
                <div class="text-caption tw-h-fit mr-2 font-weight-bold tw-text-zinc-700">
                    {{ prevRange + 1 }} -
                    {{ currentPage == pageCount ? sheets.length : nextRange }} of
                    {{ sheets.length }} items
                </div>
                <div>
                    <v-btn @click="currentPage = n" :ripple="false" variant="flat" class="mr-1" icon rounded="lg"
                        :color="n == currentPage ? 'primary-color' : 'grey'" density="comfortable"
                        v-for="n in pageCount" :key="n">
                        <span class="tw-text-white">{{ n }}</span>
                    </v-btn>
                </div>
            </div>
        </div>
        <!-- /Pagination -->
    </div>
</template>

<script>
    
    import SheetRow from "@/views/sheet/partials/SheetRow";

    export default {
        props: ["sheets" ],
        components: { SheetRow },

        data() {
            return {
                allowedLimit: [5, 10, 20, 50, 100],
                currentPage: 1,
                paginationLimit: 10,
                columns: ['id', 'name', 'sheet name', 'Marketer', 'auto fetch', 'created', 'actions']
            };
        },

        computed: {
            prevRange() {
                return (this.currentPage - 1) * this.paginationLimit;
            },

            nextRange() {
                return this.currentPage * this.paginationLimit;
            },
            pageCount() {
                return Math.ceil(this.sheets.length / this.paginationLimit);
            },
            items() {
                return this.sheets.slice(this.prevRange, this.nextRange);
            },
        },

        methods: {},
    };
</script>

<style></style>