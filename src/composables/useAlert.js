import store from "@/store";

export const useAlert = (message, type = 'success') => {
    store.dispatch('alert/toggleAlert', {
        type,
        title: message
    })
}