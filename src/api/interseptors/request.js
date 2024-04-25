import csrf from "./../Csrf";

let abortController = new AbortController();

export const abort = (message = 'Session Expired') => {
    abortController.abort(message);
    abortController = new AbortController();
}


export const request = async config => {

    await csrf.getCookie();
    config.signal = abortController.signal;

    return config;
}