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
                frameSize="2"
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
            // filtredItems: [],
            // source: [],
            currentPage: 1,
            paginationLimit: 7,
            filtredProducts: [],
            filtredOut: {}
        }
    },

    computed: {
        pageCount() {
            return Math.ceil(this.rows.length / this.paginationLimit)
        },
        prevRange() {
            return (this.currentPage - 1) * this.paginationLimit
        },
        nextRange() {
            return (this.currentPage) * this.paginationLimit
        },
        source() {
            return this.isFiltered ? [] : this.rows.slice(this.prevRange, this.nextRange);
        },
        filtredItems() {
            return this.rows.filter((item, index) => this.filtredOut.includes(index))
        },


        trimmedNoFilter() {
            const trimmed = {}

            this.rows.forEach((e, i) => {
                if(i < this.prevRange || i > this.nextRange - 1) {
                    trimmed[i] = true
                }
            })

            return trimmed
        },

        trimmedWithFilter() {
            let trimmed = {...this.filtredOut}

            return trimmed
        }
    },

    watch: {
        currentPage() {
            document.querySelector('revo-grid').addTrimmed(this.isFiltered ? this.trimmedWithFilter : this.trimmedNoFilter)
            console.log(this.trimmedNoFilter);
        },
        filtredOut() {
            document.querySelector('revo-grid').addTrimmed(this.isFiltered ? this.trimmedWithFilter : this.trimmedNoFilter)
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
            // const newRows = Object.keys(source.detail.itemsToFilter);
            console.log(source);
            // console.log(this.isFiltered);
        
            // console.log(Object.keys(source.detail.itemsToFilter));
            // const filtredRows = this.rows.filter((e,i) => !newRows.includes(`${i}`));
        }
    },

    mounted() {
        console.log(this.pageCount);
        console.log(this.prevRange);
        console.log(this.nextRange);
            
        document.querySelector('revo-grid').addTrimmed(this.isFiltered ? this.trimmedWithFilter : this.trimmedNoFilter)

    }
}
</script>

<style>

</style>