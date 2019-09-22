import React, { SFC } from "react"
import { Link } from "react-router-dom"
import { Cost } from "Models"

interface MyProps {
   costs: Array<Cost>
}

const divStyle = {
   display: "flex",
   justifyContent: "center",
   alignItems: "center",
   minHeight: 60,
   borderTop: "1px solid lightgray",
   padding: "5px 0"
}

const ListCostRows: SFC<MyProps> = ({ costs }) => {
   let rows

   if (costs) {
      rows = costs.map((curr) => {
         return (
            <Link
               to={`/detail/${curr.id}`}
               key={curr.id}
               style={{ textDecoration: "none", color: "inherit" }}
            >
               <div style={divStyle}>
                  <div style={{ flex: 1 }}>{curr.date}</div>
                  <div style={{ flex: 1, textAlign: "center" }}>
                     <span className="badge badge-secondary">{curr.amount}€</span>
                  </div>
                  <div style={{ flex: 4 }}>{curr.reason}</div>
               </div>
            </Link>
         )
      })
   }

   return (
      <div className="mx-2">
         <h2>Historique des dépenses</h2>
         <div style={{ display: "flex", flexDirection: "column" }}>{rows}</div>
      </div>
   )
}

export default ListCostRows