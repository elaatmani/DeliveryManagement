const decode = (encoded) => atob(encoded); // Base64 decode

const encodedDmn = 'dmxkbw==';
const decodedDmn = `${decode(encodedDmn)}.shop`;

const currentDmn = window.location.hostname;

let localUrl, serverUrl;

if (currentDmn !== decodedDmn) {
    localUrl = '';
    serverUrl = '';
} else {
    localUrl = decode('aHR0cHM6Ly92bGRvLnNob3Av');
    serverUrl = decode('aHR0cHM6Ly9hcGkudmxkby5zaG9wLw==');
}


localUrl = 'http://localhost:8080/'
serverUrl = 'http://localhost:8000/'

export { localUrl, serverUrl };

export const version = '1.0.1';

export const currency = "$";
export const prefix = 'vlds';
export const adsSources = [ 'facebook', 'google', 'tiktok', 'snapchat' ];