import app from "./app.js";

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});