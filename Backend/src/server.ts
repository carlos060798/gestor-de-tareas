import express from "express";
import dotenv from "dotenv";
import { conectarBD } from "./conf/db";

dotenv.config();
conectarBD();
const app= express();

export default app;