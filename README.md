# Dumbgram Api's Collection

<a href="#">
    <img
      src="https://img.shields.io/badge/Version-1.0.0-blue"
      alt="Latest Version"
    />
</a>

> This repo contains api collection for dumbgram project.

## Daftar Isi
* [Teknologi/Stack](#teknologi)
* [Installation](#installation)

## Teknologi
Projek ini dibangun dengan menggunakan :
* Node
* ES6
* MYSQL 5
* PHP 7.4

## Installation

#### 1. Install dependencies 
- Install All Dep
  ```
  npm install
  ```

#### 2. Setup local environment
- Setup configuration
- Setup .env
- Create database with a name that matches database name in the config

#### 3. Genereate databases table and starter data set
- Run migration
  ```
  npx sequelize-cli db:migrate
  ```
- Run seeder
  ```
  npx sequelize-cli db:seed:all
  ```
- Run app
  ```
  // Running the server only
  npm start

  // Running the server and the client web
  npm run dev
  ```