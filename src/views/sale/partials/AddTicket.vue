<template>
    <div>
        <popup-full @cancel="$emit('cancel')" :visible="visible">
            <div v-if="!isLoaded"
                class="md:tw-w-[80%] tw-w-[95%] tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg">
                <LoadingAnimation />
            </div>
            <div v-if="isLoaded"
                class="md:tw-w-[80%] tw-w-[95%] tw-px-5 tw-max-w-[750px] tw-mx-auto tw-my-3 tw-min-h-fit tw-bg-white tw-rounded-lg tw-shadow-lg tw-py-5">
                <h1 class="tw-text-lg tw-text-center">Choose Ticket Size</h1>

                <div class="tw-grid tw-grid-cols-12 tw-gap-y-1 tw-gap-x-3 mt-5">
                    
                      
                </div>

            </div>
        </popup-full>
    </div>
</template>

<script>
    import Product from "@/api/Product";
    import Sale from "@/api/Sale";
    export default {
        props: ["visible"],

        data() {
            return {
                isLoading: false,
                isLoaded: false,

                sale: {
                    fullname: "",
                    product_name: "",
                    phone: "",
                    city: "",
                    adresse: "",
                    quantity: 1,
                    price: 0,
                },
            };
        },

        computed: {
            products() {
                return this.$store.getters["product/products"];
            },
            cities() {
                return this.$store.getters["city/cities"];
            },
            isFormValid() {
                return (
                    !!this.sale.fullname &&
                    !!this.sale.phone &&
                    !!this.sale.adresse &&
                    this.sale.price != 0 &&
                    this.sale.quantity != 0
                );
            },
        },

        methods: {
            create() {

                if (!this.isFormValid) {
                    this.$alert({
                        type: "warning",
                        title: "Please fill all the form",
                    });
                    return false
                }
                this.isLoading = true;

                Sale.create(this.sale)
                    .then((res) => {
                        if (res.data.code == "SALE_ADDED") {
                            this.$emit("cancel");
                            this.$alert({
                                type: "success",
                                title: "Sale created successfully",
                            });
                        }
                    }, this.$handleApiError)
                    .finally(() => (this.isLoading = false));
            },

            getProducts() {
                Product.all()
                    .then(
                        (res) => {
                            if (res.data.code == "SUCCESS") {
                                this.$store.dispatch(
                                    "product/setProducts",
                                    res.data.data.products
                                );

                                if (this.products.length > 0) {
                                    this.sale.product_name = this.products[0].name;
                                    console.log(this.products[0].name);
                                }
                            }
                        },
                        (err) => {
                            this.$handleApiError(err);
                        }
                    )
                    .finally(() => (this.isLoaded = true));
            },
        },

        mounted() {
            this.getProducts();
            this.sale.city = this.cities[0].name || 1;
        },
    };
</script>

<style>
</style>