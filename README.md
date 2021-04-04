# nodejs-express-sequelize-mysql

# Express is one of the most popular web frameworks for Node.js that supports routing, middleware, view system…

# Sequelize is a promise-based Node.js ORM that supports the dialects for Postgres, MySQL, SQL Server…

# First, we start with an Express web server. Next, we add configuration for MySQL database, create Category model with Sequelize, write the controller. Then we define routes for handling all CRUD operations (including custom finder).


# Create Node.js App
First, we create a folder:

    mkdir nodejs-express-sequelize-mysql
    cd nodejs-express-sequelize-mysql
    
# Next, we initialize the Node.js App with a package.json file:

    npm init

    name: (nodejs-express-sequelize-mysql) 
    version: (1.0.0) 
    description: Node.js Rest Apis with Express, Sequelize & MySQL.
    entry point: (index.js) server.js
    test command: 
    git repository: 
    keywords: nodejs, express, sequelize, mysql, rest, api
    author: Jonayeid
    license: (ISC)

    Is this ok? (yes) yes
    
    
# We need to install necessary modules: express, sequelize, mysql2 and body-parser.
Run the command:

    npm install express sequelize mysql2 body-parser cors --save
    
# Setup Express web server
In the root folder, let’s create a new server.js file:

    const express = require("express");
    const bodyParser = require("body-parser");
    const cors = require("cors");

    const app = express();

    var corsOptions = {
      origin: "http://localhost:8081"
    };

    app.use(cors(corsOptions));

    // parse requests of content-type - application/json
    app.use(bodyParser.json());

    // parse requests of content-type - application/x-www-form-urlencoded
    app.use(bodyParser.urlencoded({ extended: true }));

    // simple route
    app.get("/", (req, res) => {
      res.json({ message: "Welcome to your application." });
    });

    // set port, listen for requests
    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
    
    
# Now let’s run the app with command: 

    node server.js.

 # Open your browser with url http://localhost:8080/, you will see:
