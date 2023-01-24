<template>
    <div class="tw-h-full tw-w-full">
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
            source: this.rows
        }
    },

    methods: {
        aftertrimmed(source) {
            // source.preventDefault();
            const newRows = Object.keys(source.detail.itemsToFilter);
            console.log(source);
            console.log(Object.keys(source.detail.itemsToFilter));
            const filtredRows = this.rows.filter((e,i) => !newRows.includes(`${i}`));
            console.log(filtredRows);
            
        }
    }
}
</script>

<style>

</style>