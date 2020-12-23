import { setMaterialBuilding } from './../redux/calculate-reducer';
import * as axios from 'axios'
const instans = axios.create({
    withCredentials: true,
    baseURL: 'https://data.techart.ru/lab/json/',
    headers: { "API-KEY": "0e104740-5992-4240-ae2e-159caee4d5cb" }
})

export const calculateAPI = {
    calculate(type, height, material, size) {
        return instans.get(`?building=${type}&height=${height}&material=${material}&sizex=${size.x}&sizey=${size.y}`)
            .then(response => {
                return response.data
            })
    }
}


