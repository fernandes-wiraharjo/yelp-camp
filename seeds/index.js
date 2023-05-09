const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.set('strictQuery', false);

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    //useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '641dfeefa35671d1df33950c',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            // image: "https://source.unsplash.com/collection/483251",
            description: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Porro dolorem, eaque dicta nam sit enim ipsa architecto dolorum, consectetur sunt deleniti eos eius, magnam autem blanditiis earum. Molestiae, aspernatur at.",
            price: price, //can also written as price only,
            geometry: {
                "type" : "Point", 
                "coordinates" : [ 
                    cities[random1000].longitude, 
                    cities[random1000].latitude
                ]
            },
            images: [ 
                {
                    "url" : "https://res.cloudinary.com/de7hcol74/image/upload/v1680982567/YelpCamp/klctfnkmp3siawhgrgc4.png", 
                    "filename" : "YelpCamp/klctfnkmp3siawhgrgc4" 
                }, 
                { 
                    "url" : "https://res.cloudinary.com/de7hcol74/image/upload/v1680982571/YelpCamp/lnclzbxdiwdkw7sosuye.png", 
                    "filename" : "YelpCamp/lnclzbxdiwdkw7sosuye"
                } 
            ]
        });
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
});