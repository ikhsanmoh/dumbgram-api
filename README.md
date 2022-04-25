# Dumbgram Api's Collection
This repo contain backend of dumbgram project.

## Installation
- Install dependecies
```
npm install
```
- Setup configuration
- Setup .env
- Create database with a name that matches database name in the config
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


