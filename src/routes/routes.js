import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

import { history } from '../history';


import Dashboard from '../pages/Dashboard/index';

import Dqcmodel from '../pages/dqcmodel/index';
import EditDqcmodel from '../pages/dqcmodel/editar';
import CadDqcmodel from '../pages/dqcmodel/cadastrar';


import Dqc84 from '../pages/dqc84/index';
import EditDqc84 from '../pages/dqc84/editar';
import CadDqc84 from '../pages/dqc84/cadastrar';

import Dqc841 from '../pages/dqc841/index';
import EditDqc841 from '../pages/dqc841/editar';
import CadDqc841 from '../pages/dqc841/cadastrar';

export default function Routes() {
    return (
        <BrowserRouter history={history}>
            <Switch>
                <Route path="/" exact component={Dashboard} />
                <Route path="/dashboard/index" component={Dashboard} />

                <Route path="/dqcmodel/index" component={Dqcmodel}/>
                <Route path="/dqcmodel/editar/:id" component={EditDqcmodel}/>
                <Route path="/dqcmodel/cadastrar" component={CadDqcmodel}/>

                <Route path="/dqc84/index" component={Dqc84}/>
                <Route path="/dqc84/editar/:id" component={EditDqc84}/>
                <Route path="/dqc84/cadastrar" component={CadDqc84}/>

                <Route path="/dqc841/index" component={Dqc841}/>
                <Route path="/dqc841/editar/:id" component={EditDqc841}/>
                <Route path="/dqc841/cadastrar" component={CadDqc841}/>
            </Switch>
        </BrowserRouter>
    );
}