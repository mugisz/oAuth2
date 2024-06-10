import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthService } from "../../service/auth.service";
import { Button, Card, CardContent, Typography, Box } from "@mui/material";

const LoginPage = () => {
  const navigate = useNavigate();

  const handleLogin = async () => {
    const success = await AuthService.handleLogin();
    if (success) {
      navigate("/home");
    } else {
      alert("Login failed");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Login to account
          </Typography>
          <Button variant="outlined" onClick={handleLogin}>
            Sign In
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default LoginPage;
