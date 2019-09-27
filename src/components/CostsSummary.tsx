import React, { SFC } from "react"
import { Cost } from "Models"

interface MyProps {
   costs: Array<Cost>
}

export const CostsSummary: SFC<MyProps> = ({ costs }) => {
   const sum = !costs
      ? 0
      : costs.map((cur: Cost) => (cur.amount ? +cur.amount : 0)).reduce((curr: number, prev: number) => curr + prev, 0)

   return (
      <div className="alert alert-primary mx-2" role="alert">
         Total des frais: {sum} €
      </div>
   )
}
