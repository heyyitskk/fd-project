const mongoose = require('mongoose');
const mongoURI = 'mongodb+srv://gofood:gofood@cluster0.mlxw4s3.mongodb.net/gofood?retryWrites=true&w=majority'
const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log("connected")
        const fetched_data = await mongoose.connection.db.collection("food_items");
        const food_category = await mongoose.connection.db.collection("food_category");
        const fetched_items = await fetched_data.find({}).toArray();
        const fetchedCategory = await food_category.find({}).toArray()
        global.food_items = fetched_items;
        global.food_category = fetchedCategory;

        // console.log(global.food_items)
    }
    catch (err) {
        console.log(err)
    }

}

module.exports = mongoDB;
