import React, { Component } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"

import DetailPage from "./pages/DetailPage"
import IndexPage from "./pages/IndexPage"

//import logo from './img/logo.svg';
import "./css/App.css"
import "bootstrap/dist/css/bootstrap.min.css"

class App extends Component {

   render() {
       
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
}

export default App
