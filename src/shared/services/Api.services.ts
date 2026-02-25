import axios from "axios";

const api_url = import.meta.env.VITE_API_URL_CHARACTERS || "http://localhost:3000";

const interceptor = () => {
    axios.interceptors.request.use((config) => {
        //config.headers["ngrok-skip-browser-warning"] = "true";
        return config;
    });
}

interceptor();

export async function GetData(path: string): Promise<any> {
    try {
        const response = await axios.get(`${api_url}/${path}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export async function PostData(path: string, data: object): Promise<any> {
    try {
        const response = await axios.post(`${api_url}/${path}`, data);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}