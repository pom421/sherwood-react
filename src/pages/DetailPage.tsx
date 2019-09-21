import React, { Component } from "react"
import { Link } from "react-router-dom"
import { GoChevronLeft } from "react-icons/go"
import { RouteProps } from 'react-router';

import Banner from "../components/Banner"
import DetailCost from "../components/DetailCost"

export default class DetailPage extends Component<any & RouteProps, any>{
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
