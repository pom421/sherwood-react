const URL = "http://localhost:3000/costs"

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

  const formData = new FormData();
  formData.append('date', cost.date);
  formData.append('amount', cost.amount);
  formData.append('reason', cost.reason);

  return fetch(URL + "/" + cost.id, {
      method: 'PUT',
      body: formData
  })
  .then(response => response.json())

}

const addCost = cost => {
  const formData = new FormData();
  formData.append('date', cost.date);
  formData.append('amount', cost.amount);
  formData.append('reason', cost.reason);

  return fetch(URL, {
      method: 'POST',
      body: formData
  })
  .then(response => response.json())

}

console.log("CHARGEMENT XXX")


export { getCosts, getCost, updateCost, addCost }