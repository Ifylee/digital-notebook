// import the Router module from expree used to create modular route handlers
const router = require("express").Router();

// import the API routes which contains routes for API endpoints
const apiRoutes = require("./apiRoutes");
// import the HTML routes which contains routes for HTML pages
const htmlRoutes = require("./htmlRoutes");

// used routes for any request that starts with "/api"
router.use("/api", apiRoutes);
router.use("/", htmlRoutes);

// export the router so it can be used in other parts of the application.
module.exports = router;