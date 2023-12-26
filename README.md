# Softball Stat Tracker App


This is a web application that allows users to keep track of their teams' stats and the stats of their competition. The frontend of the application is built using React, while the backend is developed with Ruby on Rails. The application utilizes a RESTful API to handle user authentication, schedule management, and game stat functionality.

Demo: https://youtu.be/740gQc5dzzo
    -to see demo teams use login - username:john123 and password:123
## Features


- **User authentication**: Users can create accounts, log in, and log out of the application.
- **Schedule management**: Users can view a list of their games.
- **Game Stat management**: Users can view their season stats, individual game stats, create new game stats, delete game stats, and update existing game stats.
- **All Teams**: Users can view all the teams on their schedule and the stats from their games.


## Technologies Used


- **Frontend**: React with Redux
- **Backend**: Ruby on Rails
- **Database**: PostgreSQL


## Backend Models


The backend consists of the following models:


- **User**: Represents a user of the application. Users can have many teams.
- **Game**: Represents a game. Games can have many game stats and many players.
- **Player**: Represents a player. Players can have many game stats and many games.
- **Team**: Represents a team. Teams can have many games and many players.
- **Game Stat**: Represents a single stat made by a player for a specific game. Game stats belong to both players and games..


## Getting Started


To run the application locally, follow these steps:


1. Clone the repository: `git clone stat-tracker`
2. Navigate to the project directory: `cd stat-tracker`
3. Install dependencies: `npm install`
4. Start the Rails server: `rails s`
5. Navigate to the client: `cd client`
6. Start the client: `npm start`
7. Access the application in your browser at http://localhost:3000


## Frontend Structure


Here's an overview of the frontend components used:


- **App**: The core component responsible for structuring the entire application and managing routing. It interacts with the backend API, handling data related to game statistics, teams, players, and user authentication.
- **NavBar**: Renders the navigation bar, providing links to different pages within the application and offering access to the user's profile information.
- **Home**: Displays the main landing page, presenting a list of available game statistics and teams. Users can navigate from here to different sections of the app.


## API Endpoints


The frontend interacts with the backend API through various endpoints. Here are some of the important API endpoints used by the application:


- **POST /login**: Initiates a login session by creating a new session.
- **GET /auth**: Retrieves the current user's information for authentication.
- **DELETE /logout**: Ends the current user's session, effectively logging them out.
- **GET /teams/:id**: Retrieves detailed information about a specific team identified by `:id`.







