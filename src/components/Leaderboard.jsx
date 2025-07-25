import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";


const Leaderboard = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("leaderboard")) || [];
    setEntries(stored);
  }, []);

  return (

    <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Leaderboard (Top 10)
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>Rank</strong></TableCell>
            <TableCell><strong>Username</strong></TableCell>
            <TableCell><strong>Score</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {entries.map((entry, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{entry.username}</TableCell>
              <TableCell>{entry.score}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
    
  );
};

export default Leaderboard;
