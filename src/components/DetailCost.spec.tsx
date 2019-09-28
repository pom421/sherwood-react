import React from "react"
import { render, fireEvent } from "@testing-library/react"

import { DetailCost } from "components/DetailCost"
import API from "API"

const { confirm } = window

describe("<DetailCost>", () => {
   beforeEach(() => {
      delete window.confirm
      window.confirm = jest.fn().mockImplementation(() => true)
   })

   afterEach(() => {
      window.confirm = confirm
   })

   it("should display Ajouter on new cost", () => {
      const { getByText, queryByText } = render(<DetailCost id={undefined} />)

      getByText("Ajouter")
      expect(queryByText("Supprimer")).toBeNull()
   })

   it("should display Modifier on existing cost", () => {
      const { getByText, queryByText } = render(<DetailCost id={3} />)

      const mockGetCost = jest.spyOn(API, "getCost").mockResolvedValue({ id: 3, date: "", amount: 12, reason: "" })

      getByText("Modifier")
      expect(queryByText("Supprimer")).not.toBeNull()
   })

   fit("should call deleteCost", () => {
      const mock = jest.spyOn(API, "deleteCost").mockResolvedValue(2)
      const mockGetCost = jest.spyOn(API, "getCost").mockResolvedValue({ id: 3, date: "", amount: 12, reason: "" })

      const { getByText } = render(<DetailCost id={3} />)

      fireEvent.click(getByText("Supprimer"))

      // API.deleteCost(3)

      expect(jest.isMockFunction(window.confirm)).toBe(true)
      expect(window.confirm).toHaveBeenCalled()
      expect(mock).toHaveBeenCalledTimes(2)
   })

   it("should call another confirm", () => {
      const mock = jest.spyOn(API, "deleteCost").mockResolvedValue(2)
      const mockGetCost = jest.spyOn(API, "getCost").mockResolvedValue({ id: 3, date: "", amount: 12, reason: "" })
      const { getByText } = render(<DetailCost id={3} />)

      fireEvent.click(getByText("Supprimer"))

      expect(window.confirm).toHaveBeenCalled()
   })
})
