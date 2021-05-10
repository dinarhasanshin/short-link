const {Schema, Types, model} = require('mongoose')

const schema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    links: [{type: Types.ObjectId, ref: 'Link'}],
    todos: {type: Types.ObjectId, ref: 'Todo'},
    maxOrder: {type: Number, default: 0, required: true}
})

module.exports = model('User', schema)