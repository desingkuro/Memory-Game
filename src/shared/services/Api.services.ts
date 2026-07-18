import axios from "axios";
import type { GetArguments, PostArguments } from "../types/apiInterface";

const api_url = {
    auth: import.meta.env.VITE_API_URL_GAME || "https://rickandmortyapi.com/api",
    game: import.meta.env.VITE_API_URL_CHARACTERS || "https://rickandmortyapi.com/api"
}

const interceptor = () => {
    axios.interceptors.request.use((config) => {
        config.headers.set('Content-Type', 'application/json');
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers.set('Authorization', `Bearer ${token}`);
        }
        return config;
    });
}
interceptor();

export async function GetData<T>({path,type}:GetArguments): Promise<T> {
    try {
        const response = await axios.get<T>(`${api_url[type]}/${path}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function PostData<T>({path,type,data}:PostArguments): Promise<T> {
    try {
        const response = await axios.post<T>(`${api_url[type]}/${path}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}




