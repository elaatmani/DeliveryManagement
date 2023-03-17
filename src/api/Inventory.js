import Api from './Api'
import Csrf from './Csrf'

class Inventory {

    async inventoryStates() {
        await Csrf.getCookie()
        return Api.get('api/inventorystates')
    }
}



export default new Inventory();