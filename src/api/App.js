import Api from "./Api";
import Csrf from "./Csrf";

class App {
  async AllNotifications(params = {}) {
    await Csrf.getCookie();
    return Api.get("api/app/all", {params});
  }
  async notifications() {
    await Csrf.getCookie();
    return Api.get("api/app/notifications");
  }
  async Changestatus() {
    await Csrf.getCookie();
    return Api.get("api/app/changestatus");
  }
}

export default new App();
