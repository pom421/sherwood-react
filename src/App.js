import React, { Component } from 'react'
//import logo from './img/logo.svg';
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
	BrowserRouter as Router,
	Route,
	Link,
	Switch
} from 'react-router-dom'

import ArrowLeft from 'react-icons/lib/go/arrow-left';


var COSTS = [
	{ id: 1, date: "13/08/2017", amount: "27", reason:"Restaurant"},
	{ id: 2, date: "04/08/2017", amount: "23", reason:"Docteur"},
	{ id: 3, date: "01/07/2017", amount: "400", reason:"Hébergement Dordogne"}
]

const getCost = id => {
    const arr = COSTS.filter( c => c.id === +id)

    return arr && arr[0] ? arr[0] : {}
}

class App extends Component {

    constructor(props) {
        super(props)

        this.state = {
            costs: []
        }

    }
    
    componentDidMount() {
        this.timerId = this.updateCosts()
    }

    componentWillUnmount() {
        clearInterval(this.timerId)
    }

    updateCosts() {
        // TODO : récupération asynchrone, en Ajax par exemple
        setInterval(() => {
            this.setState({
                costs: COSTS
            })

            console.log("Mise à jour des coûts", new Date().toLocaleTimeString())
            console.log("State", JSON.stringify(this.state))
            
        }, 5000)

    }
    
	render() {

        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/" render={() => <IndexPage costs={ this.state.costs } />} />
                        <Route exact path="/detail" component={ DetailPage }></Route>
                        <Route path="/detail/:id" component={ DetailPage }></Route>
                    </Switch>
                    
                    
                </Router>
                
                {/*
                <span>Dernière tâche { this.state && this.state.costs[0] && JSON.stringify(this.state.costs[0]) }</span>
                */}
            </div>
        )
	}
}

class IndexPage extends Component {

	render() {
		return (
			<div>
                <Banner></Banner>
				<CostsUI costs={ this.props.costs }></CostsUI>
                <Link to="/detail">
                    <button type="button" className="btn btn-primary btn-block">Ajouter</button>
                </Link>
			</div>
		)
	}
}

class DetailPage extends Component {

	render() {
		return (
			<div>
				<Banner></Banner>
                <Link to="/">
                <ArrowLeft size="30"/> Retour</Link>
				<DetailCost costId={ this.props.match.params.id }></DetailCost>
			</div>

		)
	}
}

class DetailCost extends Component {

    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(event) {

        event.preventDefault()

        const data = new FormData(event.target)

        console.log("JSON.stringify", JSON.stringify(data))

    }

    render() {

        let cost = getCost(this.props.costId)

        return (
            <div>
                <h1>Page de détail</h1>

                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="id">Id</label>
                        <input name="id" id="id" className="form-control" disabled value={ cost.id } />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input name="date" id="date" className="form-control" value={ cost.date }></input>
                        {/*<input name="date" id="date" type="date" className="form-control" defaultValue="12-24-1983" />*/}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="amount">Montant</label>
                        <input name="amount" id="amount" className="form-control" value={ cost.amount }></input>
                    </div>
                                        
                    <input type="submit" className="btn btn-primary btn-block" value="Ajouter" />
                </form>
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
            <div className="alert alert-primary" role="alert">Frais du mois d&apos;août { sum } €</div>
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
                            <Link to={ `/detail/${ curr.id }` }>
                            { curr.date } <span className="badge badge-secondary">{ curr.amount }€</span><br/>
                            { curr.reason }
                            </Link>
                        </td>
                    </tr>
                )
            }
    	)

		return (
            <div>
                <h2>Historique des dépenses</h2>
                <table className="table table-dark">
                    <tbody>{ rows }</tbody>
                </table>
            </div>
        )
    }

}

export default App;
