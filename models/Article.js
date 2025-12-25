const mongoose = require('mongoose');

const schema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    date: { type: Date, default: Date.now}
})

const Article = mongoose.model('Article', schema);

module.exports = Article