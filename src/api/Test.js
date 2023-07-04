import axios from 'axios'
import { serverUrl } from '@/config/config'

const TestApi = axios.create({
    baseURL: serverUrl,
});

// TestApi.defaults.withCredentials = true;
TestApi.defaults.headers = { 'Content-Type': 'application/json', 'Accept': 'application/json', Authorisation: 'Bearer 6|JOuaVCNVzWsWxEoiUTKXP33zWvN4b7Uy19FjreMm' };

export default TestApi