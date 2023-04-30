
import { Box, InputLabel, TextField, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const labelStyles = {
  marginBottom: 1,
  marginTop: 2,
  fontSize: "24px",
  fontWeight: "bold",
};
const AddBlog = (props) => {
  
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  const sendRequest = async () => {
    const response = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: localStorage.getItem("userId"),
      })
      .catch((error) => console.log(error));
    const data = await response.data;
    console.log(data);
    return data;
  };

  const onChangeHandler = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    // console.log(event.target.name, "name");
    // console.log(event.target.value, "value");
  };
  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => setInputs(data))
      .then(() => navigate("/blogs"));

    setInputs({
      title: "",
      description: "",
      image: "",
    });
  };
  return (
    <div>
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
          <InputLabel sx={labelStyles}>Image</InputLabel>
          <TextField
            margin="normal"
            variant="outlined"
            onChange={onChangeHandler}
            name="image"
            value={inputs.image}
            sx={labelStyles}
          >
            Image
          </TextField>

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
    </div>
  );
};

export default AddBlog;
