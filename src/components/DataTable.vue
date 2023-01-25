<template>
    <div>
        <!-- Datatable -->
        <div class="tw-w-full tw-h-[400px]">
            <v-grid
                :can-focus="false"
                theme="material"
                :source="rows"
                :columns="columns"
                :filter="filterConfig"
                :resize="true"
                :range="3"
                :sortable="true"
                @beforefiltertrimmed="aftertrimmed"
                frame-size="20"
                class="tw-border"
            >
            </v-grid>
        </div>
        <!-- /Datatable -->

        <!-- Pagination -->
        <div class="mt-5 tw-flex tw-justify-between">
            <div>
                <v-btn variant="flat" @click="clearFilters" color="primary-color">Clear</v-btn>
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
            currentPage: 1,
            paginationLimit: 8,
            filtredOut: {}
        }
    },

    computed: {
        pageCount() {
            return this.isFiltered ? this.pageCountWithFilter : this.pageCountNoFilter
        },

        pageCountWithFilter() {
            return Math.ceil(this.filtredItems.length / this.paginationLimit)
        },

        pageCountNoFilter() {
            return Math.ceil(this.rows.length / this.paginationLimit)
        },

        prevRange() {
            return (this.currentPage - 1) * this.paginationLimit
        },

        nextRange() {
            return (this.currentPage) * this.paginationLimit
        },

        // returns array with result from the filter
        filtredItems() {
            const indexes = Object.keys(this.filtredOut);
            return this.rows.filter((e, i) => {
                return !indexes.includes(`${i}`);
            })
        },


        // returns object Items to be filtred out by index if filter is not active
        trimmedNoFilter() {
            const trimmed = {}

            this.rows.forEach((e, i) => {
                if(i < this.prevRange || i > this.nextRange - 1) {
                    trimmed[i] = true
                }
            })

            return trimmed
        },

        // returns object Items to be filtred out by index if filter is active
        trimmedWithFilter() {
            let toBeTrimmed = {}

            this.rows.forEach((item, index) =>{
                toBeTrimmed[index] = true
            });

            const currentVisibleItemsKeys = this.visibleItemsIndexes.slice(this.prevRange, this.nextRange);

            currentVisibleItemsKeys.forEach(item => {
                toBeTrimmed[item] = false
            }) 

            return toBeTrimmed
        },


        visibleItemsIndexes() {
            
            const visibleItemsIndexes = [];
            this.filtredItems.forEach((item) => {
                visibleItemsIndexes.push(this.rows.indexOf(item));
            })
            return visibleItemsIndexes
        }
    },

    watch: {
        currentPage() {
            this.updateDatatable()
        },
        filtredOut() {
            this.currentPage = 1
            this.updateDatatable()
        }
    },

    methods: {
        aftertrimmed(source) {
            const filtersCount = Object.keys(source.detail.collection).length
            if (filtersCount > 0) {
                this.filtredOut = source.detail.itemsToFilter
                this.isFiltered =  true;
                
            } else {
                this.filtredOut = {}
                this.isFiltered = false
            }
            console.log(source);
        },
        clearFilters() {
            document.querySelector('revo-grid')
            .addTrimmed({'0': true, '2':false })
        },

        updateDatatable() {
            document.querySelector('revo-grid')
            .addTrimmed(this.isFiltered ? this.trimmedWithFilter : this.trimmedNoFilter)
        }
    },

    mounted() {
            this.updateDatatable()
        

    }
}
</script>

<style>

</style>