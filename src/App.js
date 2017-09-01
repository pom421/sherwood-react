import React, { Component } from 'react';
//import logo from './img/logo.svg';
import './css/App.css';

/*
class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}
*/

class App extends Component {

	render() {
	    return (
            <div>
                <Banner></Banner>
                <CostsUI costs={ this.props.costs }></CostsUI>
            </div>
        )
	}
}


class Banner extends Component {

    render() {
        return (
            <div>
                <h1>Sherwood</h1>
            </div>
        )
    }
}

class CostsUI extends Component {

    render() {
        return (
            <div>
                <MonthlyCostsSummary costs={ this.props.costs }></MonthlyCostsSummary>
                <ListCostRows costs={ this.props.costs }></ListCostRows>
            </div>
        )
    }
}

class MonthlyCostsSummary extends Component {

    render() {

        var sum = this.props.costs
            .map(cur => +cur.amount)
            .reduce((curr, prev) => curr + prev, 0);


        return (
            <div>Frais du mois d'août { sum } €</div>
        )
    }

}

class ListCostRows extends Component {

    render() {

        var rows = this.props.costs
            .map(curr => {
                return (
                    <tr key={ curr.id }>
                        <td>
                            { curr.date } { curr.amount }€<br/>
                            { curr.reason }
                        </td>
                    </tr>
                )
            }
    	)


		return (
            <div>
                <h2>Historique des dépenses</h2>
                <table>
                    <tbody>{ rows }</tbody>
                </table>
            </div>
        )
    }

}

export default App;
