import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["London", "Paris", "Rome", "Berlin"],
    answer: "Paris",
  },
  {
    question: "Which is the largest planet?",
    options: ["Mars", "Jupiter", "Earth", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "HTML stands for?",
    options: [
      "Hyper Text Markup Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
      "None of the above",
    ],
    answer: "Hyper Text Markup Language",
  },
  {
    question: "Which tag is used to create a hyperlink in HTML?",
    options: ["<link>", "<a>", "<href>", "<nav>"],
    answer: "<a>",
  },
  {
    question: "Which HTML tag is used to display an image?",
    options: ["<img>", "<image>", "<pic>", "<src>"],
    answer: "<img>",
  },
  {
    question: "Which property is used to change text color in CSS?",
    options: ["text-color", "color", "font-color", "foreground-color"],
    answer: "color",
  },
  {
    question: "Which CSS property is used to control the layout (flex or grid)?",
    options: ["display", "position", "layout", "float"],
    answer: "display",
  },
  {
    question: "Which method is used to write content in JavaScript?",
    options: ["console.log()", "document.write()", "alert()", "innerText"],
    answer: "document.write()",
  },
  {
    question: "What keyword is used to declare a variable in JavaScript?",
    options: ["var", "int", "define", "set"],
    answer: "var",
  },
  {
    question: "What will `typeof []` return in JavaScript?",
    options: ["array", "object", "list", "undefined"],
    answer: "object",
  },
];

const Quiz = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState("");
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showResult, setShowResult] = useState(false);

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) navigate("/login");
  }, [navigate]);

  const getFeedback = (percentage) => {
    if (percentage >= 80) return "🎉 Wonderful! Great job!";
    else if (percentage >= 50) return "👍 Good effort! You can do even better.";
    else return "📝 Needs more practice. Keep learning!";
  };

  const handleNext = () => {
    const isCorrect = selected === questions[current].answer;
    const newScore = score + (isCorrect ? 1 : 0);
    setScore(newScore);
    setSelected("");

    if (current + 1 < questions.length) {
      setCurrent(current + 1);
    } else {
      const percentage = (newScore / questions.length) * 100;
      const feedbackMsg = getFeedback(percentage);
      setFeedback(feedbackMsg);
      setShowResult(true);

      // leaderboard logic
      const entry = { username: user?.username || "Guest", score: newScore };
      let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
      leaderboard.push(entry);
      leaderboard.sort((a, b) => b.score - a.score);
      leaderboard = leaderboard.slice(0, 10);
      localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
      localStorage.setItem("score", newScore);
    }
  };

  const handleGoToProfile = () => {
    navigate("/profile");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        p: 2,
      }}
    >
      <Paper elevation={4} sx={{ p: 4, width: "100%", maxWidth: 600 }}>
        {!showResult ? (
          <>
            <Typography variant="h5" gutterBottom>
              Question {current + 1} of {questions.length}
            </Typography>
            <Typography variant="h6" mb={2}>
              {questions[current].question}
            </Typography>
            <FormControl component="fieldset">
              <RadioGroup
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                {questions[current].options.map((opt, i) => (
                  <FormControlLabel
                    key={i}
                    value={opt}
                    control={<Radio />}
                    label={opt}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              onClick={handleNext}
              disabled={!selected}
            >
              {current + 1 === questions.length ? "Finish" : "Next"}
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h4" gutterBottom>
              Quiz Completed!
            </Typography>
            <Typography variant="h5" gutterBottom>
              Your Score: {score}/{questions.length}
            </Typography>
            <Typography variant="h6" color="primary">
              {feedback}
            </Typography>
            <Button
              variant="outlined"
              sx={{ mt: 2 }}
              onClick={handleGoToProfile}
            >
              Go to Profile
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Quiz;


