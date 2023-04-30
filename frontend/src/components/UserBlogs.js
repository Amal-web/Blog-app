import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogItem from "./BlogItem";

const UserBlogs = () => {
  const [user, setUser] = useState();
  const userId = localStorage.getItem("userId");
  const sendRequest = async () => {
    const response = await axios
      .get("http://localhost:5000/api/blog/user/" + userId)
      .catch((err) => console.log(err));
    const data = await response.data;
    
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setUser(data.user));
  }, []);
  
  return (
    <div>
      {user &&
        user.blogs &&
        user.blogs.map((blog, index) => (
          <BlogItem
          
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={user.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
