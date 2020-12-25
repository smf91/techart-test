import axios from 'axios'

const instans = axios.create ({
    baseURL: 'https://data.techart.ru/lab/json/',
})

export const calculateAPI = {
    calculate(type: number | null, height: number, material: number | null, size: any) {
        return instans.get(`?building=${type}&height=${height}&material=${material}&sizex=${size[0]}&sizey=${size[0]}`)
            .then(response => {
                return response.data
            })
    }
}
