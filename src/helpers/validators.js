
export function validateEmail(email) {
    var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/; 

    if (!email) {
        return {
            valid: false,
            message: 'Email is required.'
        }
    }

    if(!(new RegExp(pattern)).test(email)) {
        return {
            valid: false,
            message: 'Email is not valid.'
        }
    }

    return {
        valid: true
    }

}


export function validatePassword(password) {
    if (!password) {
        return {
            valid: false,
            message: 'This field is required'
        }
    }

    if(password.length <= 4 || password.length >= 16) {
        return {
            valid: false,
            message: 'Password length must be between 4 and 16.'
        }
    }

    return {
        valid: true
    }
}


export function validateName(value, fieldName = 'This field') {
    if(!value) {
        return {
            valid: false,
            message: `${fieldName} is required`
        }
    }

    return {
        valid: true
    }
}


export function validateNumber(value, fieldName = 'This field') {
    if (!value) {
        return {
            valid: false,
            message: `${fieldName} is required`
        }
    }

    if (isNaN(value)) {
        return {
            valid: false,
            message: `${fieldName} must be a valid number`
        }
    }

    return {
        valid: true
    }
}



export function validateConfirmPassword(password, confirmPasswrd) {
    if(!password) {
        return {
            valid: false,
            message: "This field is required."
        }
    }

    if (password !== confirmPasswrd)   {
        return {
            valid: false,
            message: "Passwords doesn't match"
        }
    }

    return {
        valid: true
    }
}


export function validateVariants(variants) {
    if(!variants.length) {
        return {
            valid: false,
            message: "You need at least one variant to create a product !"
        }
    }

    return {
        valid: true
    }
}

export function validatePermissions(variants) {
    if(!variants.length) {
        return {
            valid: false,
            message: "You need at least one permission to create a role !"
        }
    }

    return {
        valid: true
    }
}