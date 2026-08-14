const mongoose = require('mongoose')

async function connectdb() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB is connected");
    }
    catch (err) {
        console.log(err);

    }
}

module.exports = connectdb