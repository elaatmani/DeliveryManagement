<template >
    <div :add="audiourl = $frontend('assets/bip.mp3')">
        <button @click="togglePopUp(true)" class="tw-flex tw-items-center tw-gap-2 tw-py-2 tw-px-4 tw-bg-white hover:tw-bg-neutral-100 tw-duration-200 tw-border tw-border-solid tw-border-neutral-200 tw-rounded-md tw-mb-2">
            <icon icon="iconamoon:scanner-light" class="tw-text-xl" />
            <span>Scan</span>
        </button>

        <popup-new :visible="props.visible"  >
            <div class="tw-w-full tw-max-w-[600px] tw-mx-auto tw-p-2">
            <div class="tw-w-full tw-h-fit tw-bg-white tw-rounded-md tw-border tw-border-solid tw-shadow-md">
                <h1
                        class="tw-text-lg tw-font-medium tw-text-gray-600 tw-bg-gray-100 tw-border-b tw-border-solid tw-p-4">
                        Scan the QR code 
                    </h1>
                <div class="tw-p-5">

                    <div class="tw-rounded tw-overflow-hidden tw-ring tw-ring-orange-400">

                        <qrcode-stream
                        :constraints="{ deviceId: selectedDevice.deviceId }"
                        :track="trackFunctionSelected.value"
                        :formats="selectedBarcodeFormats"
                        :facing-mode="'environment'"
                        @error="onError"
                        @detect="onDetect"
                        v-if="selectedDevice !== null"
                        ></qrcode-stream>
                        <p
                        v-else
                        class="error"
                        >
                        No cameras on this device
                    </p>
                </div>

            </div>
            <div
                        class="tw-flex tw-justify-end tw-items-center tw-p-2 tw-gap-3 dark:tw-bg-neutral-900 tw-bg-gray-100 tw-border-t tw-border-solid">
                        <button 
                            @click="togglePopUp(false)"
                            :disabled="false"
                            class="tw-py-2 tw-px-7 tw-rounded tw-text-sm tw-border tw-border-solid tw-border-tansparent dark:tw-border-neutral-900 hover:tw-border-neutral-400 dark:hover:tw-border-neutral-500 hover:tw-bg-gray-300 tw-bg-gray-200 dark:tw-bg-neutral-600 tw-duration-300 tw-text-neutral-900 dark:tw-text-neutral-300">
                            Cancel
                        </button>
                       
                    </div>
    </div>
</div>
    </popup-new>
    </div>
</template>
<script setup>
import { QrcodeStream } from 'vue-qrcode-reader'
import {ref,computed,onMounted, defineEmits, defineProps} from "vue";
import { useAlert } from '@/composables/useAlert';

const audiourl = ref('')
const emit = defineEmits(['update:visible',"detect"])
const props = defineProps(['visible'])
const togglePopUp = (value) => { 
    emit("update:visible",value)
 }
function paintOutline(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const [firstPoint, ...otherPoints] = detectedCode.cornerPoints

    ctx.strokeStyle = 'red'

    ctx.beginPath()
    ctx.moveTo(firstPoint.x, firstPoint.y)
    for (const { x, y } of otherPoints) {
      ctx.lineTo(x, y)
    }
    ctx.lineTo(firstPoint.x, firstPoint.y)
    ctx.closePath()
    ctx.stroke()
  }
}
function paintBoundingBox(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const {
      boundingBox: { x, y, width, height }
    } = detectedCode

    ctx.lineWidth = 2
    ctx.strokeStyle = '#007bff'
    ctx.strokeRect(x, y, width, height)
  }
}
function paintCenterText(detectedCodes, ctx) {
  for (const detectedCode of detectedCodes) {
    const { boundingBox, rawValue } = detectedCode

    const centerX = boundingBox.x + boundingBox.width / 2
    const centerY = boundingBox.y + boundingBox.height / 2

    const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width)

    ctx.font = `bold ${fontSize}px sans-serif`
    ctx.textAlign = 'center'

    ctx.lineWidth = 3
    ctx.strokeStyle = '#35495e'
    ctx.strokeText(detectedCode.rawValue, centerX, centerY)

    ctx.fillStyle = '#5cb984'
    ctx.fillText(rawValue, centerX, centerY)
  }
}
const trackFunctionOptions = [
  { text: 'nothing (default)', value: undefined },
  { text: 'outline', value: paintOutline },
  { text: 'centered text', value: paintCenterText },
  { text: 'bounding box', value: paintBoundingBox }
]
const trackFunctionSelected = ref(trackFunctionOptions[1])

const selectedDevice = ref(null)
const devices = ref([])

onMounted(async () => {
  devices.value = (await navigator.mediaDevices.enumerateDevices()).filter(
    ({ kind }) => kind === 'videoinput'
  )

  if (devices.value.length > 0) {
    selectedDevice.value = devices.value[0]
  }
})

const result = ref('')

function onDetect(detectedCodes) {
    const numbersonly = detectedCodes.map((code) => code.rawValue.replace(/[^0-9]/g, '')).join(', ');
    useAlert('Your order ID is: ' + numbersonly)
    emit("detect",numbersonly);
    togglePopUp(false);
    var audio = new Audio(audiourl.value);
    audio.play();
    result.value = numbersonly;
}
const barcodeFormats = ref({
  qr_code: true,
})
const selectedBarcodeFormats = computed(() => {
    return Object.keys(barcodeFormats.value || {}).filter((format) => barcodeFormats.value && barcodeFormats.value[format]);
})

const error = ref('')

function onError(err) {
  if (err.name === 'NotAllowedError') {
    error.value += 'you need to grant camera access permission'
  } else if (err.name === 'NotFoundError') {
    error.value += 'no camera on this device'
  } else if (err.name === 'NotSupportedError') {
    error.value += 'secure context required (HTTPS, localhost)'
  } else if (err.name === 'NotReadableError') {
    error.value += 'is the camera already in use?'
  } else if (err.name === 'OverconstrainedError') {
    error.value += 'installed cameras are not suitable'
  } else if (err.name === 'StreamApiNotSupportedError') {
    error.value += 'Stream API is not supported in this browser'
  } else if (err.name === 'InsecureContextError') {
    error.value +=
      'Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.'
  } else {
    error.value += err.message
  }
}
</script>
<style lang="">
    
</style>