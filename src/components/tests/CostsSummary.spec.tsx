import React from "react"
import { render, cleanup } from "@testing-library/react"

import { CostsSummary } from "components/CostsSummary"
import { Cost } from "Models"

describe("<CostsSummary />", () => {
   afterEach(cleanup)

   describe("No costs ", () => {
      beforeEach(() => {})

      it("should display 0 for no costs", () => {
         const noCosts: Cost[] = []

         const { getByText } = render(<CostsSummary costs={noCosts} />)

         getByText("Total des frais: 0 €")
      })
   })

   it("should sum the costs", () => {
      const costs: Cost[] = [
         { id: undefined, date: "", amount: 23, reason: "" },
         { id: undefined, date: "", amount: 13, reason: "" },
         { id: undefined, date: "", amount: 45, reason: "" },
      ]

      const { getByText } = render(<CostsSummary costs={costs} />)

      getByText("Total des frais: 81 €")
   })
})
