import React, { Component } from "react"
import { Cost } from "../Models"

interface Props {
   costs: Array<Cost>
}

export default class MonthlyCostsSummary extends Component<Props> {
   render() {
      const { costs } = this.props

      var sum = !costs
         ? 0
         : this.props.costs
              .map(cur => (cur.amount ? +cur.amount : 0))
              .reduce((curr, prev) => curr + prev, 0)

      return (
         <div className="alert alert-primary mx-2" role="alert">
            Frais du mois d&apos;août {sum} €
         </div>
      )
   }
}
