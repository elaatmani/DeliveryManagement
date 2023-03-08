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
            role: user.role,
            firstname: user.firstname,
            lastname: user.lastname,
            product_id: user.product_id
        })
    }

    async update(user, updatePassword) {
        await Csrf.getCookie();

        return Api.post('api/users/update/' + user.id, { 
            email: user.email,
            password: user.password,
            phone: user.phone,
            status: user.status,
            firstname: user.firstname,
            lastname: user.lastname,
            product_id: user.product_id,
            role: user.role,
            updatePassword: updatePassword
        })
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

    async delete(id) {
        await Csrf.getCookie();
        return Api.delete('api/users/delete/' + id)
    }

    async getUser(id) {
        await Csrf.getCookie();
        return Api.get('api/users/' + id)
    }

    async createRole({ name, permissions }) {
        await Csrf.getCookie();
        return Api.post('api/roles/add', { name , permissions })
    }

    async updateRole(id, { name, permissions }) {
        await Csrf.getCookie();
        return Api.post('api/roles/update/' + id, { name , permissions })
    }

    async deleteRole(id) {
        await Csrf.getCookie();
        return Api.delete('api/roles/delete/' + id)
    }

    async getRole(id) {
        await Csrf.getCookie();
        return Api.get('api/roles/' + id);
    }
}



export default new User();