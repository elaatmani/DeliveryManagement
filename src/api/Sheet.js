import Api from './Api'
import Csrf from './Csrf'

class Sheet {

    async all() {
        await Csrf.getCookie();
        return Api.get('api/sheets');
    }

    async create(sheet) {
        await Csrf.getCookie();

        const data = {
            name: sheet.name,
            sheet_id: sheet.sheet_id,
            sheet_name: sheet.sheet_name,
            auto_fetch: sheet.auto_fetch
        }
        return Api.post('api/sheets', data);
    }

    async update(id, sheet) {
        await Csrf.getCookie();

        const data = {
            name: sheet.name,
            sheet_id: sheet.sheet_id,
            sheet_name: sheet.sheet_name,
            auto_fetch: sheet.auto_fetch
        }
        return Api.post('api/sheets/' + id, data);
    }

    async delete(id) {
        await Csrf.getCookie();
        return Api.delete('api/sheets/' + id);
    }

    async updateAutoFetch(id, value) {
        await Csrf.getCookie();
        return Api.post('api/sheets/' + id + '/auto-fetch', {autoFetch: value});
    }

}



export default new Sheet();