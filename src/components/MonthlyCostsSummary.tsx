import React, { SFC } from "react"
import { Cost } from "Models"

interface MyProps {
   costs: Array<Cost>
}

const MonthlyCostsSummary: SFC<MyProps> = ({ costs }) => {

   var sum = !costs
      ? 0
      : costs
         .map((cur: Cost) => (cur.amount ? +cur.amount : 0))
         .reduce((curr: number, prev: number) => curr + prev, 0)

   return (
      <div className="alert alert-primary mx-2" role="alert">
         Frais du mois d&apos;août {sum} €
         </div>
   )
}

export default MonthlyCostsSummary