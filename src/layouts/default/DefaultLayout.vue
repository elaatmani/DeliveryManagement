<template>
  <div>
    <v-layout v-if="isLoggedIn" :full-height="true">
      <!-- Application Sidebar -->
      <AppSidebar :active="drawer" />

      <!-- Application Header -->
      <AppHeader @toggleSidebar="toggleSidebar" />

      <!-- Alert component -->j
      <Alert />
      <!-- Alert Notification -->
      <AlertNotification />

      <!-- Application container -->
      <v-main class="tw-bg-gray-50 tw-min-h-screen tw-overflow-y-auto">
        <v-container fluid :class="[$route.name == 'scanner/code' ? 'tw-p-0' : 'tw-p-2']">
          <AppAnnonces />
          <router-view></router-view>
        </v-container>
      </v-main>

      <button
        v-if="showScrollUpButton"
        @click="scrollToTop"
        :class="[$route.name == 'scanner/code' ? 'tw-left-3' : 'tw-right-3']"
        class="tw-fixed tw-shadow tw-text-sm tw-bottom-5 tw-right-3 tw-w-10 tw-h-10 tw-z-10 tw-rounded-full tw-bg-orange-400 tw-text-white"
      >
        <v-icon>mdi-transfer-up</v-icon>
      </button>
    </v-layout>
  </div>
</template>

<script>
import AppHeader from "@/layouts/default/partials/AppHeader";
import AppSidebar from "@/layouts/default/partials/AppSidebar";
import AppAnnonces from '@/layouts/default/partials/AppAnnonces'
import Alert from "@/components/AlertVue";
import AlertApi from '@/api/Alert';
// import Cookie from 'js-cookie'
import AlertNotification from "@/components/AlertNotification";
import User from "@/api/User";
// import {newNotificationHandler} from '@/channels/notification/new-notification';
import Sheet from "@/api/Sheet";
import Product from "@/api/Product";
import Sale from "@/api/Sale";
import Pusher from "pusher-js";
import Echo from "laravel-echo";
import { serverUrl } from '@/config/config'

