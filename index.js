const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const projects = require("./projects.json");


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("portfolio server is running");
});

app.get('/project/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const project = projects.find(p => p.id === id);
  res.send(project);
});


app.listen(port, () => {
  console.log(`portfolio server is running on port ${port}`);
});
