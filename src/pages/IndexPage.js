import React, { Component } from "react"
import Banner from "../components/Banner"
import { Link } from "react-router-dom"
import MonthlyCostsSummary from "../components/MonthlyCostsSummary"
import ListCostRows from "../components/ListCostRows"
import { getAllCosts } from "../API"

export default class IndexPage extends Component {
   constructor(props) {
      super(props)

      this.state = {
         costs: []
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
