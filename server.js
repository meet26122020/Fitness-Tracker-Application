const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");

require("./config/db");
require("dotenv").config();
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const cookieParser = require("cookie-parser");

app.use(cookieParser());

const userRoutes = require("./routes/userRoutes");
const workoutRoutes = require("./routes/workoutRoutes");
const goalRoutes = require("./routes/goalRoutes");
const programRoutes = require("./routes/programRoutes");

app.use("/api/v1", userRoutes);
app.use("/api/v1/workout", workoutRoutes);
app.use("/api/v1/goals", goalRoutes);
app.use("/api/v1/programs", programRoutes);

// swagger Ui
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: " Fitness Tracker Application",
    version: "1.0.0",
    description: "API for managing Fitness_Tracker_Application",
  },
  servers: [
    {
      url: "http://localhost:5000/api", // Replace with your API base URL
    },
  ],
};
// Options for Swagger JSDoc
const options = {
  swaggerDefinition,
  // Path to the API docs
  apis: [
    "./routes/userRoutes.js",
    "./routes/workoutRoutes.js",
    "./routes/programRoutes.js",
    "./routes/goalRoutes.js",
  ],
};

// Initialize SwaggerJSDoc
const swaggerSpec = swaggerJsdoc(options);

// Use Swagger UI
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => {
  res.send(
    "<center><h1>Fitness Tracker Application</h1><br>Get Recipe Api <a href=https://github.com/Devanshiballar/-Fitness_Tracker_Application.git target=_blank>Repository :Fitness Tracker Application</a></center>"
  );
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
