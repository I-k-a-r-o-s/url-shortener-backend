import dotenv from "dotenv";
dotenv.config();
import express from "express";

const server = express();

server.use(express.json());

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    server.listen(PORT, () => {
      console.log(`Server started on Port:- ${PORT}`);
    });
  } catch (error) {
    console.log(`Error in startServer!:- ${error.message}`);
    process.exit(1);
  }
};
startServer();