export default {
  components: { AppHeader, AppSidebar, Alert, AlertNotification, AppAnnonces },

  data() {
    return {
      drawer: false,
      subscribed: false,
      fetching: null,
      delay: 60000,
      showScrollUpButton: false,
      firstFetch: false,
      pusher:false,
      echo: null,
      presenceChannelId: 2

      // delay: 6000,
    };
  },

  computed: {
    isLoggedIn() {
      return this.$store.getters["user/isLoggedIn"];
    },
    cities() {
      return this.$store.getters["city/cities"];
    },
    user() {
      return this.$store.getters["user/user"];
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
      this.drawer = !this.drawer;
    },
    checkScroll() {
      // Show the "scroll up" button when the vertical scroll position is greater than 100 pixels
      this.showScrollUpButton = window.scrollY > 100;
    },
    scrollToTop() {
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
    async getCities() {
      if (
        this.cities.length == 0 ||
        localStorage.getItem("update_cities") != 1
      ) {
        return User.cities().then((res) => {
          const cities = res.data.data;
          this.$store.dispatch("city/setCities", cities);
          localStorage.setItem("update_cities", 1);
        });
      }
    },
  async subscribe() {
            Pusher.Runtime.createXHR = function () {
                var xhr = new XMLHttpRequest();
                xhr.withCredentials = true;
                return xhr;
            };


            window.Pusher = Pusher
            const echo = new Echo({
                broadcaster: "pusher",
                key: '96c60637f1b07ace1345',
                cluster: 'eu',
                channelAuthorization: {
                    // transport: "jsonp",
                    endpoint: serverUrl + "api/pusher",
                    withCredentials: true,
                },
            })

            this.echo = echo;

            const channelId = this.presenceChannelId;
            echo.join(`channel.${channelId}`)
                .here((members) => {
                    this.$store.dispatch('online/setUsers', members);
                    this.$store.dispatch('online/setFetched', true);
                })
                .joining((member) => {
                    const members = this.$store.getters['online/users'];

                    // Find the member if they already exist
                    const existingMember = members.find(m => m.id === member.id);
                    if (existingMember) {
                        // Remove the `left_at` property if they rejoin
                        delete existingMember.left_at;
                    } else {
                        // If they don't exist, add them as a new member
                        members.push(member);
                    }

                    this.$store.dispatch('online/setUsers', members);
                })
                .leaving((member) => {
                    let members = this.$store.getters['online/users'];

                    // Update the member with the `left_at` time if they leave
                    members = members.map(m => {
                        if (m.id === member.id) {
                            return {
                                ...m,
                                left_at: new Date().toISOString()
                            };
                        }
                        return m;
                    });

                    this.$store.dispatch('online/setUsers', members);
                });

        },

        unsubscribe() {
            this.echo.leaveChannel(`channel.${this.presenceChannelId}`);
        },
    sync_sheets() {
      if (this.user.role == "admin") {
        Sheet.sync_all().then((res) => {
          if (res.data.code == "SUCCESS") {
            const sales = [...res.data.data.orders, ...this.sales];
            this.$store.dispatch("sale/setSales", sales);
            if (res.data.data.orders.length > 0) {
              this.$alert({
                type: "info",
                title:
                  res.data.data.orders.length + " New orders has been added",
              });
            }
          }
        });
      } else {
        Sheet.auto();
      }
    },
    getUsers() {
      User.all()
        .then((res) => {
          if (res?.data.code == "SHOW_ALL_USERS") {
            const users = res.data.data.users;
            this.$store.dispatch("user/setUsers", users);
            this.$store.dispatch("user/setFetched", true);
          }
        })
        .catch(this.$handleApiError);
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
    async fetchNewOrders() {
      if (this.salesFetched || !this.firstFetch) {
        const ids = this.sales.map((s) => s.id);
        return Sale.getNewOrders(ids).then((res) => {
          if (res.data.code == "SUCCESS") {
            const newSales = res.data.data.orders;
            const count = res.data.data.count;
            this.$store.dispatch("sale/setCount", count);
            if (newSales.length > 0) {
              this.$store.dispatch("sale/addSales", newSales);
              this.$alert({
                type: "info",
                title: newSales.length + " New orders has been added",
              });
            }

            this.firstFetch = true;
          }
        });
      }
      // .catch(this.$handleApiError)
    },

    getSales() {
      this.isLoaded = false;
      return Sale.all()
        .then((res) => {
          if (res?.data.code == "SUCCESS") {
            const sales = res.data.data.orders;
            this.$store.dispatch("sale/setSales", sales);
            this.$store.dispatch("sale/setFetched", true);
            this.isLoaded = true;
          }
        })
        .catch(this.$handleApiError);
    },
    async getAlerts() {
            return AlertApi.alerts()
            .then(
                res => {
                    if (res?.data.code == "SUCCESS") {
                        const alerts = res.data.alerts
                        this.$store.dispatch('app/setAlertsData', alerts)
                        this.$store.dispatch('app/setAlertsFetched', true)
                        this.isLoaded = true
                    }
                }
            ).catch(this.$handleApiError)
        }
  },

  watch: {
    $route() {
      if (this.user.role == "agente") {
        this.$store.dispatch("agent/refreshCounts");
      }
    },
  },

  mounted() {
    this.getCities();
    this.getAlerts();
    this.subscribe();

    // !this.subscribed && this.subscribe();

    if (this.user.role == "admin") {
      this.fetchNewOrders();
    }
    if (this.$can("show_all_products")) {
      this.getProducts();
    }

    if (this.user.role == "agente") {
      this.$store.dispatch("agent/refreshCounts");
    }

    this.getUsers();

    window.addEventListener("scroll", this.checkScroll);
  },

  unmounted() {
    window.removeEventListener("scroll", this.checkScroll);
    this.unsubscribe();
  },
};
</script>

<style></style>
