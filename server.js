//import the Express module which is used to create a web server
const express = require("express");


// Routes module which contains the applications's routes
const routes = require("./routes");
const app = express();

// Defines the port number the server will listen on
const PORT = process.env.PORT || 3001;

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(express.static("public"));


app.use(routes);

// start the server and listen on the specified port.
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
});
