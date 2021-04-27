import React from 'react'
import {BrowserRouter as Router} from 'react-router-dom'
import {useRoutes} from "./hooks/routes"
import {useAuth} from "./hooks/auth.hook"
import {AuthContext} from "./context/AuthContext"
import {NavBar} from "./components/NavBar/NavBar"
import {Loader} from "./components/Loader/Loader"
import 'materialize-css'

const App = () => {
    const {login, logout, userId, token, ready} = useAuth()
    const isAuthenticated = !!token
    const routes = useRoutes(isAuthenticated)

    if (!ready){
        return <Loader />
    }

    return (
        <AuthContext.Provider value={{
            token, logout, login, userId, isAuthenticated
        }}>
            <Router>
                {isAuthenticated && <NavBar/>}
                <div className="container">
                    {routes}
                </div>
            </Router>
        </AuthContext.Provider>
    )
}

export default App;
