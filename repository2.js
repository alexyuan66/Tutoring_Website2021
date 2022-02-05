//Student name: Alexander Yuan
//This data repository code is modified from an example at 
//https://www.geeksforgeeks.org/how-to-store-password-securely-in-your-local-custom-database-in-node-js/

const fs = require('fs')
const util = require('util')
  
class Repository {
  
    constructor(filename) {
  
        // The filename where datas are
        // going to store
        if (!filename) {
            throw new Error(
'Filename is required to create a datastore!')
        }
  
        this.filename = filename
  
        try {
            fs.accessSync(this.filename)
        } catch (err) {
  
            // If file not exist it is created
            // with empty array
            fs.writeFileSync(this.filename, '[]')
        }
    }
  
    // Method to fetch all records
    async getAllRecords() {
        return JSON.parse(
            await fs.promises.readFile(this.filename, {
                encoding: 'utf8'
            })
        )
    }
  
    //Method to search all tutoring records for a specific username and password
    async searchTutor(attrs) {
        //console.log(this.filename)
        const records = await this.getAllRecords()
        const {inputTutorType, inputTutorUsername, inputTutorPass, tutorCall , tutorAreas} = attrs
        //console.log(attrs)
        //console.log(inputTutorUsername)
        //console.log(records)
        const record1 = await records.find(function(e) {return e.tutorUsername == inputTutorUsername && e.tutorPassword == inputTutorPass})
        //console.log('aaaxx')
        //console.log (record1)
        return record1
    }

    // Method to save registered tutoring user information within JSON file
    async createTutor(attrs) {
        const records = await this.getAllRecords()
        const { tutorType, tutorUsername, tutorPassword, tutorCall, tutorAreas } = attrs

        // Create new record with hashed and 
        // salted password instead of raw password
        const record = attrs
  
        records.push(record)
  
        // Write all records to the database
        await fs.promises.writeFile(
            this.filename,
            JSON.stringify(records, null, 2)
        )
  
        return record
    }
}
  
module.exports = new Repository('datastore2.json')