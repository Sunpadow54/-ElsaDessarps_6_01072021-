# So Pekocko - La Piquante

## *Projet de formation n°6 du parcours Développeur Web - Openclassrooms*
### Construisez une API sécurisée pour une application d'avis gastronomiques.

-----------------

## Mission

Réaliser le MVP backend d'une application d’évaluation des sauces piquantes de *So Pekocko*, appelée “*Piquante*”.

* Implémenter un modèle logique de données conformément à la réglementation.
* Mettre en œuvre des opérations CRUD de manière sécurisée.
* Stocker des données de manière sécurisée.

Lien vers le projet front-end: https://github.com/OpenClassrooms-Student-Center/dwj-projet6

***

## :wrench: Prerequisites

### 1. Installation

Use **node version 14.0** 

:file_folder: **frontend** :

* frameworks : <kbd>**angular version 7.0.2**</kbd> / <kbd>**node-sass version 4.14.1**</kbd>


:file_folder: **backend** :

* frameworks :  <kbd>**Express**</kbd>
* packages : <kbd>**mongoose**</kbd> / <kbd>**mongoose-unique-validator**</kbd> / <kbd>**bcrypt**</kbd> / <kbd>**body-parser**</kbd> / <kbd>**jsonwebtoken**</kbd> / <kbd>**multer**</kbd> <kbd>**express-mongo-sanitize**</kbd> / <kbd>**helmet**</kbd> / <kbd>**hpp**</kbd> /<kbd>**express-rate-limit**</kbd>
* modules: <kbd>**dotenv**</kbd> 

> Sur Windows, ces installations nécessitent d'utiliser PowerShell en tant qu'administrateur.

dans les deux dossiers pour une installation rapide :
```
npm install
```

### 2. Paramétrer l'accès à mongodb

Dans le fichier <kbd> :page_facing_up: .env</kbd> Changer le mot de passe, le nom de la base de donnée, & nom d'utilisateur
```
DB_NAME=<database name>
DB_USER=<username>
DB_PASS=<password>
```

### 3. Lancer le projet

Dans le dossier <kbd> :file_folder: frontend </kbd>

- Pour avoir accès au serveur de développement : run `npm start` ou `ng serve` (Rendez-vous sur http://localhost:4200/)


Dans le dossier <kbd> :file_folder: backend </kbd>
- Lancer le serveur : `node server` ou `npm start` ou `nodemon server`

## :package: Made with

* Javascript 
    * Express
* Database : MongoDb
* VsCode

## Auteur

Sunpadow - elsa dessarps - 2021
