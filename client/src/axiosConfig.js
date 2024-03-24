import axios from 'axios'

const axiosBase = axios.create({
    baseURL:'https://evangadiforum.gezueshetu.com/api'
})
export default axiosBase