import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { DetailCost } from "components/DetailCost"
import { deleteCost } from "API"

//jest.mock("API")
//const mockedDeleteCost = deleteCost as jest.Mocked<any>

describe("<DetailCost>", () => {
   beforeEach(() => {
      //mockedDeleteCost.mockClear()
   })

   it("should display Ajouter on new cost", () => {
      const { getByText, queryByText } = render(<DetailCost id={undefined} />)

      getByText("Ajouter")
      expect(queryByText("Supprimer")).toBeNull()
   })
   it("should display Modifier on existing cost", () => {
      const { getByText, queryByText } = render(<DetailCost id={3} />)

      getByText("Modifier")
      expect(queryByText("Supprimer")).not.toBeNull()
   })
   xit("should call deleteCost", () => {
      //mockedDeleteCost.mockReturnValue(55)
      const { getByText } = render(<DetailCost id={3} />)

      fireEvent.click(getByText("Supprimer"))

      expect(deleteCost).toHaveBeenCalled()
   })
})
