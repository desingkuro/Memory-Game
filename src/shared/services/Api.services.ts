import axios from "axios";
import type { GetArguments, PostArguments } from "../types/apiInterface";
import { supabase } from './Supabase.client';

const api_url = {
    auth: import.meta.env.VITE_API_URL_GAME || "http://localhost:3000",
    game: import.meta.env.VITE_API_URL_CHARACTERS || "http://localhost:3000"
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

export async function GetData({path,type}:GetArguments): Promise<any> {
    try {
        const response = await axios.get(`${api_url[type]}/${path}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function PostData({path,type,data}:PostArguments): Promise<any> {
    try {
        const response = await axios.post(`${api_url[type]}/${path}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export const loginUser = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) throw error;
    return data;
};

export const logoutUser = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return true;
};

export const getCurrentUser = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    return session;
};

export const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: 'https://memorygamerickandmorty.netlify.app/', 
    });
    if (error) throw error;
};

