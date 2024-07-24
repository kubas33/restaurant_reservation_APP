import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/auth`


interface LoginData {
    email: string
    password: string
}

interface RegisterData {
    name: string
    email: string
    password: string
}
const login = (loginData: LoginData) => {
    return axios.post(`${API_URL}/login`, loginData)
}

const register = (registerData: RegisterData) => {
    return axios.post(`${API_URL}/register`, registerData)
}

const AuthService = {
    login,
    register,
}
export default AuthService
