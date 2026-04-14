# Note-Taking HTTP Microservice
A simple RESTful HTTP microservice for managing notes with persistent storage using a local JSON file.


## Requirements
Node.js
npm


## Installation
npm install


## Run in Development
npm run dev


## Build
npm run build


## Run Production Build
npm start


## API Endpoints
Create or Update a Note:
    PUT /notes/{id}

    Example:
    curl -X PUT "http://localhost:3000/notes/note1?fav=true" -H "Content-Type: application/json" -d "{\"content\":\"Find a new job\"}"

Retrieve a Note:
    GET /notes/{id}

    Example:
    curl "http://localhost:3000/notes/note1"

List All Note IDs:
    GET /notes

    Example:
    curl "http://localhost:3000/notes"

List Favorite Notes:
    GET /notes/favorites

    Example:
    curl "http://localhost:3000/notes/favorites"


## Storage
Notes are stored in a local JSON file:
data/notes.json


## Error Handling
The API returns appropriate HTTP status codes:
    200 OK – successful request
    201 Created – new note created
    400 Bad Request – invalid input
    404 Not Found – note does not exist
    500 Internal Server Error – unexpected error


## Design
The project follows a layered architecture:

Controller – handles HTTP requests and responses
Service – contains business logic
Repository – handles data persistence