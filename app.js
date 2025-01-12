const express=require("express");
const mongoose=require("mongoose");
const app=express();
const path=require("path");
const expressLayouts = require("express-ejs-layouts");
const { title } = require("process");


app.set("view engine","ejs");
app.set("layout", "layouts/boilerplate"); 
app.use(express.static(path.join(__dirname,"/view")));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(expressLayouts);


async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/QuickDocs");
}

main()
.then(()=>{
    console.log("Connection Successfull");
})
.catch((err)=>{
    console.log(err);
})

app.get("/quickDocs/home",(req,res)=>{
    res.render("pages/home.ejs",{title:"home",stylesheet:"home.css"});
})

app.get("/quickDocs/login",(req,res)=>{
    res.render("pages/login.ejs",{title:"login",stylesheet:"login.css"});
})

app.get("/quickDocs/onboardingA",(req,res)=>{
    res.render("/pages/onboardingA.ejs",{title:"onboardingA",stylesheet:"onboarding.css"});
})

app.get("/",(req,res)=>{
    res.send("root working");
})

app.listen(8080,()=>{
    console.log(`Server started on port 8080`);
})