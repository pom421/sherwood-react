import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

var COSTS = [
	{ id: 1, date: "13/08/2017", amount: "27", reason:"Restaurant"},
	{ id: 2, date: "04/08/2017", amount: "23", reason:"Docteur"},
	{ id: 3, date: "01/07/2017", amount: "400", reason:"Hébergement Dordogne"}
]

ReactDOM.render(<App costs={COSTS}/>, document.getElementById('root'));
registerServiceWorker();
