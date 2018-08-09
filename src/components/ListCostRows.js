import React, { Component } from "react"
import { Link } from "react-router-dom"

export default class ListCostRows extends Component {
   render() {
      const { costs } = this.props

      if (costs) {
         var rows = this.props.costs.map(curr => (
            <tr key={curr.id}>
               <td>
                  <Link to={`/detail/${curr.id}`}>
                     {curr.date} <span className="badge badge-secondary">{curr.amount}€</span>
                     <br />
                     {curr.reason}
                  </Link>
               </td>
            </tr>
         ))
      }

      return (
         <div className="mx-2">
            <h2>Historique des dépenses</h2>
            <table className="table">
               <tbody>{rows}</tbody>
            </table>
         </div>
      )
   }
}
