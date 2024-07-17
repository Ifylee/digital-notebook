// import modules
const router = require("express").Router();
const path = require("path");

// Defines a route handler for GET requests to "/notes"
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/notes.html"))
})

// Defines the route handler for all other GET requests.
router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../public/index.html"))
});    

// export the router to be used in other parts of the application
module.exports = router;