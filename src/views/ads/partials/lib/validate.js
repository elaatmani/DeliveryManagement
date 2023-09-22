export const validate = (app, items) => {   
    if(!items.source) {
        app.errors.source = "Source Name is required";
        return false;
    }

    if(!items.product_id || parseInt(items.product_id) <= 0) {
        app.errors.product_id = "Product is required";
        return false;
    }

    if(!items.amount || parseInt(items.amount) <= 0) {
        app.errors.amount = "Amount is required";
        return false;
    }

    if(!items.ads_at) {
        app.errors.ads_at = "Add Ads Date !";
        return false;
    }


    return true;
} 

