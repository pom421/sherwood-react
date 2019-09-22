import React, { SFC } from "react"
import { Link } from "react-router-dom"
import { GoChevronLeft } from "react-icons/go"
import { RouteProps } from 'react-router';

import Banner from "components/Banner"
import DetailCost from "components/DetailCost"

const DetailPage: SFC<any & RouteProps> = ({ match }) => {
   return (
      <div>
         <Banner />
         <Link to="/">
            <GoChevronLeft size="30" /> Retour
            </Link>
         <DetailCost id={match.params.id} />
      </div>
   )
}

export default DetailPage