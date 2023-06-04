import axios, { AxiosError, AxiosResponse } from "axios";
import { Post, PostFormValues } from "../models/post";
import { toast } from "react-toastify";
import { history } from "../..";
import { store } from "../stores/store";
import { User, UserFromValues } from "../models/user";

const sleep = (delay: number) => {
    return new Promise((resolve) => {
        setTimeout(resolve, delay);
    })
}

axios.defaults.baseURL = 'http://localhost:5000/api';

axios.interceptors.request.use(config => {
    const token = store.commonStore.token;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
})

axios.interceptors.response.use(async response => {
    await sleep(1000);
    return response;
}, (error: AxiosError) => {
    const { data, status, config } = error.response! as AxiosResponse;
    switch (status) {
        case 400:
            if (typeof data === 'string') {
                toast.error(data);
            }
            if (config.method === 'get' && data.errors.hasOwnProperty('id')) {
                history.push('/not-found');
            }
            if (data.errors) {
                const modalStateErrors = [];
                for (const key in data.errors) {
                    if (data.errors[key]) {
                        modalStateErrors.push(data.errors[key])
                    }
                }
                throw modalStateErrors.flat();
            }
            break;
        case 401:
            toast.error('unauthorized');
            break;
        case 404:
            history.push('/not-found');
            break;
        case 500:
            store.commonStore.setServerError(data);
            history.push('/server-error');
            break;
    }
    return Promise.reject(error);
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
    create: (post: PostFormValues) => request.post<void>('/posts', post),
    update: (post: PostFormValues) => request.put<void>(`/posts/${post.id}`, post),
    delete: (id: string) => request.del<void>(`/posts/${id}`),
    attend: (id: string) => request.post<void>(`/posts/${id}/attend`, {})
}

const Account = {
    current: () => request.get<User>('/account'),
    login: (user: UserFromValues) => request.post<User>('/account/login', user),
    register: (user: UserFromValues) => request.post<User>('/account/register', user)
}

const agent = {
    Posts,
    Account
}

export default agent;