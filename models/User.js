const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const schema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    expoPushToken: { type: String },
    date: { type: Date, default: Date.now },
    
})

schema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10)
})

const User = mongoose.model('User', schema)
module.exports = User