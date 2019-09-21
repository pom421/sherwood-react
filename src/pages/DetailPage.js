import React, { Component } from "react"
import { Link } from "react-router-dom"
// récupération d'image à partir de la librairie Octicon de Github
import { GoChevronLeft } from "react-icons/go"

import Banner from "../components/Banner"
import DetailCost from "../components/DetailCost"

export default class DetailPage extends Component {
   render() {
      return (
         <div>
            <Banner />
            <Link to="/">
               <GoChevronLeft size="30" /> Retour
            </Link>
            <DetailCost id={this.props.match.params.id} />
         </div>
      )
   }
}
