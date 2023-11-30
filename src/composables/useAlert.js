import store from "@/store";

export const useAlert = (message, type = 'success') => {
    console.log(store)
    store.dispatch('alert/toggleAlert', {
        type,
        title: message
    })
}