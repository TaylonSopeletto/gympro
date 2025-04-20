import axios, { AxiosResponse } from "axios"
import { baseUrl } from "./fetch"

interface ISerie {
    id: number;
    weight: number;
    repetitions: number
}

interface IExercises {
    id: number;
    position: number;
    name: string;
    series: ISerie[]
}

export interface IDay {
    id: number;
    name: string;
    weekday: string;
    student: number
    exercises: IExercises[]
}

export const dayService = (
    props: { token: string }
): Promise<AxiosResponse<IDay[]>> => {
    return axios.get(baseUrl + '/days/', {
        headers: {
            Authorization: 'Bearer ' + props.token
        }
    })
};