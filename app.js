const express = require("express");
const engine = require("ejs-mate");
const path = require("path");
const mongoose = require('mongoose');
const app = express();
const userData = require('./Models/Userdata');
const { title } = require("process");

// Use ejs-mate for rendering
app.engine("ejs", engine);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/freelancer');
}

main()
.then( ()=> {
    console.log("Connection with Mongoose established")
})
.catch((err)=>{
    console.log(err);
})

// Routes
app.get("/register" , (req , res)=>{
    res.render("form.ejs", { title: "Register" });
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, age, mobile } = req.body;

        let newData = new userData({
            name: name,
            email: email,
            age: age,
            mobile: mobile
        });

        await newData.save();

        res.render("thankyou.ejs" , { title: "Thankyou"});
    } catch (err) {
        console.error("Error in insertion:", err);
        res.status(500).send("Server Error");
    }
});


app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Home" });
});

app.get("/FAQs" , (req , res) =>{
    res.render("faqs.ejs" , {title: "FAQs"});
});

app.get("/contact" , (req , res) =>{
    res.render("contact.ejs" , {title: "Contact Us"});
});

app.listen(8080, () => {
    console.log("✅ Server running");
});
