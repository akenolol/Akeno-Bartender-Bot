const mongoose = require('mongoose');
const { Schema } = mongoose;

const groupsSchema = new Schema({
    name: String, // Name of the group
    description: String, // Description of the group
    ownerName: String, // Name of the owner
    ownerId: String, // ID of the owner
    icon: String, // Icon of the group
    dateCreated: Date, // Date the group was created
    ownerIcon: String, // Icon of the owner
})

module.exports = mongoose.model('Groups', groupsSchema);
