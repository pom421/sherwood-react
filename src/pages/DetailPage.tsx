import React, { SFC } from "react"
import { Link } from "react-router-dom"
import { GoChevronLeft } from "react-icons/go"
import { RouteProps } from "react-router"

import { Banner } from "components/Banner"
import { DetailCost } from "components/DetailCost"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const DetailPage: SFC<any & RouteProps> = ({ match }) => {
   return (
      <div className="App">
         <Banner />
         <Link to="/">
            <GoChevronLeft size="30" /> Retour
         </Link>
         <DetailCost id={match.params.id} />
      </div>
   )
}
