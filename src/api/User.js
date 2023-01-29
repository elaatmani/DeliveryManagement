import Api from './Api'
import Csrf from './Csrf'

class User {

    async login(user) {
        await Csrf.getCookie();

        return Api.post('api/auth/login', { 
            email: user.email,
            password: user.password
        })
    }
    

    async signup(user) {
        await Csrf.getCookie();

        return Api.post('api/auth/register', { 
            email: user.email,
            password: user.password,
            phone: user.phone,
            status: user.status,
            firstname: user.firstname,
            lastname: user.lastname
        })
    }


    async getUser() {
        await Csrf.getCookie();

        return Api.get('api/user')
    }


    async logout() {
        await Csrf.getCookie();

        return Api.post('api/auth/logout')
    }
}


export default new User();