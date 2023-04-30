import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const response = await axios.get("http://localhost:5000/api/blog");
    const data = await response.data;
    
    return data;
  };

  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);

  console.log(localStorage.getItem("userId"))

  return (
    <div>
      {blogs &&
        blogs.map((blog, index) => (
          <BlogItem
            isUser={localStorage.getItem("userId")===blog.user._id}
            id={blog._id}
            key={index}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
        ))}
    </div>
  );
};

export default Blogs;
