import React, { Component } from "react"
import { Link } from "react-router-dom"
import { Cost } from "../Models"

interface Props {
   costs: Array<Cost>
}

export default class ListCostRows extends Component<Props> {
   render() {
      const { costs } = this.props
      let rows
      if (costs) {
         const nbCosts = costs.length
         rows = this.props.costs.map((curr, index) => {
            let style = {
               display: "flex",
               justifyContent: "center",
               alignItems: "center",
               minHeight: 60,
               borderTop: "1px solid lightgray",
               padding: "5px 0"
            }
            if (index === nbCosts - 1) {
               Object.assign(style, { borderBottom: "1px solid lightgray", marginBottom: 20 })
            }
            return (
               <Link
                  to={`/detail/${curr.id}`}
                  key={curr.id}
                  style={{ textDecoration: "none", color: "inherit" }}
               >
                  <div style={style}>
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
}
