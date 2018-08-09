## Installation

```js
$ yarn global add json-server
```

## Pour lancer le serveur d'API REST :

```js
$ yarn run api
```

## Exemples d'appels

```sh
# récupérer tous les costs
$ curl -X GET "http://localhost:3001/costs"
# ajout d'un cost
$ curl -X POST -H "Content-Type: application/json" -d '{
  "date": "28/02/2018",
  "amount": 19,
  "reason": "Cordonnier à Vincennes"
}' "http://localhost:3001/costs"
# modification d'un cost (PATCH permet de modifier un élement et de garder le reste comme sur l'élément d'origine). Le PUT remplace entièrement l'élément
$ curl -X PATCH -H "Content-Type: application/json" -d '{
  "reason": "Cordonnier M. Dupont à Vincennes(modifié)"
}' "http://localhost:3001/costs/2"
# suppression d'un élément
$ curl -X DELETE "http://localhost:3001/costs/5"
```
