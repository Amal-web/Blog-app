import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";

const labelStyles = {
  marginBottom: 1,
  marginTop: 2,
  fontSize: "24px",
  fontWeight: "bold",
};

const BlogDetails = () => {
    const navigate=useNavigate()
  const [blog, setBlog] = useState();
  const id = useParams().id;
  console.log(id);
  const [inputs, setInputs] = useState();
  const onChangeHandler = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    // console.log(event.target.name, "name");
    // console.log(event.target.value, "value");
  };
  
  const fetchDetails = async () => {
    const response = await axios
      .get("http://localhost:5000/api/blog/" + id)
      .catch((err) => console.log(err));
    const data = await response.data;
    return data;
  };
  useEffect(() => {
    fetchDetails().then((data) => {
      setBlog(data);
      setInputs({
        title: data.blog.title,
        description: data.blog.description,
        image: data.blog.image,
      });
    });
  }, [id]);
  

  const sendRequest=async()=>{
    const response =await axios
      .put("http://localhost:5000/api/blog/update/" + id,{
        title:inputs.title,
        description:inputs.description,
      })
      .catch((err) => console.log(err));

      const data = await response.data;
      
      return data
  }
  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    
    sendRequest().then((data)=>console.log(data)).then(()=>navigate("/myBlogs/"))
    
  };

  return (
    <div>
      {inputs && (
        <form onSubmit={onFormSubmitHandler}>
          <Box
            border={3}
            borderColor="#28525A"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={"bold"}
              padding={3}
              color="black"
              variant="h2"
              textAlign={"center"}
            >
              Post Your Blog{" "}
            </Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              value={inputs.title}
              onChange={onChangeHandler}
              margin="normal"
              variant="outlined"
            />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              value={inputs.description}
              onChange={onChangeHandler}
              margin="normal"
              variant="outlined"
            />
            

            <Button
              sx={{ mt: 2, borderRadius: 4 }}
              variant="contained"
              color="warning"
              type="submit"
            >
              Submit
            </Button>
          </Box>
        </form>
      )}
    </div>
  );
};

export default BlogDetails;
