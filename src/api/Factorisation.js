import Api from './Api'
import Csrf from './Csrf'

class Factorisation {

    async update(id, factorisation) {
        await Csrf.getCookie();
        
        return Api.post('api/factorisations/update/' + id, {
            factorisation_id: factorisation.factorisation_id,
            delivery_id: factorisation.delivery_id ,
            price: factorisation.price,
            commands_number: factorisation.commands_number,
        });
    }

    async updateComment(id , factorisation) {
        await Csrf.getCookie();
        
        return Api.post('api/factorisations/update/comment/' + id, {
            comment: factorisation.comment
        });
    }

    async all() {
        await Csrf.getCookie();
        return Api.get('api/factorisations');
    }

    async getFactorisation(id) {
        await Csrf.getCookie();
        return Api.get('api/factorisations/' + id);
    }

    async delete(id) {
        await Csrf.getCookie();
        return Api.delete('api/factorisations/delete/' + id)
    }
}



export default new Factorisation();