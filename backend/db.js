const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:gofood@cluster0.mlxw4s3.mongodb.net/?retryWrites=true&w=majority'
const mongoDB = () => {
    mongoose.connect(mongoURI).then(() => {
        console.log("Connected to mongo");
    }).catch((e) => {
        console.log("ERROR")
    })
}

module.exports = mongoDB;
