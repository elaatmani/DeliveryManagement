<template>
    <div class="py-5 px-2 tw-border tw-h-[calc(100vh-135px)] tw-bg-white tw-w-full tw-rounded-md tw-mb-5" >
        <!-- <div v-if="!isLoaded">
            <div class="tw-flex tw-items-center tw-justify-center tw-pt-[300px]">
                <v-icon size="large" class="tw-animate-spin" color="primary-color">mdi-loading</v-icon>
            </div>
        </div> -->
        <div class="tw-grid tw-px-2 tw-grid-cols-12 tw-justify-center tw-h-full ">
            <div class="lg:tw-col-span-8 tw-col-span-12 tw-flex tw-flex-col tw-items-center tw-justify-center">
                <p class="tw-text-xl tw-font-semibold tw-py-4">Scan the order reference ID.</p>
                <icon class="tw-w-[150px] tw-h-[150px] tw-border-2 tw-rounded-3xl" icon="mage:qr-code"/>
                <div class="tw-flex tw-items-center tw-py-5"> 
                    <hr class="tw-flex-grow tw-border-t tw-border-gray-600 tw-w-[60px] "> 
                    <span class="tw-px-3 tw-text-gray-500"> 
                        Or enter the code manually
                    </span> 
                    <hr class="tw-flex-grow tw-border-t tw-border-gray-600 tw-w-[60px]"> 
                </div>    
                <div class="tw-grid tw-grid-cols-8 col-span-12 tw-gap-2 tw-w-full tw-max-w-[23rem]">
                    <input id="code" type="text"  class="tw-bg-gray-50 border tw-col-span-6 tw-rounded-lg focus:tw-ring-gray-500 focus:tw-border-gray-500 tw-block tw-w-full tw-p-2.5 dark:tw-bg-gray-700 dark:tw-border-gray-600 dark:tw-placeholder-gray-400 dark:tw-text-gray-400 dark:tw-focus:tw-ring-blue-500 dark:focus:tw-border-blue-500">
                    <button @click='Copy' class="tw-col-span-2 tw-text-white tw-bg-gray-700 tw-hover:bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-gray-300 tw-font-medium tw-rounded-lg tw-text-sm w-full sm:tw-w-auto tw-py-2.5 tw-text-center dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800 tw-items-center tw-inline-flex tw-justify-center">
                        <span id="success-message" class="tw-inline-flex tw-items-center">
                            <icon icon="mdi:content-copy"/>
                        </span>
                    </button>
                </div>
                <div class="tw-grid tw-grid-cols-8 tw-py-5 tw-gap-2 tw-w-full tw-max-w-[23rem]">
                    <button class="tw-col-span-8 tw-text-white tw-bg-gray-700 tw-hover:bg-blue-800 focus:tw-ring-4 focus:tw-outline-none focus:tw-ring-gray-300 tw-font-medium tw-rounded-lg tw-text-sm w-full sm:tw-w-auto tw-py-2.5 tw-text-center dark:tw-bg-blue-600 dark:hover:tw-bg-blue-700 dark:focus:tw-ring-blue-800 tw-items-center tw-inline-flex tw-justify-center">
                        <span id="success-message" class="tw-inline-flex tw-items-center">
                            Confirm
                        </span>
                    </button>
                </div>
  
                </div>
            <div class="tw-bg-orange-400 tw-rounded-xl lg:tw-col-span-4 tw-flex tw-items-center tw-justify-center">
                <!-- <qrcode-stream
                    :constraints="{ deviceId: selectedDevice.deviceId }"
                    :track="trackFunctionSelected.value"
                    :formats="selectedBarcodeFormats"
                    @error="onError"
                    @detect="onDetect"
                    v-if="selectedDevice !== null"
                ></qrcode-stream>
                <p
                    v-else
                    class="error"
                >
                    No cameras on this device
                </p> -->
                </div>
        </div>
    </div>
</template>
<script setup>
// import { QrcodeStream } from 'vue-qrcode-reader'
// import {ref,computed,onMounted} from "vue";

// function paintOutline(detectedCodes, ctx) {
//   for (const detectedCode of detectedCodes) {
//     const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

//     ctx.strokeStyle = 'red'

//     ctx.beginPath()
//     ctx.moveTo(firstPoint.x, firstPoint.y)
//     for (const { x, y } of otherPoints) {
//       ctx.lineTo(x, y)
//     }
//     ctx.lineTo(firstPoint.x, firstPoint.y)
//     ctx.closePath()
//     ctx.stroke()
//   }
// }
// function paintBoundingBox(detectedCodes, ctx) {
//   for (const detectedCode of detectedCodes) {
//     const {
//       boundingBox: { x, y, width, height }
//     } = detectedCode

//     ctx.lineWidth = 2
//     ctx.strokeStyle = '#007bff'
//     ctx.strokeRect(x, y, width, height)
//   }
// }
// function paintCenterText(detectedCodes, ctx) {
//   for (const detectedCode of detectedCodes) {
//     const { boundingBox, rawValue } = detectedCode

//     const centerX = boundingBox.x + boundingBox.width / 2
//     const centerY = boundingBox.y + boundingBox.height / 2

//     const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

//     ctx.font = `bold ${fontSize}px sans-serif`
//     ctx.textAlign = 'center'

//     ctx.lineWidth = 3
//     ctx.strokeStyle = '#35495e'
//     ctx.strokeText(detectedCode.rawValue, centerX, centerY)

//     ctx.fillStyle = '#5cb984'
//     ctx.fillText(rawValue, centerX, centerY)
//   }
// }
// const trackFunctionOptions = [
//   { text: 'nothing (default)', value: undefined },
//   { text: 'outline', value: paintOutline },
//   { text: 'centered text', value: paintCenterText },
//   { text: 'bounding box', value: paintBoundingBox }
// ]
// const trackFunctionSelected = ref(trackFunctionOptions[1])

// const selectedDevice = ref(null)
// const devices = ref([])

// onMounted(async () => {
//   devices.value = (await navigator.mediaDevices.enumerateDevices()).filter(
//     ({ kind }) => kind === 'videoinput'
//   )

//   if (devices.value.length > 0) {
//     selectedDevice.value = devices.value[0]
//   }
// })

// const result = ref('')

// function onDetect(detectedCodes) {
//   result.value = JSON.stringify(detectedCodes.map((code) => code.rawValue))

// }
// const barcodeFormats = ref({
//   qr_code: true,
// })
// const selectedBarcodeFormats = computed(() => {
//     return Object.keys(barcodeFormats.value || {}).filter((format) => barcodeFormats.value && barcodeFormats.value[format]);
// })

// const error = ref('')

// function onError(err) {
//   if (err.name === 'NotAllowedError') {
//     error.value += 'you need to grant camera access permission'
//   } else if (err.name === 'NotFoundError') {
//     error.value += 'no camera on this device'
//   } else if (err.name === 'NotSupportedError') {
//     error.value += 'secure context required (HTTPS, localhost)'
//   } else if (err.name === 'NotReadableError') {
//     error.value += 'is the camera already in use?'
//   } else if (err.name === 'OverconstrainedError') {
//     error.value += 'installed cameras are not suitable'
//   } else if (err.name === 'StreamApiNotSupportedError') {
//     error.value += 'Stream API is not supported in this browser'
//   } else if (err.name === 'InsecureContextError') {
//     error.value +=
//       'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
//   } else {
//     error.value += err.message
//   }
// }
const Copy = () => { 
  var copyText = document.getElementById("code");
  copyText.select();
  navigator.clipboard.writeText(copyText.value)
 }

</script>
<style lang="">
    
</style>