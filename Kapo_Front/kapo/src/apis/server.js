import axios from 'axios'

export default axios.create({
    // baseURL: 'https://kapokala.herokuapp.com'
    baseURL: 'http://192.168.43.74:8000/'
})