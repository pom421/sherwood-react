import React, { Component } from "react"
import { Link } from "react-router-dom"
// récupération d'image à partir de la librairie Octicon de Github
import ArrowLeft from "react-icons/lib/go/arrow-left"

import Banner from "../components/Banner"
import DetailCost from "../components/DetailCost"

export default class DetailPage extends Component {
   render() {
      return (
         <div>
            <Banner />
            <Link to="/">
               <ArrowLeft size="30" /> Retour
            </Link>
            <DetailCost id={this.props.match.params.id} />
         </div>
      )
   }
}
