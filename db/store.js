const util = require("util");

const fs = require("fs");

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);


class Store {
    read() {
        return readFileAsync("db/db.json", "utf8")
    }

    write() {
        return writeFileAsync("db/db.json", JSON.stringify(note))

    }

    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes.push(JSON.parse(notes))

            }.catch(error) {
                parsedNotes = []
            }
        })

    }

    addNotes() {

    }

    removeNotes() {

    }

}

module.exports = new Store;