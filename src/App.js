import React, { Component } from 'react'
import {
	BrowserRouter as Router,
	Route,
    Link,
    Redirect,
	Switch
} from 'react-router-dom'

import { 
    getCosts,
    getCost,
    updateCost, 
    addCost 
} from "./API"

//import logo from './img/logo.svg';
import './css/App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
// récupération d'image à partir de la librairie Octicon de Github
import ArrowLeft from 'react-icons/lib/go/arrow-left';

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

    updateCosts() {

        getCosts()
        .then(res => res.json())
        .catch(error => console.error('Error:', error))
        .then(response => {
            console.log('Success:', response)
            this.setState({
                costs: response
            })
        });

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
                    <button type="button" className="btn btn-primary mx-2">Ajouter</button>
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
				<DetailCost id={ this.props.match.params.id }></DetailCost>
			</div>

		)
	}
}

class DetailCost extends Component {

    constructor(props) {
        super(props)

        this.state = {
            id: undefined,
            date: undefined,
            amount: undefined,
            reason: undefined
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)

        this.redirection = false
    }

    componentDidMount() {

        getCost(this.props.id)
        .then(res => res.json())
        .catch(error => console.error(`Erreur lors du chargement du cost avec l'id ${ this.props.id }`))
        .then(response => {
            this.setState({
                id: response.id,
                date: response.date,
                amount: response.amount,
                reason: response.reason
            })
        })

    }

    handleSubmit(event) {

        event.preventDefault()

        // TODO : contrôle

        // mise à jour ou ajout
        if (this.state.id) {
            updateCost(this.state)
            .catch(error => console.error(`Erreur lors de la mise à jour du frais avec l'id ${ this.state.id }`))
            
        } else {
            addCost(this.state)
            .catch(error => console.error(`Erreur lors de l'ajout du frais`))
            
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
                <Redirect to="/"/>
            )
        }

        return (
            <div>
                <h1>Page de détail</h1>

                <form onSubmit={ this.handleSubmit }>
                    <div className="form-group">
                        <label htmlFor="id">Id</label>
                        <input name="id" id="id" className="form-control" disabled value={ this.state.id } />
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
                                        
                    <input type="submit" className="btn btn-primary btn-block" value={ this.state.id ? "Modifier" : "Ajouter" } onChange={ this.handleInputChange } />
                </form>
            </div>
        )
    }
}

class Banner extends Component {

    render() {
        return (
            <div>
                <h1 style={{ fontFamily: 'Lobster' }} className="m-4">Sherwood</h1>
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
            <div className="alert alert-primary mx-2" role="alert">Frais du mois d&apos;août { sum } €</div>
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
            <div className="mx-2">
                <h2>Historique des dépenses</h2>
                <table className="table">
                    <tbody>{ rows }</tbody>
                </table>
            </div>
        )
    }

}

export default App;
