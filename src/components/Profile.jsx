import React from "react";
import { Paper, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";


const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const score = localStorage.getItem("score");

  const logout = () => {
    localStorage.removeItem("isLoggedIn");
    navigate("/login");
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5">Profile</Typography>
      <Typography variant="body1" mt={2}><strong>Username:</strong> {user?.username}</Typography>
      <Typography variant="body1"><strong>Email:</strong> {user?.email}</Typography>
      <Typography variant="body1"><strong>Last Score:</strong> {score}</Typography>
      <Stack direction="row" spacing={2} mt={3}>
        <Button variant="contained" onClick={() => navigate("/")}>Back to Quiz</Button>
        <Button variant="outlined" onClick={logout}>Logout</Button>
      </Stack>
    </Paper>
  );
};

export default Profile;