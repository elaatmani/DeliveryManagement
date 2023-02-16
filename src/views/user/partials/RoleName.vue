<template>
  <div class="tw-flex tw-items-center  tw-h-full">
    <div :class="current.bg" class="tw-px-2 tw-py-1 tw-rounded-lg">
        <div :class="current.text" class=" tw-text-sm tw-font-bold">
            {{ model.role_name }}
        </div>
    </div>
  </div>
</template>

<script>
export default {
    props: ["rowIndex", "prop", "model"],
    data() {
        return {
            variants: {
                'default': {
                    'bg':'tw-bg-neutral-500/10',
                    'text': 'tw-text-neutral-500'
                },
                'admin': {
                    'bg':'tw-bg-pink-500/10',
                    'text': 'tw-text-pink-500'
                },
                'agente': {
                    'bg':'tw-bg-green-500/10',
                    'text': 'tw-text-green-500'
                },
                'delivery': {
                    'bg':'tw-bg-blue-500/10',
                    'text': 'tw-text-blue-500'
                }
            }
        }
    },

    computed: {
        current() {
            if (['admin', 'delivery', 'agente'].includes(this.model.role_name)){
                return this.variants[this.model.role_name]
            }

            return this.variants['default']
        }
    }

}
</script>

<style>

</style>