const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:gofood@cluster0.mlxw4s3.mongodb.net/gofood?retryWrites=true&w=majority'
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected")
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const data = await fetched_data.find({}).toArray();
        // console.log(data)
    }
    catch (err) {
        console.log(err)
    }

}

module.exports = mongoDB;
