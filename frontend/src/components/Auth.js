import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../store";
import { useNavigate } from "react-router-dom";
const Auth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isSignup, setIsSignup] = useState(false);
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const signupButtonHandler = () => {
    setIsSignup(!isSignup);
  };
  const inputChangeHandler = (event) => {
    setInputs((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
    // console.log(event.target.name,"name")
    // console.log(event.target.value,"value")
  };
  const sendRequest = async (type = "login") => {
    const response = await axios
      .post("http://localhost:5000/api/user/" + type, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password,
      })
      .catch((error) => console.log(error));
    const data = await response.data;
    console.log(data);
    return data;
  };
  const onFormSubmitHandler = (event) => {
    event.preventDefault();
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup").then((data)=>localStorage.setItem("userId",data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    } else {
      sendRequest().then((data)=>localStorage.setItem("userId",data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => navigate("/blogs"));
    }
    setInputs({
      name: "",
      password: "",
      email: "",
    });
  };
  return (
    <div>
      <form onSubmit={onFormSubmitHandler}>
        <Box
          maxWidth={400}
          display="flex"
          flexDirection={"column"}
          alignItems={"center"}
          justifyContent="center"
          padding={3}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          borderRadius={5}
        >
          <Typography padding={3} textAlign="center" variant="h4">
            {isSignup ? "Signup" : "Login"}
          </Typography>
          {isSignup && (
            <TextField
              margin="normal"
              placeholder="Name"
              name="name"
              onChange={inputChangeHandler}
              value={inputs.name}
              required
            />
          )}
          <TextField
            margin="normal"
            placeholder="Email"
            type={"email"}
            name="email"
            onChange={inputChangeHandler}
            value={inputs.email}
            required
          />
          <TextField
            margin="normal"
            placeholder="Password"
            type={"password"}
            name="password"
            onChange={inputChangeHandler}
            value={inputs.password}
            required
          />
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="warning"
            variant="contained"
            type="submit"
          >
            Submit
          </Button>
          <Button
            sx={{ borderRadius: 3, marginTop: 3 }}
            onClick={signupButtonHandler}
          >
            `Change to {isSignup ? "Login" : "Signup"}`
          </Button>
        </Box>
      </form>
    </div>
  );
};

export default Auth;
