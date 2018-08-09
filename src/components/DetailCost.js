import React, { Component } from "react"
import { getCost, updateCost, addCost, deleteCost } from "../API"
import { Redirect } from "react-router-dom"

export default class DetailCost extends Component {
   constructor(props) {
      super(props)

      console.log("DetailCost constructor")
      
      // initialisation à "". Ne pas initialiser à null ou undefined, au risque que React croit que les composants sont non contrôlés
      // alors qu'ils le deviennent avec componentDidMount (cf https://reactjs.org/docs/forms.html#controlled-components + https://github.com/twisty/formsy-react-components/issues/66)
      this.state = {
         id: props.id,
         date: "",
         amount: "",
         reason: "",
         redirect: false
      }

      this.onSubmit = this.onSubmit.bind(this)
      this.onChange = this.onChange.bind(this)
      this.onDelete = this.onDelete.bind(this)
   }

   componentDidMount() {
      console.log("DetailCost mounted")
      if (this.props.id) {
         getCost(this.props.id)
            .then(json => {
               console.log("json trouvé ", json)
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

   onSubmit() {
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
      const res = window.confirm("Voulez-vous vraiment supprimer ce frais?")

      if (res) {
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
         </div>
      )
   }
}
