const User = require("../model/Usermodal");
const bcrypt=require("bcryptjs")



const getAllUsers = async (req, res, next) => {
  let users;
  try {
    users = await User.find();
  } catch (error) {
    console.log(error);
  }
  if (!users) {
    return res.status(404).json({ message: "No users found" });
  }
  return res.status(200).json({ users });
  console.log(users);
};


const signup = async (req, res, next) => {
  const { name, email, password } = req.body;
  
  let existingUser;
  try {
    existingUser =await User.findOne({ email });
  } catch (err) {
    return console.log(err);
  }
  console.log(existingUser)
  if (existingUser) {
    return res.status(400).json({ message: "User alredy exists" });
  }
  const hashPassword=bcrypt.hashSync(password)
  console.log(hashPassword)
  const data= {
    name:name,
    email:email,
    password:hashPassword,
    blogs:[]
  };
  try {
    await User.create(data)
   
    
  } catch (error) {
    return console.log(error)
  }
  return res.status(201).json({data})
};

const login=async(req,res,next)=>{
  const {email,password}=req.body
  let existingUser;
  try {
    existingUser=await User.findOne({email})
  } catch (error) {
    return console.log(error)
    
  }
  console.log(existingUser)
  if(!existingUser){
    return res.status(404).json({message:"User not found"})
  }

  const isPasswordCorrect=bcrypt.compareSync(password,existingUser.password)

  if(!isPasswordCorrect){
    return res.status(400).json({message:"Password Incorrect"})
  }

  return res.status(200).json({message:"Login Successfull",user:existingUser})
}


module.exports = {getAllUsers,signup,login};
