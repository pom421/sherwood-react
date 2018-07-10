import React, { Component } from "react"
import Banner from "../components/Banner"
import CostsUI from "../components/CostsUI"
import { Link } from "react-router-dom"

export default class IndexPage extends Component {
   render() {
      return (
         <div>
            <Banner />
            <CostsUI costs={this.props.costs} />
            <Link to="/detail">
               <button type="button" className="btn btn-primary mx-2">
                  Ajouter
               </button>
            </Link>
         </div>
      )
   }
}
