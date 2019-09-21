import React, { Component } from "react"
import { Link } from "react-router-dom"
import Banner from "components/Banner"
import MonthlyCostsSummary from "components/MonthlyCostsSummary"
import ListCostRows from "components/ListCostRows"
import { getAllCosts } from "API"
import { Cost } from "Models"

interface State {
   costs: Array<Cost>
}

export default class IndexPage extends Component<any, State> {
   constructor(props) {
      super(props)

      this.state = {
         costs: [] as Array<Cost>
      }
   }

   componentDidMount() {
      this.updateCosts()
   }

   updateCosts() {
      getAllCosts()
         .then(response => {
            console.log("Success:", response)
            this.setState({
               costs: response
            })
         })
         .catch(error => console.error("Error:", error))
   }

   render() {
      return (
         <div>
            <Banner />
            <MonthlyCostsSummary costs={this.state.costs} />
            <ListCostRows costs={this.state.costs} />
            <div style={{textAlign: "center"}}>
              <Link to="/detail">
                <button type="button" className="btn btn-primary btn-lg">
                    Ajouter
                </button>
              </Link>
            </div>
         </div>
      )
   }
}
