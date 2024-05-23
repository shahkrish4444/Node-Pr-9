const mongoose = require('mongoose')
const db = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017')
        console.log("Database Connected...")

    } catch (err) {
        console.error(err.message)
    }
}
module.exports = db 