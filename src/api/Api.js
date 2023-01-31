import axios from 'axios'
import { serverUrl } from '@/config/config'

const Api = axios.create({
    baseURL: serverUrl,
});

Api.defaults.withCredentials = true;
Api.defaults.headers = { 'Content-Type': 'application/json', 'Accept': 'application/json' };


export default Api