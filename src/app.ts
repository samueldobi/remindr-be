import  express from "express";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Remindr API is running");
});

app.get("/test", (req, res) => {
  console.log("Testing the route");
  res.send("Route is working!");
});

export default app;