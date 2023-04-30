const express=require('express')
const {getAllBlogs,addBlogs,updateBlog,getById,deleteBlog,getUserById}=require("../Controllers/blog-control")
console.log(typeof(getAllBlogs),"edwefwef")

const blogRouter=express.Router();

blogRouter.get("/",getAllBlogs)
blogRouter.post("/add",addBlogs)
blogRouter.put("/update/:id",updateBlog)
blogRouter.get("/:id",getById)
blogRouter.delete("/:id",deleteBlog)
blogRouter.get("/user/:id",getUserById)

module.exports=blogRouter