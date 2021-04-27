import {createContext} from 'react'

const loop = () => {}

export const AuthContext = createContext({
    token: null,
    userId: null,
    login: loop,
    logout: loop,
    isAuthenticated: false
})