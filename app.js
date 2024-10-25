// const express = require("express");
// const app = express();
// const cors = require("cors");

// require("./conn/conn");

// const path = require("path");
// const auth = require("./routes/auth");
// const list = require("./routes/list");
// app.use(express.json());
// app.use(cors());

// app.get("/", (req, res) => {
//   res.send("Hello");
// });

// app.use("/api/v1", auth);
// app.use("/api/v2", list);

// app.get("/", (req, res) => {
//   app.use(express.static(path.resolve(__dirname, "frontend1", "build")));
//   res.sendFile(path.resolve(__dirname, "frontend1", "build", "index.html"));
// });

// app.listen(4000, () => {
//   console.log("Server started at 4000");
// });
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");

// MongoDB connection
require("./conn/conn");

// Import routes
const auth = require("./routes/auth");
const list = require("./routes/list");

// Middleware
app.use(express.json());
app.use(cors());

// API routes
app.use("/api/v1", auth);
app.use("/api/v2", list);

// Serve frontend static files
app.use(express.static(path.join(__dirname, "frontend1", "build")));

// Catch-all route to serve frontend for any request that doesn't match API routes
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "frontend1", "build", "index.html"));
});

// Start server
app.listen(4000, () => {
  console.log("Server started on port 4000");
});
