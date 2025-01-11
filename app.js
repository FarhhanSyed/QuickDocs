const express=require("express");
const mongoose=require("mongoose");
const app=express();
const path=require("path");

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"/view")));
app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));

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

app.get("/quickDocs/login",(req,res)=>{
    res.render("login.ejs");
})

app.get("/",(req,res)=>{
    res.send("root working");
})

app.listen(8080,()=>{
    console.log(`Server started on port 8080`);
})