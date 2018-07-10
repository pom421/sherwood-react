import React, { Component } from "react"
import MonthlyCostsSummary from "./MonthlyCostsSummary"
import ListCostRows from "./ListCostRows"

export default class CostsUI extends Component {
   render() {
      return (
         <div>
            <MonthlyCostsSummary costs={this.props.costs} />
            <ListCostRows costs={this.props.costs} />
         </div>
      )
   }
}
