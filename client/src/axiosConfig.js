import axios from 'axios'

const axiosBase = axios.create({
    baseURL:'http://localhost:5501/api'
})
export default axiosBase