const express = require("express");
const cors = require('cors');
const mongoose = require("mongoose");
const testRoutes = require("./routes/testRoutes");

const app = express();

app.use(express.json());
app.use(cors());
// Use the test routes
app.use("/api/tests", testRoutes);

const PORT = process.env.PORT || 5000;
const DB_URI = "mongodb://localhost:27017/testdb";  // Update this to match your MongoDB URI

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
