import React, { SFC } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import { DetailPage } from "pages/DetailPage"
import { IndexPage } from "pages/IndexPage"

//import logo from './img/logo.svg';
import "css/App.css"
import "bootstrap/dist/css/bootstrap.min.css"

export const App: SFC = () => {
   return (
      <div>
         <Router>
            <Switch>
               {/* <Route exact path="/" render={() => <IndexPage costs={this.state.costs} />} /> */}
               <Route exact path="/" component={IndexPage} />
               <Route exact path="/detail" component={DetailPage} />
               <Route path="/detail/:id" component={DetailPage} />
            </Switch>
         </Router>
      </div>
   )
}
