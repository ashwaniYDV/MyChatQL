# MyChatQL

A chat app based on graphql and apollo stack with user authentication and reaction support

## Screens
![login screen](./screens/mychatql.gif)
![chat emoji picker screen](./screens/mychatql2.gif)


### Usage

(All commands need to be run from root directory unless specified)

```
# Install sequelize-cli globally
npm install - g sequelize-cli

# Install dependencies in server (root directory) and client (client directory)
npm install

# Create a MySQL database using phpmadmin/terminal by the name of chatql

# Migrate all the models (tables) to the created database
sequelize db:migrate

# Start the graphql server and websocket connection
npm start

# From client folder run the react app
npm start
```

## Features
- [x] Realtime Chat
- [x] JWT User authentication
- [x] React to messages with emojis
- [x] All chat data is persisted in mysql database
- [x] Chat with multiple users
- [x] Update your profile
- [x] Profile image validation


### Tech-stack and others:
- [x] Graphql
- [x] NodeJS
- [x] Apollo-Server
- [x] React
- [x] Apollo-Client
- [x] sequelize-cli
- [x] MySql
- [x] JWT
- [x] React-Bootstrap 

#### Inspiration from
[classsed](https://www.youtube.com/c/Classsed)
