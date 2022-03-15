const mongoose = require('mongoose');
const { Schema } = mongoose;

const reqstring = {
    type: String,
    required: true
}

const schema = new Schema(
{
    user: String,
    guildid: String,
    moderator: String,
},
{
    timestamps: true,
}
);

const names = 'warns'

module.exports = mongoose.models[names] || mongoose.model(names, schema);