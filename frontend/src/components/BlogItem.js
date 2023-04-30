import React from "react";
import {
  Avatar,
  CardContent,
  CardMedia,
  Typography,
  Card,
  CardHeader,
  IconButton,
  Box,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const BlogItem = ({ title, description, imageURL, userName, isUser, id }) => {
  
  const navigate = useNavigate();

  const editHandler = () => {
    navigate("/myBlogs/" + id);
  };

  const deleteRequest = async () => {
    const response = await axios.delete("http://localhost:5000/api/blog/" + id);
    const data = await response.data;
    console.log(data);
    return data;
  };
  const deleteHandler = () => {
    deleteRequest()
      .catch((err) => console.log(err))
      .then((data) => console.log(data))
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  return (
    <div>
      <Card
        sx={{
          width: "40%",
          margin: "auto",
          marginTop: 2,
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        {isUser && (
          <Box display="flex">
            <IconButton onClick={editHandler} sx={{ marginLeft: "auto" }}>
              <EditIcon color="warning" />
            </IconButton>
            <IconButton onClick={deleteHandler}>
              <DeleteIcon color="error" />
            </IconButton>
          </Box>
        )}
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
              {userName}
            </Avatar>
          }
          title={title}
          subheader="September 14, 2016"
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />
        <CardContent>
          <hr />
          <br />
          <Typography variant="body2" color="text.secondary">
            <b>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default BlogItem;
