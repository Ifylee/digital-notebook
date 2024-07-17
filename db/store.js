// import modules
const util = require("util");

const fs = require("fs");

const { v4: uuidv4 } = require('uuid');

// Promisify the read and write files function so they can be used as promises
const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

// A Store class to handle reading, writing and managing notes
class Store {
    // method to read the contents of the db.json file
    read() {
        return readFileAsync("db/db.json", "utf8")
    }

    // method to write new data to the db.json file
    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note, null, 4))

    }

    // method to get all notes from the db.json file
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
            //   try to parse the notes as JSON
                parsedNotes = [].concat(JSON.parse(notes))

            } catch(error) {
                // If it fails, return an empty array
                parsedNotes = []
            }
            
            // return parsed notes
            return parsedNotes;
        })

    }

    // method to add a new note to the db.json file
    addNotes(notes) {
        const {title, text} = notes;

        // checks if title or text is missing
        if(!title || !text) {
            throw new Error("Title and Text cannot be blank")
        }

        // creates a new note with a unique ID
        const newNote = {title, text, id: uuidv4()};

        // Get existing notes, add the new note, write the updated notes to the file, and return the new note
        return this.getNotes().then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);

    }

    // Method to delete a note by ID from the db.json file
    removeNotes(id) {
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes))
    }

}

// export an instance of the Store class to be used in other parts of the application.
module.exports = new Store();