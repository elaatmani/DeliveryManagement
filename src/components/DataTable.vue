<template>
    <div>
        <!-- Datatable -->
        <div class="tw-w-full tw-h-[400px]">
            <v-grid
                :can-focus="false"
                theme="material"
                :source="source"
                :columns="columns"
                :filter="filterConfig"
                :resize="true"
                :sortable="true"
                @beforefiltertrimmed="aftertrimmed"
                frameSize="5"
                class="tw-border"
            >
            </v-grid>
        </div>
        <!-- /Datatable -->

        <!-- Pagination -->
        <div class="mt-5 tw-flex tw-justify-between">
            <div>

            </div>
            <div>
                <v-btn @click="currentPage = n" :ripple="false" variant="flat" class="mr-1" icon rounded="lg" :color="n == currentPage ? 'primary-color' : 'grey'" density="comfortable"  v-for="n in pageCount" :key="n">
                    <span class="tw-text-white">{{ n }}</span>
                </v-btn>
            </div>
        </div>
        <!-- /Pagination -->
    </div>
</template>

<script>
import VGrid from '@revolist/vue3-datagrid'
import filterConfig from '@/config/dataTableFilters'

export default {
    components: { VGrid },
    props: {
        rows: {
            required: true
        },
        columns: {
            required: true
        },
        filterConfig: {
            required: false,
            default: filterConfig
        }
    },

    data() {
        return {
            isFiltered: false,
            source: this.rows,
            currentPage: 1,
            paginationLimit: 5,
            filtredProducts: [],
        }
    },

    computed: {
        pageCount() {
            return Math.ceil(this.source.length / this.paginationLimit)
        }
    },

    methods: {
        aftertrimmed(source) {
            this.isFiltered = Object.keys(source.detail.collection).length > 0;
            // source.preventDefault();
            // const newRows = Object.keys(source.detail.itemsToFilter);
            console.log(source);
            console.log(this.isFiltered);
            // console.log(Object.keys(source.detail.itemsToFilter));
            // const filtredRows = this.rows.filter((e,i) => !newRows.includes(`${i}`));
        }
    },

    mounted() {
        console.log(this.pageCount);
    }
}
</script>

<style>

</style>