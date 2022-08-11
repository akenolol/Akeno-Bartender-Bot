const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    userID: String,
    username: String,

    group: {
        name: String,
        description: String,
        owner: String,
        members: String,
    }
})

module.exports = mongoose.model('User', userSchema);
