import axios from 'axios'

const axiosBase = axios.create({
    baseURL:'http://localhost:3003/api'
   
})
export default axiosBase