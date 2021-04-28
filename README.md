### Stack Technique 
- NodeJS
- MongoDB
- ExpressJS: to run the server & make the endpoints accessible.
- Mongoose: to manage MongoDB schema, validation & access.

### Chicken life management
- GET: Retrieve the list of all existing chickens : http://localhost:8080/api/chicken
- POST: Create a new chicken : http://localhost:8080/api/chicken
    exemple of payload: {
        "name": "Mochi",
        "weight": 1.55,
        "birthday": "08/02/2019"
    }
- DELETE: Delete an existing chicken : http://localhost:8080/api/chicken/{chickenId}
- PATCH: Make a chicken run : http://localhost:8080/api/chicken/{chickenId}/run
- PUT: Update all information of a chicken : http://localhost:8080/api/chicken/{chickenId}
    exemple of payload: {
        "name": "Mochi",
        "weight": 1.55,
        "birthday": "08/02/2019",
        "isRunning": false,
        "steps": 0
    }


### Farmyard management
- GET: Retrieve farmyard & its associated chickens : http://localhost:8080/api/farmyard
- POST: Add a chicken to the farmyard: http://localhost:8080/api/farmyard/{chickenId}