<template>
  <div :key="affectation" v-if="fetched" v-click-outside="close" class="tw-relative tw-min-w-[100px]">
    <div>
        <div class="tw-relative">
            <select :disabled="confirmation != 'confirmer'" v-model="affectationValue" class="tw-w-full focus:tw-border-orange-400 tw-h-[40px] px-2 tw-rounded-md tw-border tw-border-solid tw-border-neutral-200  tw-outline-0  tw-text-sm">
            <option v-for="o in options" :key="o.id" :value="o.id">{{ o.firstname + ' ' + o.lastname }}</option>
            </select>
            <v-icon class="tw-pointer-events-none tw-absolute tw-right-1 tw-text-neutral-500 tw-top-1/2 -tw-translate-y-1/2">mdi-chevron-down</v-icon>
        </div>
    </div>
  </div>
  <div class="tw-relative tw-min-w-[100px] tw-flex tw-items-center" v-else>
    <v-icon class="tw-animate-spin tw-ml-1 tw-text-orange-500">mdi-loading</v-icon>
  </div>
</template>

<script>
import User from '@/api/User';
export default {
    props: [ 'affectation', 'id', 'order', 'confirmation', 'items', 'productIds' ],
    data() {
        return {
            isOpen: false,
            isLoading: false,
            selectedId: null,
            fetched: false,
        }
    },
    computed: {
        options() {
            return [{ id: null, firstname: 'select', lastname: '' }, ...this.deliveries]
        },
        order_items(){
            return this.items
        },
        affectationValue: {
            get() {
                return this.affectation
            },
            set(v) {
                this.$emit('update:affectation', v)
            }
        },
        selected() {
            // Check if the delivery id is exists if not return null
                const ids = [...this.deliveries.map(i => parseInt(i.id))]

            if(this.selectedId == null || !ids.includes(parseInt(this.selectedId))) {
                return { id: null, firstname: 'select', lastname: '' }
            }
            

            return this.options.filter(i => i.id == this.selectedId)[0]
            
        },
        users() {
          return this.$store.getters['user/users']
        },
        allDeliveries() {
            return this.users.filter(u => u.role_name == 'delivery')
            // return this.$store.getters['user/deliveries']
        },
        // fetched() {
        //   return this.$store.getters['user/fetched']
        // },
        deliveries() {
            // console.log(this.allDeliveries);
          return this.allDeliveries.filter(d => d.delivery_products.some(p => this.productIds.includes(p.product_id)))
        }
    },
    methods: {
        close() {
            this.isOpen = false
        },
        toggle() {
            this.isOpen = !this.isOpen
        },
        handleChange(option) {
            if(option.id === this.selectedId) return false;
            this.selectedId = option.id
            this.isLoading = true
            this.updateOrder();
            this.close()
        },
        getUsers() {
            this.fetched = false;
            User.all().then(
            res => {
                if(res?.data.code == "SHOW_ALL_USERS") {
                    const users = res.data.data.users
                    this.$store.dispatch('user/setUsers', users);
                    this.$store.dispatch('user/setFetched', true);
                    this.fetched = true
                }
                }
                ).catch(this.$handleApiError)
        }
    },
    mounted() {
        this.selectedId = this.affectation;
        this.getUsers();

        
    }
};
</script>

<style>
</style>