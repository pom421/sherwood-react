import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import { Banner } from "components/Banner"
import { CostsSummary } from "components/CostsSummary"
import { ListCostRows } from "components/ListCostRows"
import { getAllCosts } from "API"
import { Cost } from "Models"

export const IndexPage: React.FC = () => {
   const [costs, setCosts] = useState<Array<Cost>>([])

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
         <CostsSummary costs={costs} />
         <ListCostRows costs={costs} />
         <div style={{ textAlign: "center" }}>
            <Link to="/detail">
               <button type="button" className="btn btn-primary btn-lg">
                  Ajouter
               </button>
            </Link>
         </div>
      </div>
   )
}
