import React from "react"
import { render, fireEvent, cleanup, wait } from "@testing-library/react"

import { DetailCost } from "components/DetailCost"
import { deleteCost, getCost } from "API"
import { BrowserRouter } from "react-router-dom"

const { confirm } = window

jest.mock("API")

describe("<DetailCost>", () => {
   beforeEach(() => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(deleteCost as jest.Mocked<any>).mockResolvedValue(2)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ;(getCost as jest.Mocked<any>).mockResolvedValue({ id: 3, date: "", amount: 12, reason: "" })
      delete window.confirm
      window.confirm = jest.fn().mockImplementation(() => true)
   })

   afterEach(() => {
      window.confirm = confirm
      cleanup()
      jest.resetAllMocks()
   })

   it("should display Ajouter on new cost", () => {
      const { getByText, queryByText } = render(<DetailCost id={undefined} />)

      getByText("Ajouter")
      expect(queryByText("Supprimer")).toBeNull()
   })

   it("should display Modifier on existing cost", async () => {
      const { getByText, queryByText } = render(<DetailCost id={3} />)

      getByText("Modifier")
      expect(queryByText("Supprimer")).not.toBeNull()

      await wait()
   })

   it("should call deleteCost", async () => {
      const { getByText } = render(
         <BrowserRouter>
            <DetailCost id={3} />
         </BrowserRouter>,
      )

      fireEvent.click(getByText("Supprimer"))

      expect(jest.isMockFunction(window.confirm)).toBe(true)
      expect(window.confirm).toHaveBeenCalled()
      expect(deleteCost).toHaveBeenCalledTimes(1)

      await wait()
   })
})
