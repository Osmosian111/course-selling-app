const express = require("express");
const app = express();
const port = 3000;

app.use(express.json());

app.post("/user/signup",(req,res)=>{
    res.json({msg:"signup"})
})

app.post("/course/sigin",(req,res)=>{
    res.json({msg:"sigin"})
})

app.post("/user/purchases",(req,res)=>{
    res.json({msg:"purchases"})
})

app.post("/courses",(req,res)=>{
    res.json({msg:"courses"})
})

app.listen(port)