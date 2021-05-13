const mongoose = require('mongoose');

const airportSchema = mongoose.Schema({
    _id:mongoose.Schema.Types.ObjectId,
    type:{type:String , require:true},
    name:{type:String , require:true},
    continent:{type:String , require:true},
    country:{type:String , require:true},
    region:{type:String  , require: true},
    municipality:{type:String},
    gps_code:{type:String },
    iata_code:{type:String , require:true},
    local_code:{type:String},
    cooordinates:{type:String , require:true}
})

module.exports = mongoose.model("Airport",airportSchema)