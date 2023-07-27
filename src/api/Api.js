import axios from 'axios'
import { serverUrl } from '@/config/config'

const Api = axios.create({
    baseURL: serverUrl,
});

const ApiForm = axios.create({
    baseURL: serverUrl,
});

ApiForm.defaults.withCredentials = true;
ApiForm.defaults.headers = { 'Content-Type': 'multipart/form-data', 'Accept': 'application/json' };

Api.defaults.withCredentials = true;
Api.defaults.headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };

export { ApiForm };
export default Api;