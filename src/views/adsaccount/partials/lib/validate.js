export const validate = (app, items) => {   
    if(!items.name) {
        app.errors.name = "Name is required";
        return false;
    }

    if(!items.ad_account_id) {
        app.errors.ad_account_id = "Ad account ID is required";
        return false;
    }


    return true;
} 

