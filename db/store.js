const util = require("util");

const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class Store {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }

    write(note) {
        return writeFileAsync("db/db.json", JSON.stringify(note, null, 4))

    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes))

            } catch(error) {
                parsedNotes = []
            }
            
            return parsedNotes;
        })

    }

    addNotes(notes) {
        const {title, text} = notes;

        if(!title || !text) {
            throw new Error("Title and Text cannot be blank")
        }

        const newNote = {title, text}

        return this.getNotes().then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote);

    }

    removeNotes(id) {
        return this.getNotes().then((notes) => notes.filter((node) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes))
    }

}

module.exports = new Store();