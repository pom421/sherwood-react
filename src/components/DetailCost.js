import React, { Component } from "react"
import { getCost, updateCost, addCost } from "../API"
import { Redirect } from "react-router-dom"

export default class DetailCost extends Component {
   constructor(props) {
      super(props)

      this.state = {
         id: undefined,
         date: undefined,
         amount: undefined,
         reason: undefined
      }

      this.onSubmit = this.onSubmit.bind(this)
      this.onChange = this.onChange.bind(this)

      this.redirection = false
   }

   componentDidMount() {
      getCost(this.props.id)
         .then(res => res.json())
         .catch(error =>
            console.error(`Erreur lors du chargement du cost avec l'id ${this.props.id}`)
         )
         .then(response => {
            this.setState({
               id: response.id,
               date: response.date,
               amount: response.amount,
               reason: response.reason
            })
         })
   }

   onSubmit(event) {
      event.preventDefault()

      // TODO : contrôle

      // mise à jour ou ajout
      if (this.state.id) {
         updateCost(this.state).catch(error =>
            console.error(`Erreur lors de la mise à jour du frais avec l'id ${this.state.id}`)
         )
      } else {
         addCost(this.state).catch(error => console.error(`Erreur lors de l'ajout du frais`))
      }

      this.redirection = true
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
      if (this.redirection) {
         return <Redirect to="/" />
      }

      return (
         <div>
            <h1>Page de détail</h1>

            <form onSubmit={this.onSubmit}>
               <div className="form-group">
                  <label htmlFor="id">Id</label>
                  <input
                     name="id"
                     id="id"
                     className="form-control"
                     disabled
                     value={this.state.id}
                  />
               </div>

               <div className="form-group">
                  <label htmlFor="date">Date</label>
                  <input
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
                     name="reason"
                     id="reason"
                     className="form-control"
                     value={this.state.reason}
                     onChange={this.onChange}
                  />
               </div>

               <input
                  type="submit"
                  className="btn btn-primary btn-block"
                  value={this.state.id ? "Modifier" : "Ajouter"}
                  onChange={this.onChange}
               />
            </form>
         </div>
      )
   }
}
