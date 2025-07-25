import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Link,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    localStorage.setItem("user", JSON.stringify(data));
    alert("Registered Successfully!");
    navigate("/login");
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: "auto", mt: 10 }}>
      <Typography variant="h5" gutterBottom>
        Register
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          name="username"
          label="Username"
          value={data.username}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="email"
          label="Email"
          value={data.email}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="password"
          label="Password"
          type="password"
          value={data.password}
          onChange={handleChange}
          margin="normal"
          required
        />
        <TextField
          fullWidth
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          value={data.confirmPassword}
          onChange={handleChange}
          margin="normal"
          required
        />
        <Button
          fullWidth
          type="submit"
          variant="contained"
          sx={{ mt: 2, mb: 1 }}
        >
          Register
        </Button>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link href="/login" underline="hover">
            Login
          </Link>
        </Typography>
      </form>
    </Paper>
  );
};

export default Register;
