const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://kudriashovaag:web000@cluster0.ab16ifu.mongodb.net/react?appName=Cluster0')
module.exports = mongoose.connection