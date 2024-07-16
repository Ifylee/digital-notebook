const router = require("express").Router();
const store = require("../db/store");


// API Routes

// localhost:3001/api/notes GET
router.get("/notes", (req, res) => {
    store.getNotes().then((notes) => {
        return res.status(200).json(notes)
    }).catch((error) => res.status(500).json(error))
})

// localhost:3001/api/notes POST
router.post("/notes", (req, res) => {
    store.addNotes(req.body).then((note) => {
        return res.status(201).json(note)
    }).catch((error) => res.status(500).json(error))
})


// localhost:3001/api/notes/:id DELETE
router.delete("/notes/:id", (req, res) => {
    store.removeNotes(req.params.id).then(() => {
        return res.status(200).json({delete: true, id: req.params.id})
    }).catch((error) => res.status(500).json(error))
});


module.exports = router;

