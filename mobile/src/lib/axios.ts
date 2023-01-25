import axios from "axios";

export const api = axios.create({
    baseURL: 'http://172.21.111.121:3333'
})