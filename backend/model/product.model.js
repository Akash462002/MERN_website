const express = require("express");
const { default: mongoose } = require("mongoose");
const schema = mongoose.Schema;

const productShema= new schema ({
    title:{
        type:String,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    categories:{
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    imgPath:{
        type:String,
        require:true
    }
})
module.exports= mongoose.model('product', productShema);