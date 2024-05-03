const mongoose = require("mongoose");

const tagsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }

})

const Tag = mongoose.model('tag', tagsSchema);
module.exports = Tag;