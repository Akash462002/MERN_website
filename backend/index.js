const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
// const bodyParser = require("body-parser");
const ProductRouter = require("./routes/product");
const userRoutes = require("./routes/signupAuth");
const authRoutes = require("./routes/loginAuth")
const app = express();
app.use(cors());
app.use(express.json());
const uri = process.env.ATLAS_URI;
app.use("/product",ProductRouter);
app.use("/users",userRoutes);
app.use("/auth",authRoutes);


const path = require('path');

app.use('/images', express.static(path.join(__dirname, 'backend/images')));

mongoose.connect(uri)
.then(()=>{
    app.listen(8000);
    console.log("Mongoose connected.")
})
.catch((err) =>{
    console.log(err)
})






// const connection = mongoose.connection;
// connection.once('open',()=>{
//     console.log('mongos connected')
// })

// app.listen(8000,()=>{
//     console.log('server is on port 8000')
// })