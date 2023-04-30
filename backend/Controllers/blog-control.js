const { default: mongoose } = require("mongoose");
const Blog = require("../model/Blogmodel");
const User = require("../model/Usermodal");

const getAllBlogs = async (req, res, next) => {
  const { user, title, description, image } = req.body;
  let blogs;
  try {
    blogs = await Blog.find().populate("user");
  } catch (error) {
    return console.log(error);
  }
  if (!blogs) {
    return res.status(404).json({ message: "No message found" });
  }
  return res.status(200).json({ blogs });
};

const addBlogs = async (req, res, next) => {
  const { title, description, user, image } = req.body;

  let existingUser;
  try {
    existingUser = await User.findById(user);
  } catch (error) {
    console.log(error);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "Unable to find user" });
  }
  const blog = new Blog({
    title: title,
    description: description,
    image: image,
    user: user,
  });
  try {
    const session = await mongoose.startSession();
    session.startTransaction();
    await blog.save({ session });
    existingUser.blogs.push(blog);
    await existingUser.save({ session });
    await session.commitTransaction();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }

  return res.status(200).json({ message: "Blog added successfully" });
};

const updateBlog = async (req, res, next) => {
  const blogId = req.params.id;
  const { title, description } = req.body;
  let blog;
  try {
    blog = await Blog.findByIdAndUpdate(blogId, {
      title: title,
      description: description,
    });
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "unable to update" });
  }

  return res.status(200).json({ blog });
};
const getById = async (req, res, next) => {
  const id = req.params.id;

  let blog;
  try {
    blog = await Blog.findById(id);
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.status(404).json({ message: "Could not find blog" });
  }
  return res.status(200).json({ blog });
};

const deleteBlog = async (req, res, next) => {
  const id = req.params.id;
  let blog;
  try {
    blog = await Blog.findByIdAndRemove(id).populate("user");
    await blog.user.blogs.pull(blog);
    await blog.user.save();
  } catch (error) {
    console.log(error);
  }
  if (!blog) {
    return res.status(500).json({ message: "Unable to delete" });
  }
  console.log(blog, "sidaudbicabidcnaiwdcib");
  return res.status(200).json({ message: "succeffully deleted" });
};
const getUserById = async (req, res, next) => {
  const id = req.params.id;
  let userBlogs;
  try {
    userBlogs = await User.findById(id).populate("blogs");
  } catch (error) {
    console.log(error);
  }
  if (!userBlogs) {
    return res.status(404).json({ message: "no blogs found" });
  }
  return res.status(200).json({ user: userBlogs });
};

module.exports = {
  getAllBlogs,
  addBlogs,
  updateBlog,
  getById,
  deleteBlog,
  getUserById,
};
