import React, { Component } from 'react'
//import logo from './img/logo.svg';
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import {
	BrowserRouter as Router,
	Route,
    Link,
    Redirect,
	Switch
} from 'react-router-dom'

// récupération d'image à partir de la librairie Octicon de Github
import ArrowLeft from 'react-icons/lib/go/arrow-left';

// Jeux de données ----- 

var COSTS = [
	{ costId: 1, date: "13/08/2017", amount: "27", reason:"Restaurant"},
	{ costId: 2, date: "04/08/2017", amount: "23", reason:"Docteur"},
	{ costId: 3, date: "01/07/2017", amount: "400", reason:"Hébergement Dordogne"}
]

const getCost = costId => {
    const arr = COSTS.filter( c => c.costId === +costId)

    return arr && arr[0] ? arr[0] : {}
}

const updateCost = cost => {

    var copy = COSTS.slice()
    for (var i = 0; i < copy.length; i++) {
        if (copy[i].costId === cost.costId) {
            copy[i] = cost
            break
        }
    }
    COSTS = copy
}

const addCost = cost => {
    COSTS.push(cost)
    return getCost(cost.costId)
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
                        <Route path="/detail/:costId" component={ DetailPage }></Route>
                    </Switch>
                    
                    
                </Router>
            
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
				<DetailCost costId={ this.props.match.params.costId }></DetailCost>
			</div>

		)
	}
}

class DetailCost extends Component {

    constructor(props) {
        super(props)

        let cost = getCost(this.props.costId)
        
        this.state = {
            costId: cost.costId,
            date: cost.date,
            amount: cost.amount,
            reason: cost.reason
        }
        
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

        this.redirection = false
    }

    handleSubmit(event) {

        event.preventDefault()

        // TODO : contrôle

        // mise à jour ou ajout
        if (this.state.costId) {
            updateCost(this.state)
            
        } else {
            addCost(this.state)

        }

        this.redirection = true

        
    }
    
    handleInputChange(event) {
        const value = event.target.value
        const name = event.target.name
        
        console.log("change détecté", name, value)
        
        this.setState({
            [name]: value
        })
    }
    
    render() {

        if (this.redirection) {
            return (
                <div>
                    <span>Dans le redirect</span>
                    <Redirect to="/"/>
                </div>
            )
        }

        return (
            <div>
                <h1>Page de détail</h1>

                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="id">Id</label>
                        <input name="id" id="id" className="form-control" disabled value={ this.state.costId } />
                    </div>

                    <div className="form-group">
                        <label htmlFor="date">Date</label>
                        <input name="date" id="date" className="form-control" value={ this.state.date } onChange={ this.handleInputChange }></input>
                        {/*<input name="date" id="date" type="date" className="form-control" defaultValue="12-24-1983" />*/}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="amount">Montant</label>
                        <input name="amount" id="amount" className="form-control" value={ this.state.amount } onChange={ this.handleInputChange }></input>
                    </div>

                    <div className="form-group">
                        <label htmlFor="reason">Raison</label>
                        <input name="reason" id="reason" className="form-control" value={ this.state.reason } onChange={ this.handleInputChange }></input>
                    </div>
                                        
                    <input type="submit" className="btn btn-primary btn-block" value={ this.state.costId ? "Modifier" : "Ajouter" } onChange={ this.handleInputChange } />
                </form>
            </div>
        )
    }
}

class Banner extends Component {

    render() {
        return (
            <div>
                <h1 style={{ fontFamily: 'Lobster' }}>Sherwood</h1>
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
                    <tr key={ curr.costId }>
                        <td>
                            <Link to={ `/detail/${ curr.costId }` }>
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
