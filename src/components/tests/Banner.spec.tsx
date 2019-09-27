import React from "react"
import { render } from "@testing-library/react"
import { Banner } from "components/Banner"

describe("<Banner>", () => {
   it("should display the banner", () => {
      const { getByText } = render(<Banner />)

      getByText("Sherwood")
   })
})
