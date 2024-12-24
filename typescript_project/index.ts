import express from "express";
import { calculate, Operation } from "./multiplier";
const app = express();

app.use(express.json());

app.get("/ping", (_req, res) => {
  res.send("pong");
});

app.post("/calculate", (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { value1, value2, op } = req.body;

  // // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  // const result = calculate(Number(value1), Number(value2), op);
  const result = calculate(Number(value1), Number(value2), op as Operation);
  res.send({ result });
});

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
