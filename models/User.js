// bring in Mongoose
const mongoose = require('mongoose');

// create a user schema that takes in an object of properties

const UserSchema = mongoose.Schema({
    name: {
        type: String, 
        required: true
    },
    email: {
        type: String, 
        required: true,
        unique: true
    },
    password: {
        type: String, 
        required: true
    },
    date: {
        type: Date, 
        default: Date.now
    },
}); 

//export and pass into the export the user schema we just created 
mongoose.model('user', UserSchema);