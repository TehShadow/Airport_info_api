const mongoose =require("mongoose")
const Airport = require("../models/airport")

exports.get_by_iata = async (req,res,next) =>{
    const {iata} = req.params;
    const airport = await Airport.find({iata_code:iata})
    if(airport.length === 0){
        res.status(404).json({"error":"nothing found"})
    }
    else{
        res.status(200).json(airport)  
    }
    console.log(iata , airport)
} 

exports.get_by_country = async (req,res,next) =>{
    const {code} = req.params;
    const airport = await Airport.find({country:code})
    if(airport.length === 0){
        res.status(404).json({"error":"nothing found"})
    }
    else{
        res.status(200).json(airport)  
    }
    console.log(code , airport)
}

exports.get_by_name = async (req,res,next) =>{
    const {nameSearch} = req.params;
    const airport = await Airport.find({'name':{'$regex': `${nameSearch}`}})
    if(airport.length === 0){
        res.status(404).json({"error":"nothing found"})
    }
    else{
        res.status(200).json(airport)  
    }
    console.log(nameSearch , airport)
}  