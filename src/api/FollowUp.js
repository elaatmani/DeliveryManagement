import Api from './Api'
import Csrf from './Csrf'

class FollowUp {

    // async all() {
    //     await Csrf.getCookie();
    //     return Api.get('api/followup');
    // }

    async paginate(url = 'followup', options) {
        await Csrf.getCookie();
        return Api.post('api/' + url, options);
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
}



export default new FollowUp();