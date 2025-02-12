Technical Round Task: Express.js Cron Job to Update Tokens for Authenticated Users

Objective: Develop a simple Express.js application that includes a cron job to update authentication tokens for each user in a MongoDB database at regular intervals.


---

Task Requirements

1. Database: Use MongoDB to store user information including authentication tokens.


2. Authentication: Mock user authentication to retrieve user details.


3. Cron Job: Implement a cron job that updates the authentication token for all users every hour.


4. Token Update Logic:

The token should be a randomly generated string (e.g., using UUID or a crypto library).

Each token update should also log the previous and new token in the console.