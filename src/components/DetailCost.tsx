import React, { FC, useState, useEffect } from "react"
import { Redirect } from "react-router-dom"
import { getCost, updateCost, addCost, deleteCost } from "API"
import { Cost } from "Models"

interface MyProps {
   id: number | undefined
}

export const DetailCost: FC<MyProps> = ({ id }) => {
   // initialisation à "". Ne pas initialiser à null ou undefined, au risque que React croit que les composants sont non contrôlés
   // alors qu'ils le deviennent avec componentDidMount (cf https://reactjs.org/docs/forms.html#controlled-components + https://github.com/twisty/formsy-react-components/issues/66)

   const [state, setState] = useState({
      id: id,
      date: "",
      amount: 0,
      reason: "",
   })

   const [redirection, setRedirection] = useState(false)

   useEffect(() => {
      async function fetchData(id: number): Promise<void> {
         const cost = await getCost(id)

         setState({
            id: cost.id,
            date: cost.date,
            amount: cost.amount,
            reason: cost.reason,
         } as Cost)
      }
      if (id) {
         fetchData(id)
      }
   }, [id])

   const onSubmit = async (): Promise<void> => {
      // TODO : contrôle

      if (state.id) {
         const res = await updateCost(state)
         if (res) {
            setRedirection(true)
         }
      } else {
         const cost = await addCost(state)

         if (cost) {
            setRedirection(true)
         }
      }
   }

   const onDelete = async (): Promise<void> => {
      const res = window.confirm("Voulez-vous vraiment supprimer ce frais?")

      if (res) {
         const res = await deleteCost(state.id)
         if (res) {
            setRedirection(true)
         }
      }
   }

   // eslint-disable-next-line @typescript-eslint/no-explicit-any
   const onChange = (event: any): void => {
      const value = event.target.value
      const name = event.target.name

      setState({ ...state, [name]: value })
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
            <input type="date" name="date" id="date" className="form-control" value={state.date} onChange={onChange} />
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
