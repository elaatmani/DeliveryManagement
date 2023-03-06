<template>
  <div>
    
    <div class="tw-relative tw-overflow-x-auto  sm:tw-rounded-lg">
        <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
            <thead class="tw-text-xs tw-text-gray-700 tw-uppercase tw-bg-gray-50">
                <tr>
                    <th scope="col" class="tw-p-4">
                        <div class="tw-flex tw-items-center">
                            <input id="checkbox-all-search" type="checkbox" class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500 focus:tw-ring-2">
                            <label for="checkbox-all-search" class="tw-sr-only">checkbox</label>
                        </div>
                    </th>
                    <th v-for="column in columns" :key="column.prop" scope="col" class="tw-px-6 tw-py-3 text-truncate">
                        <div class="tw-w-fit tw-flex tw-whitespace-nowrap">
                            {{ column.name }}
                        </div>
                    </th>
                    <th scope="col" class="tw-px-6 tw-py-3 text-truncate">
                        <div class="tw-w-fit tw-flex tw-whitespace-nowrap">
                            ACtions
                        </div>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr class="tw-bg-white tw-border-b  hover:tw-bg-gray-50">
                    <td class="tw-w-4 tw-p-4">
                        <div class="tw-flex tw-items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500   focus:tw-ring-2 ">
                            <label for="checkbox-table-search-1" class="tw-sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="tw-px-6 tw-py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap ">
                        Apple MacBook Pro 17"
                    </th>
                    <td class="tw-px-6 tw-py-4">
                        Silver
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        Laptop
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        Yes
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        Yes
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        $2999
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        3.0 lb.
                    </td>
                    <td class="tw-flex tw-items-center tw-px-6 tw-py-4 tw-space-x-3">
                        <a href="#" class="tw-font-medium tw-text-orange-500  hover:tw-underline">Show</a>
                        <a href="#" class="tw-font-medium tw-text-blue-600  hover:tw-underline">Edit</a>
                        <a href="#" class="tw-font-medium tw-text-red-600  hover:tw-underline">Remove</a>
                    </td>
                </tr>
                <tr class="tw-bg-white tw-border-b hover:tw-bg-gray-50 ">
                    <td class="tw-w-4 tw-p-4">
                        <div class="tw-flex tw-items-center">
                            <input id="checkbox-table-search-2" type="checkbox" class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500  focus:tw-ring-2">
                            <label for="checkbox-table-search-2" class="tw-sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="tw-px-6 tw-py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap ">
                        Microsoft Surface Pro
                    </th>
                    <td class="tw-px-6 tw-py-4">
                        White
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        Laptop PC
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        No
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        Yes
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        $1999
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        1.0 lb.
                    </td>
                    <td class="tw-flex tw-items-center tw-px-6 tw-py-4 tw-space-x-3">
                        <a href="#" class="tw-font-medium tw-text-orange-500  hover:tw-underline">Show</a>
                        <a href="#" class="tw-font-medium tw-text-blue-600  hover:tw-underline">Edit</a>
                        <a href="#" class="tw-font-medium tw-text-red-600  hover:tw-underline">Remove</a>
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>

  </div>
</template>

<script>
export default {
    props: [ 'columns', 'actions' ]
}
</script>

<style>

</style>