import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


import HomePage from "./pages/HomePage";
import Root from "./pages/Root";
import AuthPage from "./pages/AuthPage"
import BlogsPage from "./pages/BlogsPage";
import BlogDetailPage from "./pages/BlogDetailPage"
import AddBlogPage from "./pages/AddBlogPage"
import MyblogsPage from "./pages/MyblogsPage";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store";


const router = createBrowserRouter([
  { 
    path: "/",
    element: <Root />,
    children: [
      { path: "/", element: <HomePage /> },
      {
        path: "auth",
        element: <AuthPage />,
      },
      {
        path: "blogs",
        element: <BlogsPage/>,
      },
      {
        path: "myBlogs",
        element:<MyblogsPage/>,
      },
      {
        path: "myBlogs/:id",
        element: <BlogDetailPage />,
      },
      {
        path: "blogs/add",
        element: <AddBlogPage />,
      },
    ],
  },
]);

function App() {
  // const isLoggedin=useSelector((state)=>state.isLoggedin)
  const dispatch=useDispatch()
  useEffect(()=>{
    if(localStorage.getItem("userId")){
      dispatch(authActions.login())
    }
  },[dispatch])

  return <RouterProvider router={router} />;
}

export default App;
