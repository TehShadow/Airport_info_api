const mongoose = require('mongoose');
const Airport = require("../models/airport")
const { 
    type ,
    name , 
    continent,
    iso_country,
    iso_region,
    municipality,
    gps_code,
    iata_code,
    local_code,
    coordinates
     } = require('./airport_Data.json')

mongoose.connect('mongodb://localhost:27017/Airplane_tickets_app', {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    });
    
const db = mongoose.connection;
    
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const seedDB = async () =>{
    await Airport.deleteMany({});
    let i = 0
    while(name[i]){
        const airport = new Airport({
            _id:new mongoose.Types.ObjectId(),
            type: `${type[i]}`,
            name: `${name[i]}`,
            continent: `${continent[i]}`,
            country: `${iso_country[i]}`,
            region: `${iso_region[i]}`,
            municipality: `${municipality[i]}`,
            gps_code: `${gps_code[i]}`,
            iata_code: `${iata_code[i]}`,
            local_code: `${local_code[i]}`,
            coordinates: `${coordinates[i]}`,
        })
        await airport.save();
        i++; 
    }
    console.log("All done with seeding!")
}

seedDB().then(()=>{
    mongoose.connection.close()
})

