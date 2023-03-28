<template>
  <div>
    
    <div class="tw-relative tw-overflow-x-auto  sm:tw-rounded-lg">
        <table class="tw-w-full tw-text-sm tw-text-left tw-text-gray-500">
            <thead class="tw-text-xs tw-text-gray-700 tw- tw-bg-gray-50">
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
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in users" :key="user.id" class="tw-bg-white tw-border-b tw-whitespace-nowrap hover:tw-bg-gray-50">
                    <td class="tw-w-4 tw-p-4">
                        <div class="tw-flex tw-items-center">
                            <input id="checkbox-table-search-1" type="checkbox" class="tw-w-4 tw-h-4 tw-text-blue-600 tw-bg-gray-100 tw-border-gray-300 tw-rounded focus:tw-ring-blue-500   focus:tw-ring-2 ">
                            <label for="checkbox-table-search-1" class="tw-sr-only">checkbox</label>
                        </div>
                    </td>
                    <th scope="row" class="tw-px-6 tw-py-4 tw-font-medium tw-text-gray-900 tw-whitespace-nowrap ">
                        {{ user.id }}
                    </th>
                    <td class="tw-px-6 tw-py-4">
                        {{ user.firstname }} {{ user.lastname }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <RoleName :role="user.role_name" />
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ user.email }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        {{ user.phone }}
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <div class="tw-text-red-500" v-if="!user.last_action">
                            Never Connected
                        </div>
                        <div v-else>
                            <div class="tw-text-green-500 tw-flex tw-items-center tw-gap-2" v-if="isOnline(lastSeen(user.last_action)) == true">
                                 <div class="tw-p-1 tw-rounded-full tw-bg-green-500"></div> Online
                            </div>
                            <div class="tw-text-neutral-700" v-else>
                                {{ lastSeen(user.last_action) }}
                            </div>
                        </div>
                    </td>
                    <td class="tw-px-6 tw-py-4">
                        <UserStatus v-if="$can('update_user_status')" :user="user" />
                    </td>
                    <td class="tw-flex tw-items-center tw-px-6 tw-py-4 tw-space-x-3">
                        <UserActions :user="user" />
                    </td>
                </tr>
                
            </tbody>
        </table>
    </div>

  </div>
</template>

<script>
import UserActions from '@/views/user/partials/UserActions'
import UserStatus from '@/views/user/partials/UserStatus'
import RoleName from '@/views/user/partials/RoleName'

import { getLastSeen } from 'last-seen-ago'

export default {
    props: [ 'columns', 'users' ],
    components: { UserActions, UserStatus, RoleName },

    methods: {
        lastSeen(last_action) {
            let t = Date.parse(last_action.replace('-', '/')) / 1000;
            return getLastSeen(t) 
        },
        isOnline(time) {
            let times = ['Just Now', 'one minute ago', '2 minutes ago', '3 minutes ago']

            return times.includes(time)
        }
    }
}
</script>

<style>

</style>