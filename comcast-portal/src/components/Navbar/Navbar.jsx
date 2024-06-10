import React from "react";

import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("jwtSecret");
    navigate("/login");
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          onClick={() => navigate("/home")}
          sx={{ flexGrow: 1 }}
        >
          Aoth2
        </Typography>
        <Button color="inherit" onClick={() => navigate("/home")}>
          Home Page
        </Button>
        <Button color="inherit" onClick={() => navigate("/account")}>
          User Page
        </Button>
        <Button color="inherit" onClick={() => navigate("/activation")}>
          Activate Page
        </Button>
        {localStorage.getItem("jwtSecret") ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <></>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
