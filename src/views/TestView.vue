<template>
  <div>

    <div class="py-5 px-5 tw-border bg-white tw-w-full tw-rounded-md">

      <div>
        <v-btn @click="sendRequest" :loading="isLoading" variant="flat" color="primary-color">Send Request</v-btn>
      </div>
    </div>
  </div>
</template>

<script>
import test, {path, method} from '@/helpers/test'
import Api from '@/api/Api'
import Csrf from '@/api/Csrf'

export default {
    data() {
        return {
            isLoading: false,
            test
        }
    },

    methods: {
        async sendRequest() {
            this.isLoading = true
            await Csrf.getCookie()
            switch (method) {
                case 'get':
                    Api.get(path)
                    .then(
                        res => {
                            console.log('---- Success Response ----');
                            console.log(`---- Code ${res.status} ----`);
                            console.log(res.data);
                        },
                        err => {
                            this.$handleApiError(err);
                            console.log('---- Failed Response ----');
                            console.log(`---- Code ${err?.response.status} ----`);
                            console.log(err?.response?.data);
                        }
                    )
                    .finally(() => this.isLoading = false)
                break;
                case 'post':
                    Api.post(path, test)
                    .then(
                        res => {
                            console.log('---- Success Response ----');
                            console.log(`---- Code ${res.status} ----`);
                            console.log(res.data);
                        },
                        err => {
                            this.$handleApiError(err);
                            console.log('---- Failed Response ----');
                            console.log(`---- Code ${err?.response.status} ----`);
                            console.log(err?.response?.data);
                        }
                    )
                    .finally(() => this.isLoading = false)
                break;
                case 'delete':
                    Api.delete(path)
                    .then(
                        res => {
                            console.log('---- Success Response ----');
                            console.log(`---- Code ${res.status} ----`);
                            console.log(res.data);
                        },
                        err => {
                            this.$handleApiError(err);
                            console.log('---- Failed Response ----');
                            console.log(`---- Code ${err?.response.status} ----`);
                            console.log(err?.response?.data);
                        }
                    )
                    .finally(() => this.isLoading = false)
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