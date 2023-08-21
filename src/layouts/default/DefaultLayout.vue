<template>
  <div>
    <v-layout v-if="isLoggedIn" :full-height="true">

        <!-- Application Sidebar -->
        <AppSidebar :active="drawer" />

        <!-- Application Header -->
        <AppHeader @toggleSidebar="toggleSidebar" />

        <!-- Alert component -->
        <Alert />

        <!-- Application container -->
        <v-main class="tw-bg-gray-50 tw-min-h-screen tw-overflow-y-auto">
            
            <v-container fluid class="py-6 px-6">
                <router-view></router-view>
            </v-container>
        </v-main>

        <button v-if="showScrollUpButton" @click="scrollToTop" class="tw-fixed tw-shadow tw-text-sm tw-bottom-5 tw-right-3 tw-w-10 tw-h-10 tw-z-10 tw-rounded-full tw-bg-orange-400 tw-text-white">
            <v-icon>mdi-transfer-up</v-icon>
        </button>
    </v-layout>
  </div>
</template>

<script>
import AppHeader from '@/layouts/default/partials/AppHeader'
import AppSidebar from '@/layouts/default/partials/AppSidebar'
import Alert from '@/components/AlertVue'
import User from '@/api/User'
import Pusher from 'pusher-js'
import Echo from 'laravel-echo'
import Sheet from '@/api/Sheet'
import Product from '@/api/Product'
import Sale from '@/api/Sale'

export default {
    components: { AppHeader, AppSidebar, Alert },

    data() {
        return {
            drawer: false,
            subscribed: false,
            fetching: null,
            delay: 60000,
            showScrollUpButton: false,
            firstFetch: false,
            // delay: 6000,
        }
    },

    computed: {
        isLoggedIn() {
            return this.$store.getters['user/isLoggedIn']
        },
        cities() {
            return this.$store.getters['city/cities']
        },
        user() {
            return this.$store.getters['user/user']
        },
        sales() {
            return this.$store.getters["sale/sales"];
        },
        salesFetched() {
            return this.$store.getters["sale/fetched"];
        },
    },

    methods: {
        toggleSidebar() {
            this.drawer = !this.drawer
        },
        checkScroll() {
            // Show the "scroll up" button when the vertical scroll position is greater than 100 pixels
            this.showScrollUpButton = window.scrollY > 100;
            },
            scrollToTop() {
            // Scroll to the top of the page
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            },
        async getCities() {
            if(this.cities.length == 0 || localStorage.getItem('update_cities') != 1) {
                return User.cities().then(
                    res => {
                        const cities = res.data.data
                        this.$store.dispatch('city/setCities', cities);
                        localStorage.setItem('update_cities', 1)
                    }
                )
            }
        },

        subscribe() {
            // const Pusher = window.Pusher
            console.log(Pusher);

            const echo = new Echo({
                broadcaster: 'pusher',
                key: 'ABCDEFG',
                wsHost: '127.0.0.1',
                wsPort: 6001,
                forceTLS: false,
                disableStats: true,
                cluster: 'mt1'
            });

            window.Echo = echo;

            echo.channel('notification')
            .listenToAll(   (e) => {
                console.log(e);
            })

            this.subscribed = true
        },

        sync_sheets() {
            if(this.user.role == 'admin') {
                Sheet.sync_all()
                .then(
                    res => {
                        if(res.data.code == 'SUCCESS') {
                            const sales = [...res.data.data.orders, ...this.sales];
                            this.$store.dispatch('sale/setSales', sales);
                            if(res.data.data.orders.length > 0) {
                                this.$alert({
                                    type: 'info',
                                    title: res.data.data.orders.length + ' New orders has been added'
                                })
                            }
                        }
                    }
                )
            } else {
                Sheet.auto()
            }
        },
        getUsers() {
            User.all().then(
            res => {
                if(res?.data.code == "SHOW_ALL_USERS") {
                    const users = res.data.data.users
                    this.$store.dispatch('user/setUsers', users);
                    this.$store.dispatch('user/setFetched', true);
                }
                }
                ).catch(this.$handleApiError)
            },
        getProducts() {
        return Product.all().then(
            (res) => {
                if (res.data.code == "SUCCESS") {
                    this.$store.dispatch("product/setProducts", res.data.data.products);
                    this.$store.dispatch("product/setFetched", true);
                }
                },
                (err) => {
                this.$handleApiError(err);
                }
            );
        },
        fetchNewOrders() {
            if(this.salesFetched || !this.firstFetch) {
                const ids = this.sales.map(s => s.id);
                return Sale.getNewOrders(ids)
                .then(res => {
                    if(res.data.code == 'SUCCESS') {
                        const newSales = res.data.data.orders;
                        const count = res.data.data.count;
                            this.$store.dispatch('sale/setCount', count);
                        if(newSales.length > 0) {
                            this.$store.dispatch('sale/addSales', newSales);
                            this.$alert({
                                type: 'info',
                                title: newSales.length + ' New orders has been added'
                            })
                        }

                        this.firstFetch = true;
                    }
                })
            }
            // .catch(this.$handleApiError)
        },

        getSales() {
        this.isLoaded = false
        return Sale.all().then(
          res => {
            if (res?.data.code == "SUCCESS") {
              const sales = res.data.data.orders
              this.$store.dispatch('sale/setSales', sales)
              this.$store.dispatch('sale/setFetched', true)
              this.isLoaded = true
            }
          }
        ).catch(this.$handleApiError)
      },
    },

    mounted() {
        this.getCities();
        // !this.subscribed && this.subscribe();

        if(this.user.role == 'admin') {
            this.fetchNewOrders()
            // .finally(() => {
            //     if(this.$can('access_to_sales')) {
            //         this.getSales();
            //     }
            // })

            // this.fetching = setInterval(this.sync_sheets, this.delay);
            // this.fetching = setInterval(this.fetchNewOrders, this.delay);
        }
        if(this.$can('show_all_products')) {
            this.getProducts();
        }
        
        this.getUsers();

        window.addEventListener('scroll', this.checkScroll);
    },

    unmounted() {
        window.removeEventListener('scroll', this.checkScroll);
    }


}
</script>

<style>

</style>