### Sherwood

Sherwood est un site permettant de noter les frais d'un utilisateur.

Ce projet sert de démo pour utiliser React et React Router.
Il utilise [Create React App](https://github.com/facebookincubator/create-react-app).

Les composants React sont encapsulés ainsi :

```
- App
  - IndexPage                   : page par défaut
    - Banner                    : bannière (commune à toutes les pages du site)
    - CostsUI                   : partie réservé à l'affichage des coûts
      - MonthlyCostsSummary     : affiche la somme des frais du mois
      - ListCostRows            : affiche la liste de tous les frais du mois

  - Detail Page                 : affichage d'un détail de frais. Permet la création et la mise à jour d'un frais
    - Banner                    : bannière (commune à toutes les pages du site)
    - DetailCost                : formulaire
```
