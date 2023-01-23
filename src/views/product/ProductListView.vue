<template>
  <div>
    <div class="mb-5 tw-flex tw-justify-between tw-items-center">
      <div>
        <h1 class="tw-text-gray-700 font-weight-medium tw-text-md md:tw-text-lg">Product List</h1>
        <h2 class="tw-text-gray-500 tw-text-sm">Manage your products</h2>
      </div>
      <div>
        <v-btn color="primary-orange" link :to="{name: 'product/add'}" variant="flat" class="text-capitalize">
          <v-icon icon="mdi-plus" class="mr-2 text-white "></v-icon>
          <span class="text-white ">
            Add Product
          </span>
        </v-btn>
      </div>
    </div>
    <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">
      <v-data-table
        :headers="headers"
        :items="desserts"
        item-value="name"
        class="elevation-1"
      >
        <template v-slot:[`column.checkbox`]="{ column }">
          <input type="checkbox" :name="column.name" id="">
        </template>

        <template v-slot:[`item`]="{ item }">
          <input type="checkbox" :name="item.title" id="">
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
import { VDataTable } from 'vuetify/labs/VDataTable'
export default {
  components: {'v-data-table': VDataTable},
  data() {
    return {
      headers: [
        {
          title: 'checkbox',
          align: 'start',
          key: 'checkbox',
          sortable: false,
        },
        {
          title: 'Dessert (100g serving)',
          align: 'start',
          key: 'name',
          sortable: false,
        },
        { title: 'Calories', key: 'calories' },
        { title: 'Fat (g)', key: 'fat' },
        { title: 'Carbs (g)', key: 'carbs' },
        { title: 'Protein (g)', key: 'protein' },
        { title: 'Iron (%)', key: 'iron' },
      ],
      desserts: [
        {
          isChecked: false,
          name: 'Frozen Yogurt',
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: '1%',
        },
        {
          isChecked: false,
          name: 'Ice cream sandwich',
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: '1%',
        },
      ],
    }
  }
}
</script>

<style>

</style>