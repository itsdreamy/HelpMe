import axios from "axios";
import { API_URL } from "./api";

export const storeProblem = async (name, category_id) => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        console.log("No token found");
        return null;
    }

    try {
        const fetchApi = await axios.post(API_URL + '/category/store/problem',
            {
                'name': name,
                'category_id': category_id
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        )

        console.log("Problem stored successfully", fetchApi.data);
        return fetchApi.data;
    } catch (error) {
        console.error('Error Fetching: ', error);
        return null;
    }
}