import React, { useState } from "react";
import { AppBar, Button, Tab, Tabs, Toolbar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store";

const Header = () => {
  const dispatch = useDispatch();
  const [val, setVal] = useState();
  const isLoggedin = useSelector((state) => state.isLoggedin);
  console.log(isLoggedin)
  const valueChangeHandler = (event, value) => {
    console.log(value);
    setVal(value);
  };
  return (
    <AppBar
      position="sticky"
      sx={{
        background:
          "linear-gradient(90deg, rgba(31,32,68,1) 0%, rgba(44,103,100,1) 100%, rgba(0,212,255,1) 100%)",
      }}
    >
      <Toolbar>
        <Typography variant="h4">Blog App</Typography>
        {isLoggedin && (
          <Box display="flex" marginLeft={"auto"} marginRight="auto">
            <Tabs textColor="inherit" value={val} onChange={valueChangeHandler}>
              <Tab LinkComponent={Link} to="/blogs" label="All Blogs" />
              <Tab LinkComponent={Link} to="/myBlogs" label="My Blogs" />
              <Tab LinkComponent={Link} to="/blogs/add" label="Add Blogs" />
            </Tabs>
          </Box>
        )}
        <Box display="flex" marginLeft="auto">
          {!isLoggedin && (
            <>
              <Button
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
                LinkComponent={Link}
                to="/auth"
              >
                Login
              </Button>
              <Button
                variant="contained"
                sx={{ margin: 1, borderRadius: 10 }}
                color="warning"
                LinkComponent={Link}
                to="/auth"
              >
                Signup
              </Button>
            </>
          )}
          {isLoggedin && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              variant="contained"
              sx={{ margin: 1, borderRadius: 10 }}
              color="warning"
              LinkComponent={Link}
              to="/auth"
            >
              logout
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
