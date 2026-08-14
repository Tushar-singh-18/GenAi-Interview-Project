const mongoose = require('mongoose')


const blackListSchema = new mongoose.Schema({
    token: {
        type: String,
        required: [true, "token is required to be added in blacklist"]
    }
}, {
    timestamps: true
})

const blackListModel =  mongoose.model("BlackListToken", blackListSchema)


module.exports = blackListModel;