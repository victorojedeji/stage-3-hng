import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import Layout from "../pages/layout";
import GalleryPage from "../pages/gallery";


export const LAYOUT = "/";
export const LOGIN= "/login";
export const GALLERY = "/gallery"

export const router = createBrowserRouter([
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: LAYOUT,
    element: <Layout />,
  },
  {
    path: GALLERY,
    element: <GalleryPage />,
  },
]);
