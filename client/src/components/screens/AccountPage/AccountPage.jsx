import React, { useState } from "react";
import { AuthService } from "../../../service/auth.service";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Box,
} from "@mui/material";

const AccountPage = () => {
  const [accountId, setAccountId] = useState("");
  const [account, setAccount] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    const accountData = await AuthService.searchAccount(accountId);
    if (accountData) {
      setAccount(accountData);
      setError(""); // Clear error if account is found
    } else {
      setAccount(null);
      setError("Account with this ID does not exist");
    }
  };

  const handleEdit = async (id) => {
    const newAddress = prompt("Enter new address: ");
    if (newAddress) {
      const success = await AuthService.editAccount(id, newAddress);
      if (success) {
        setAccount((prevAccount) => ({
          ...prevAccount,
          address: newAddress,
        }));
      }
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom>
            Search Account
          </Typography>
          <Box display="flex" flexDirection="column" alignItems="center">
            <TextField
              label="Account ID"
              variant="outlined"
              value={accountId}
              onChange={(e) => setAccountId(e.target.value)}
              margin="normal"
            />
            <Button variant="contained" onClick={handleSearch} sx={{ mt: 2 }}>
              Search
            </Button>
          </Box>
          {error && (
            <Typography variant="body2" color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
          {account && (
            <Box mt={4}>
              <Typography variant="h6" component="div">
                Information about account
              </Typography>
              <Typography variant="body2">
                <strong>AccountId:</strong> {account.id}
              </Typography>
              <Typography variant="body2">
                <strong>First name:</strong> {account.firstName}
              </Typography>
              <Typography variant="body2">
                <strong>Last name:</strong> {account.lastName}
              </Typography>
              <Typography variant="body2">
                <strong>Address:</strong> {account.address}
              </Typography>
              <Typography variant="body2">
                <strong>Creation date:</strong> {account.creationDate}
              </Typography>
              <Typography variant="body2">
                <strong>Paid account:</strong> {account.isPaid ? "Так" : "Ні"}
              </Typography>
              <Button
                variant="outlined"
                onClick={() => handleEdit(account.id)}
                sx={{ mt: 2 }}
              >
                Edit
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default AccountPage;
