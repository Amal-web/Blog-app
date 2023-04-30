////mongodb+srv://rhaegal6666:TMu18giHDRm2dUJr@cluster0.hg0qovx.mongodb.net/?retryWrites=true&w=majority
const express = require("express");
// const userSchema = require("./model/Usermodal");
const mongoose = require("mongoose");
const router = require("./Routes/User-routes");
const blogRouter=require("./Routes/blog-routes")
const bodyParser = require("body-parser")
const cors=require("cors")




const app = express();

app.use(cors())

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()) 
app.use("/api/user",router)

app.use("/api/blog",blogRouter)
mongoose
  .connect(
    "mongodb+srv://rhaegal6666:l2KieWohaBmtYFPN@cluster0.hg0qovx.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => console.log("db connected successfully"))
  .catch((err) => {
    console.log(err);
  });

// app.get("/", (req, res) => {
//   res.send("welcome");
// });
// app.get("/user", (req, res) => {
//   const user = {
//     name: "amal",
//     email: "amal@gmail.com",
//   };
//   userSchema.create(user);
//   res.send("success");
// });

app.listen(5000);
