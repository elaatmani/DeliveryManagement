<template>
  <div class="tw-h-full tw-flex tw-items-center"> 
    <div class="tw-w-[32px] tw-h-[32px] tw-rounded-full tw-overflow-hidden">
        <img :src="localUrl + 'assets/img/profiles/avatar.webp'" class="tw-w-full tw-h-full tw-object-cover" alt="">
    </div>
  </div>
</template>

<script>
import { localUrl, serverUrl } from '@/config/config'

export default {
    props: ["rowIndex", "prop", "model"],
    data() {
        return {
            serverUrl,
            localUrl
            
        }
    }

}
</script>

<style>

</style>