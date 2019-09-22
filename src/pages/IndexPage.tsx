import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { Banner } from "components/Banner"
import { MonthlyCostsSummary } from "components/MonthlyCostsSummary"
import { ListCostRows } from "components/ListCostRows"
import { getAllCosts } from "API"

export const IndexPage = () => {

   const [costs, setCosts ] = useState([])

   useEffect(() => {
      getAllCosts()
         .then(response => {
            console.log("Success:", response)
            setCosts(response)
         })
         .catch(error => console.error("Error:", error))
   }, [])

   return (
      <div>
         <Banner />
         <MonthlyCostsSummary costs={ costs } />
         <ListCostRows costs={ costs } />
         <div style={{textAlign: "center"}}>
            <Link to="/detail">
               <button type="button" className="btn btn-primary btn-lg">
                  Ajouter
               </button>
            </Link>
         </div>
      </div>
   )
}
