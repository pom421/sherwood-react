import React, { Component } from 'react';
//import logo from './img/logo.svg';
import './css/App.css';

import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
} from 'react-router-dom';


class App extends Component {

	render() {
		return (
			<Router>
				<Switch>
					<Route exact path="/" render={() => <IndexPage costs={ this.props.costs } />} />
					<Route path="/detail" component={ DetailPage }></Route>
				</Switch>
			</Router>
		)
	}
}

class IndexPage extends Component {

	render() {
		return (
			<div>
				<Banner></Banner>
				<CostsUI costs={this.props.costs}></CostsUI>
				<Link to="/detail">Ajouter</Link>
			</div>
		)
	}
}

class DetailPage extends Component {

	render() {
		return (
			<div>
				<Banner></Banner>
				<Link to="/">Retour</Link>
				<DetailCost></DetailCost>
			</div>

		)
	}
}

class DetailCost extends Component {

    render() {
        return (
            <div>
                <h1>Page de détail</h1>
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
