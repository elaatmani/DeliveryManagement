<template>
    <div v-if="visible">
        <teleport to="body">
            <div>
                <div
                ref="popup"
                class="
                    tw-fixed tw-top-0 tw-left-0 tw-z-[50999] tw-right-0 tw-bottom-0
                    tw-flex tw-items-center tw-justify-center
                "
                >
                
                <v-fade-transition>
                        <div
                            v-if="showContent"
                            @click.self="resolve(false)"
                            class="tw-z-[50999] tw-w-full md:tw-min-w-[300px] !tw-overflow-auto !tw-max-h-screen"
                        >
                            <slot></slot>
                            
                        </div>
                </v-fade-transition>

                <div
                    @click="resolve(false)"
                    class="
                    tw-duration-300
                    tw-absolute
                    tw-top-0
                    tw-left-0
                    tw-w-full
                    tw-h-full
                    
                    tw-backdrop-blur-sm
                    tw-bg-black/20
                    tw-opacity-0
                    "
                    :class="{'!tw-opacity-100': visible}"
                ></div>
                </div>
            </div>
        </teleport>
    </div>
</template>

<script>
export default {
    props: {
        visible: {
            required: true,
            default: false
        },
        closeable: {
            required: false,
            default: true
        }
    },
    data() {
        return {
            showContent: false
        };
    },
    watch: {
        visible(value) {
            if(!value) {
                this.showContent = value;
            }
            else {
                setTimeout(() => {
                    this.showContent = value;
                }, 0)
            }
        },
    },
    methods: {
        resolve(value) {
            if(this.closeable) {
                this.$emit("cancel", value);
            }
        },
    },
    computed: {},

    mounted() {
        // document.body.style.overflow = 'hidden'
        // document.body.style.height = '100vh'
        this.showContent = this.visible;
    },

    unmounted() {
        // document.body.style.height = 'none'
        // document.body.style.overflow = 'visible'
    }
};
</script>

<style>
</style>