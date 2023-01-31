
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


export function validateName(value) {
    if(!value) {
        return {
            valid: false,
            message: 'This field is required'
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