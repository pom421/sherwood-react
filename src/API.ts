import { Cost } from "Models"

const URL = "http://localhost:3001/costs"

const getAllCosts = (): Promise<Array<Cost>> => {
   return fetch(URL, {
      method: "GET",
   }).then(res => res.json())
}

const getCost = (id: number): Promise<Cost> => {
   console.log("dans getCost")
   return fetch(URL + "/" + id, {
      method: "GET",
   }).then(res => res.json())
}

const updateCost = (cost: Cost): Promise<number> => {
   return fetch(`${URL}/${cost.id}`, {
      method: "PUT",
      body: JSON.stringify(cost),
      headers: { "Content-type": "application/json" },
   }).then(res => res.json())
}

const addCost = (cost: Cost): Promise<Cost> => {
   return fetch(URL, {
      method: "POST",
      body: JSON.stringify(cost),
      headers: { "Content-Type": "application/json" },
   }).then(res => res.json())
}

const deleteCost = (id: number | undefined): Promise<number> => {
   console.log("dans deleteCost")
   return fetch(`${URL}/${id}`, {
      method: "DELETE",
   }).then(res => res.json())
}

export default {
   getAllCosts,
   getCost,
   updateCost,
   addCost,
   deleteCost,
}

export { getAllCosts, getCost, updateCost, addCost, deleteCost }
