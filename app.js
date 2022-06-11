const express = require("express");
require("../src/db/conn");
const CovidPtns = require("../src/models/pts")
const app = express();
const jwt = require("jsonwebtoken");
const authorize = require("./authorization-middleware");
const mongoose = require("mongoose");


const port = process.env.PORT || 8080;

app.use(express.json());

 



//Request a token
//User should be authenticated  !!!

app.get("/token", (req, res) => {
    const payload = {
        name: "jimmy",
        scopes: [" "]
    };
    
    const token = jwt.sign(payload, 'my_secret_key');
    res.send("Token =" +token);
});

//handling post request
app.post("/pts",  async (req, res) => {
    try {

        const addingPtnsDtls = new CovidPtns(req.body);
        console.log(req.body);
        const insertPtns = await addingPtnsDtls.save();
        res.send(insertPtns);
    } catch (e) {
        res.send(e);
    }

})
// handling get request
app.get("/pts", authorize(), async (req, res) => {
   
                try {

                    const getPtnsDtls = await CovidPtns.find({});
                    res.send(getPtnsDtls);
                } catch(e) {
                    res.status(400).send(e);
                }
                
            });
        

// handling get request for indiv
app.get("/pts/:id", async (req, res) => {
    try {
        const _id = req.params.id;
        const getPtnsDtl = await CovidPtns.findById(_id);
        res.send(getPtnsDtl);
    } catch (e) {
        res.status(400).send(e);
    }

});
// handling patch request for indiv
app.patch("/pts/:id", authorize(),  async (req, res) => {
    try {
        const _id = req.params.id;
        const getPtnsDtl = await CovidPtns.findByIdAndUpdate(_id, req.body, { new: true });
        res.send(getPtnsDtl);
    } catch (e) {
        res.status(500).send(e);
    }

})
// handling delete request for indiv
app.delete("/pts/:id",  async (req, res) => {
    try {

        const getPtnsDtl = await CovidPtns.findByIdAndDelete(req.params.id);
        res.send(getPtnsDtl);
    } catch (e) {
        res.status(500).send(e);
    }

});





const server= app.listen(port, () => {
    console.log(`connection is live at port no. ${port}`);
});

