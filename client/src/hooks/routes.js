import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import {LinksPage} from "../components/LinksPage/LinksPage";
import {CreatePage} from "../components/CreatePage/CreatePage";
import {DetailPage} from "../components/DetailPage/DetailPage";
import {AuthPage} from "../components/AuthPage/AuthPage";

export const useRoutes = isAuthenticated => {
    if(isAuthenticated){
        return(
            <Switch>
                <Route path="/links" exact>
                    <LinksPage/>
                </Route>
                <Route path="/create" exact>
                    <CreatePage/>
                </Route>
                <Route path="/detail/:id">
                    <DetailPage/>
                </Route>
                <Redirect to="/create"/>
            </Switch>
        )
    }
    return (
        <Switch>
            <Route path="/" exact>
                <AuthPage/>
            </Route>
            <Redirect to="/"/>
        </Switch>
    )
}