import React, { Component } from "react"
import { getCost, updateCost, addCost, deleteCost } from "../API"
import { Redirect } from "react-router-dom"

export default class DetailCost extends Component {
   constructor(props) {
      super(props)

      this.state = {
         id: props.id,
         date: props.date,
         amount: props.amount,
         reason: props.reason,
         redirect: false
      }

      this.onSubmit = this.onSubmit.bind(this)
      this.onChange = this.onChange.bind(this)
      this.onDelete = this.onDelete.bind(this)
   }

   componentDidMount() {
      if (this.props.id) {
         getCost(this.props.id)
            .then(json => {
               this.setState(
                  {
                     id: json.id,
                     date: json.date,
                     amount: json.amount,
                     reason: json.reason
                  },
                  () =>
                     console.log(
                        "Récupération du JSON et chargement du state OK",
                        JSON.stringify(this.state)
                     )
               )
            })
            .catch(error =>
               console.error(
                  `Erreur lors du chargement du cost avec l'id ${this.props.id} (${error})`
               )
            )
      }
   }

   onSubmit(event) {
      event.preventDefault()

      // TODO : contrôle

      if (this.state.id) {
         // mise à jour
         updateCost(this.state)
            .then(data => {
               console.log("Fetch ok", data)
               this.setState({
                  redirection: true
               })
            })
            .catch(error =>
               console.error(
                  `Erreur lors de la mise à jour du frais avec l'id ${this.state.id} (${error})`
               )
            )
      } else {
         // ajout
         addCost(this.state)
            .then(data => {
               console.log("ajout dépense OK", data)
               this.setState({
                  redirection: true
               })
            })
            .catch(error => console.error(`Erreur lors de l'ajout de la dépense (${error})`))
      }
   }

   onDelete() {
      deleteCost(this.state.id)
         .then(() => {
            console.log("Suppression du cost")
            this.setState({
               redirection: true
            })
         })
         .catch(err => {
            console.log("Erreur lors de la suppression de l'item ", this.state.id)
         })
   }

   onChange(event) {
      const value = event.target.value
      const name = event.target.name

      console.log("change détecté", name, value)

      this.setState({
         [name]: value
      })
   }

   render() {
      if (this.state.redirection) {
         return <Redirect to="/" />
      }

      return (
         <div>
            <h1>Page de détail</h1>

            <form onSubmit={this.onSubmit}>
               <div className="form-group">
                  <label htmlFor="id">Id</label>
                  <input
                     type="number"
                     name="id"
                     id="id"
                     className="form-control"
                     disabled
                     value={this.state.id}
                     onChange={this.onChange}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
                     type="date"
                     name="date"
                     id="date"
                     className="form-control"
                     value={this.state.date}
                     onChange={this.onChange}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="amount">Montant</label>
                  <input
                     type="number"
                     name="amount"
                     id="amount"
                     className="form-control"
                     value={this.state.amount}
                     onChange={this.onChange}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="reason">Raison</label>
                  <input
                     type="text"
                     name="reason"
                     id="reason"
                     className="form-control"
                     value={this.state.reason}
                     onChange={this.onChange}
                  />
               </div>

               <button className="btn btn-primary btn-block" onClick={this.onSubmit}>
                  {this.state.id ? "Modifier" : "Ajouter"}
               </button>

               {this.state.id && (
                  <button className="btn btn-danger btn-block" onClick={this.onDelete}>
                     Supprimer
                  </button>
               )}
            </form>
         </div>
      )
   }
}
