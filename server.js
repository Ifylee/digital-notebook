const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;


app.use(express.json());
app.use(express.urlencoded({extended: true}));

const store = require(".db/store");
app.get("/api/notes", (req.res) => {
    store.getNotes().then((notes) => {
        return res.status(200).json(notes)
    }).catch((error) => res.status(500).json(error))
})








// app.use(express.static('public'));