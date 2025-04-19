import axios, { AxiosResponse } from "axios"
import { baseUrl } from "./fetch"

interface ILoginResponse {
    refresh: string;
    access: string;
}

export const loginService = (
    props: { email: string, password: string }
): Promise<AxiosResponse<ILoginResponse>> => {
    return axios.post(baseUrl + '/token/', {
        username: props.email,
        password: props.password
    });
};