import {app} from "./app.js";

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is running. Use our API on port: ${port}`);
});


// import { app } from './app.js';

// const port = Number(process.env.PORT) || 3000;

// console.log("Starting server on port", port);

// app.listen(port, () => {
//   console.log(`✅ Server is running. Use our API on port: ${port}`);
// });

// // Держим процесс живым
// process.on('uncaughtException', (error) => {
//   console.error('Uncaught Exception:', error);
// });

// process.on('unhandledRejection', (reason, promise) => {
//   console.error('Unhandled Rejection at:', promise, 'reason:', reason);
// });