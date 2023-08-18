<template>
    <div class="md:tw-col-span-3 tw-col-span-12 tw-rounded">
        <label
          for="countries"
          class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
          >{{ label }}</label
        >
        <select
          v-model="filterBy"
          class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
        >
          <option value="all" selected>All</option>
          <option value="today" class="tw-capitalize">Today</option>
          <option value="yesterday" class="tw-capitalize">Yesterday</option>
          <option value="this-month" class="tw-capitalize">This Month</option>
          <option value="last-month" class="tw-capitalize">Last Month</option>
          <option value="custom" class="tw-capitalize">Custom</option>

        </select>
      </div>

    <template v-if="filterBy == 'custom'">
        
        <div class="md:tw-col-span-3 tw-col-span-12 tw-rounded">
            <label
            for="countries"
            class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
            >{{ label }} From</label
            >
            <input
            @input="handleChange($event, 'from')"
            :value="from"
            type="date"
            class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
            />
        </div>

        <div class="md:tw-col-span-3 tw-col-span-12 tw-rounded">
            <label
            for="countries"
            class="tw-block tw-mb-2 tw-text-sm tw-font-medium tw-text-gray-900"
            >{{ label }} To</label
            >
            <input
            @input="handleChange($event, 'to')"
            :value="to"
            type="date"
            class="tw-bg-gray-50 tw-border-solid tw-outline-none tw-border tw-border-gray-300 tw-text-gray-900 tw-text-sm tw-rounded-lg focus:tw-ring-orange-500 focus:tw-border-orange-500 tw-block tw-w-full tw-p-2.5"
            />
        </div>
    </template>
</template>

<script>
import moment from 'moment';
export default {
    props: {
        from: {
            required: true
        },
        to: {
            required: true
        },
        label: {
            required: true
        }
    },

    data() {
        return {
            filterBy: 'all'
        }
    },

    watch: {
        filterBy(value) {
            let currentDate = null;
            
            switch (value) {
                case 'all': 
                    this.setFrom(null)
                    this.setTo(null);
                break;
                case 'today':
                    // Format the current date
                    currentDate = moment().format("YYYY-MM-DD");
                    this.setFrom(currentDate)
                    this.setTo(currentDate);
                break;

                case 'yesterday':
                    // Format the current date
                    currentDate = moment().subtract(1, 'days').format("YYYY-MM-DD");
                    this.setFrom(currentDate)
                    this.setTo(currentDate);
                break;

                case 'this-month':
                    // Format the current date
                    var startDate = moment().startOf('month').format("YYYY-MM-DD");
                    var endDate = moment().endOf('month').format("YYYY-MM-DD");
                    this.setFrom(startDate)
                    this.setTo(endDate);
                break;

                case 'last-month':
                    // Format the current date
                    startDate = moment().subtract(1, 'months').startOf('month').format("YYYY-MM-DD");
                    endDate = moment().subtract(1, 'months').endOf('month').format("YYYY-MM-DD");
                    this.setFrom(startDate)
                    this.setTo(endDate);
                break;
            
                default:
                    break;
            }
        }
    },

    methods: {
        setFrom(v) {
            this.$emit('update:from', v)
        },
        setTo(v) {
            this.$emit('update:to', v)
        },

        handleChange(e, t) {
            switch (t) {
                case 'from':
                    this.setFrom(e.target.value)
                break;
                case 'to':
                    this.setTo(e.target.value)
                break;
            
                default:
                    break;
            }
        }
    }
}
</script>

<style>

</style>