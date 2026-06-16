import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { mongoDB } from "./config/mongodb.js";
import cors from "cors";

import dns from "node:dns/promises";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(
  cors({
    origin: process.env.ORIGIN_URL,
    credentials: true,
  }),
);

const PORT = process.env.PORT;

const startServer = async () => {
  try {
    await mongoDB();
    server.listen(PORT, () => {
      console.log(`Server started on Port:- ${PORT}`);
    });
  } catch (error) {
    console.log(`Error in startServer!:- ${error.message}`);
    process.exit(1);
  }
};
startServer();
