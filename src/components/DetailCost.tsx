import React, { FC, useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { getCost, updateCost, addCost, deleteCost } from "API"
import { Cost } from "Models"

interface MyProps {
   id: number
}

export const DetailCost: FC<MyProps> = ({ id }) => {

   // initialisation à "". Ne pas initialiser à null ou undefined, au risque que React croit que les composants sont non contrôlés
   // alors qu'ils le deviennent avec componentDidMount (cf https://reactjs.org/docs/forms.html#controlled-components + https://github.com/twisty/formsy-react-components/issues/66)

   const [state, setState] = useState({
      id: id,
      date: "",
      amount: "",
      reason: "",
   })

   const [redirection, setRedirection] = useState(false)

   useEffect(() => {
      console.log("DetailCost mounted")
      if (id) {
         getCost(id)
            .then(json => {
               console.log("json trouvé ", json)
               setState(
                  {
                     id: json.id,
                     date: json.date,
                     amount: json.amount,
                     reason: json.reason
                  } as Pick<Cost, keyof Cost>)
            })
            .catch(error =>
               console.error(
                  `Erreur lors du chargement du cost avec l'id ${id} (${error})`
               )
            )
      }
   }, [id])

   const onSubmit = () => {
      // TODO : contrôle

      if (state.id) {
         updateCost(state)
            .then(data => {
               setRedirection(true)
               })
            .catch(error =>
               console.error(
                  `Erreur lors de la mise à jour du frais avec l'id ${state.id} (${error})`
               )
            )
      } else {
         addCost(state)
            .then(data => {
               setRedirection(true)
            })
            .catch(error => console.error(`Erreur lors de l'ajout de la dépense (${error})`))
      }
   }

   const onDelete = () => {
      const res = window.confirm("Voulez-vous vraiment supprimer ce frais?")

      if (res) {
         deleteCost(state.id)
            .then(() => {
               setRedirection(true)
            })
            .catch(err => {
               console.log("Erreur lors de la suppression de l'item ", state.id)
            })
      }
   }

   const onChange = (event: any) => {
      const value = event.target.value
      const name = event.target.name

      setState({...state,
         [name]: value
      } as Pick<Cost, keyof Cost>)
   }

   if (redirection) {
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
               value={state.id}
               onChange={onChange}
            />
         </div>

         <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
               type="date"
               name="date"
               id="date"
               className="form-control"
               value={state.date}
               onChange={onChange}
            />
         </div>

         <div className="form-group">
            <label htmlFor="amount">Montant</label>
            <input
               type="number"
               name="amount"
               id="amount"
               className="form-control"
               value={state.amount}
               onChange={onChange}
            />
         </div>

         <div className="form-group">
            <label htmlFor="reason">Raison</label>
            <input
               type="text"
               name="reason"
               id="reason"
               className="form-control"
               value={state.reason}
               onChange={onChange}
            />
         </div>

         <button className="btn btn-primary btn-block" onClick={onSubmit}>
            {state.id ? "Modifier" : "Ajouter"}
         </button>

         {state.id && (
            <button className="btn btn-danger btn-block" onClick={onDelete}>
               Supprimer
               </button>
         )}
      </div>
   )
}
