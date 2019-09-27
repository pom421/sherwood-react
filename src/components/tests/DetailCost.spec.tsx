import React from "react"
import { render } from "@testing-library/react"

import { DetailCost } from "components/DetailCost"

describe("<DetailCost>", () => {
   it("should display Ajouter on new cost", () => {
      const { getByText } = render(<DetailCost id={undefined} />)

      getByText("Ajouter")
   })
   it("should display Modifier on existing cost", () => {
      const { getByText } = render(<DetailCost id={3} />)

      getByText("Modifier")
   })
})
