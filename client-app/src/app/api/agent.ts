import axios, { AxiosResponse } from "axios";
import { Post } from "../models/post";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.response.use(async response => {
    try {
        await sleep(1000);
        return response;
    } catch (error) {
        console.log(error);
        return await Promise.reject(error);
    }
})

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
    get: <T>(url: string) => axios.get<T>(url).then(responseBody),
    post: <T>(url: string, body: {}) => axios.post<T>(url, body).then(responseBody),
    put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
    del: <T>(url: string) => axios.delete<T>(url).then(responseBody),
}

const Posts = {
    list: () => request.get<Post[]>('/posts'),
    details: (id: string) => request.get<Post>(`/posts/${id}`),
    create: (post: Post) => axios.post<void>('/posts', post),
    update: (post: Post) => axios.put<void>(`/posts/${post.id}`, post),
    delete: (id: string) => axios.delete<void>(`/posts/${id}`)
}

const agent = {
    Posts
}

export default agent;