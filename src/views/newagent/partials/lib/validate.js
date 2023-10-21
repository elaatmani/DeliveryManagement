export const validate = (app, order) => {    
    if(!order.fullname) {
        app.errors.fullname = "Client Name is required";
        return false;
    }

    if(!order.phone) {
        app.errors.phone = "Phone Number is required";
        return false;
    }

    if(!order.adresse) {
        app.errors.adresse = "Address is required";
        return false;
    }


    if(!order.note && order.confirmation == "annuler") {
        app.errors.note = "Add Cancelation note !";
        return false;
    }

    if(!!order.affectation && !['confirmer', 'refund', 'change'].includes(order.confirmation)) {
        app.errors.affectation = "Cannot update affectation: Order not confirmed.";
        return false;
    }

    if(!validateItems(app, order.items)) {
        return false;
    }

    return true;
} 

export const validateItems = (app, items) => {

    if (!items.length) {
        app.errors.items = 'You should add one order item at least.'
        return false;
    }

    let check = true;

    items.forEach(i => {
        if(i.product_id == 0) {
            app.errors.items = 'Product is required for order item'
            check = false;
            return false;
        }

        if(i.product_variation_id == 0) {
            app.errors.items = 'Select a product variation';
            check = false;
            return false;
        }

        if(i.quantity == 0) {
            app.errors.items = 'Items quantity cannot be 0';
            check = false;
            return false;
        }
    })

    return check;
}