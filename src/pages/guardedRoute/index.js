import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { LOGIN } from "../../lib/routes";
import { useAuth } from "../../hooks/auth";
import { Ring } from "@uiball/loaders";


export default function Auth() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isDataLoading } = useAuth();

  useEffect(() => {
    if (!isDataLoading && pathname.startsWith("/auth") && !user) {
      navigate(LOGIN);
    }
  }, [pathname, user]);


  if (isDataLoading) return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ring color='#ffffff'/>
    </div>
  );
  return (
    <>
      <Outlet />
    </>
  )
}
