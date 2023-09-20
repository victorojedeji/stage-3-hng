import React from "react";
import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/auth/Login";
import IndexPage from "../pages/layout";
import GalleryPage from "../pages/gallery";
import Auth from "../pages/guardedRoute";


export const INDEX = "/";
export const LOGIN= "/login";
export const GALLERY = "/auth/gallery";
export const GUARDEDROUTE = '/auth'

export const router = createBrowserRouter([
  {
    path: LOGIN,
    element: <Login />,
  },
  {
    path: INDEX,
    element: <IndexPage />,
  },
  {
    path: GUARDEDROUTE,
    element: <Auth />,
    children: [
      {
        path: GALLERY,
        element: <GalleryPage />,
      },
    ]
  },
  {
    path: INDEX,
    element: <IndexPage />,
  },

]);
