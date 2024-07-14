const router = require("express").Router();
const store = require("../db/store");

const store = require(".db/store");
router.get("/api/notes", (req,res) => {
    store.getNotes().then((notes) => {
        return res.status(200).json(notes)
    }).catch((error) => res.status(500).json(error))
})


router.post("/api/notes", (req,res) => {
    store.addNotes(req.body).then((notes) => {
        return res.status(200).json(notes)
    }).catch((error) => res.status(500).json(error))
})


router.delete("/api/notes/:id", (req,res) => {
    store.removeNotes(req.params,id).then(() => {
        return res.status(200).json({delete: true, id: req.params.id})
    }).catch((error) => res.status(500).json(error))
})

// HTML Route
router.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
})

router.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
})    

module.exports = router;