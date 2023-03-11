# companies-app

**Demo:** http://ec2-3-83-253-73.compute-1.amazonaws.com/

**Credentials:** 

**User:** Email: user@admin.test.com Password: user@admin.test.com

**Admin:** Email: admin@admin.test.com Password: admin@admin.test.com

## Run app locally:

In this file you will find the instructions for running the project locally in your machine.

## DB creation:

First, a PostgreSQL database should be created in order to run the project correctly. The folder named `./testDBConfig` has some files for the creation and population of the DB. Follow the next instructions:

1. Create a new Databse using PgAdmin (you can use any name for the DB).
2. Right click on the new DB and choose the option "Create Script".
3. Copy the content of `./testDBConfig/backup.sql` and paste it in the script sheet.
4. Execute the script. This will create all the necessary tables for the project.

## Backend installation and DB users creation:

The next step is to create some test users for the project. So you need to run the backend first:

1. Create the `.env` file in the root directory of the project with the env variables. The needed variables are shown in `.env.example`. You need to create the `.env` file with your actual DB connection variables.
2. Run `npm install` on the root directory of the project.
3. Run `npm start`. The backend will run in `port 5000`.
4. Open Postman.
5. Import the collection provided in `./testDBConfig/user-creation.postman_collection.json` in Postman. There are 2 requests in this collection, one creates a regular user in the DB and the other creates an admin user.
6. Run both queries using Postman. An user with email `user@admin.test.com` and password `user@admin.test.com`, and an admin with email `admin@admin.test.com` and password `admin@admin.test.com` will be created in the DB.

## Frontend installation:

1. Run `npm install` on `/front-end` directory.
2. Run `npm start` on that folder.
3. Open `http://localhost:3000/`.
4. You can use the users created before in order to test the application.

## Technologies I used:

- **DB:** PostgreSQL.
- **Backend:**  Node, ExpressJS, Objection and Knex for DB connection, JWT and bcrypt for auth and password hashing.
- **Frontend:** React, Redux, Bootstrap.

