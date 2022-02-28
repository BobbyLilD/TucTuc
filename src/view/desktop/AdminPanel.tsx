import { Switch, Route } from "react-router-dom";
import React from "react";
import AdminAuth from "./AdminAuth";
import AdminBase from "./AdminBase";
import { BaseFiller } from "../../components/common/StyledComponents";
import PrivateRoute from "../../components/admin/base/PrivateRoute";
import { inject } from "mobx-react";
import { Stores } from "../../types";

type AdminPanelProps = {
    accessToken: string
}

const AdminPanel = ({accessToken} : AdminPanelProps) => {

    console.log("token is " + accessToken);
    return(
        <BaseFiller>
            <Switch>
                <Route path={`/admin/auth`} component={AdminAuth}/>
                <PrivateRoute path={`/admin`} component={AdminBase} accessToken={accessToken}/>
            </Switch>
        </BaseFiller>
    )
}

export default inject(({userStore}: Stores) => ({accessToken: userStore.access_token}))(AdminPanel);