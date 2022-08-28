// import libs
const express = require("express")
const cors = require("cors")
 

// import la base de données monngoose
const mongoose = require("./config/db")
 

// import controllers
const productControllers=require("./controllers/ProductControllers")
 
// creation d'un objet express .
const app = express()
const port = 3001

// autorisé les données de type JSON
app.use(express.json())
// autorisé les données de type files
app.use(express.urlencoded({
    extended: true
}));



// autorisé l'accee d'un serveur//
app.use(cors())
// access to public files
app.use(express.static('./assets/images'));
app.use(express.static('./assets/images/product'));
// router
app.use("/product",productControllers)
 

app.listen(port, () => { console.log(`🟢 Server started on port ${port}`); })