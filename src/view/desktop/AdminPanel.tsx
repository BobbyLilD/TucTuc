import { Switch, Route } from "react-router-dom";
import React from "react";
import AdminAuth from "./AdminAuth";
import AdminBase from "./AdminBase";
import { BaseFiller } from "../../components/common/StyledComponents";
import PrivateRoute from "../../components/admin/base/PrivateRoute";
import { inject } from "mobx-react";
import { Stores } from "../../types";

type AdminPanelProps = {
    loggedIn: boolean;
}

const AdminPanel = ({loggedIn} : AdminPanelProps) => {

    return(
        <BaseFiller>
            <Switch>
                <Route path={`/admin/auth`} component={AdminAuth}/>
                <PrivateRoute path={`/admin`} component={AdminBase} loggedIn={loggedIn}/>
            </Switch>
        </BaseFiller>
    )
}

export default inject(({userStore}: Stores) => ({loggedIn: userStore.logged_in}))(AdminPanel);