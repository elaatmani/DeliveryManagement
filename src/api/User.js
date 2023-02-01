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
    

    async register(user) {
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

        return Api.get('api/auth/logout')
    }


    async permession() {
        await Csrf.getCookie();

        return Api.get('api/auth/permission')
    }

    async roles() {
        await Csrf.getCookie();

        return Api.get('api/auth/roles')
    }

    async all() {
        await Csrf.getCookie();

        return Api.get('api/users')
    }

    async updateStatus({id, status}) {
        await Csrf.getCookie();

        return Api.post('api/users/status/' + id, { status })
    }
}



export default new User();