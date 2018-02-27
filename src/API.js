const URL = "http://localhost:3000/costs"

let COSTS = []

const getCosts = () => {
  return fetch(URL, {
    method: "GET"
  })
}

const getCost = id => {
  //const arr = COSTS.filter( c => c.id === +id)

  return fetch(URL + "/" + id, {
    method: "GET"
  })

}

const updateCost = cost => {

  var copy = COSTS.slice()
  for (var i = 0; i < copy.length; i++) {
      if (copy[i].id === cost.id) {
          copy[i] = cost
          break
      }
  }
  COSTS = copy
}

const addCost = cost => {
  cost.id = COSTS.length >= 1 ? COSTS[COSTS.length - 1].id + 1 : 1
  COSTS.push(cost)
  return getCost(cost.id)
}

console.log("CHARGEMENT XXX")


export { getCosts, getCost, updateCost, addCost }