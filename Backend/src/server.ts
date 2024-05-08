import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import corsOptions from "./conf/cors";
import { conectarBD } from "./conf/db";
import ProyectRoutes from "./Router/ProyectRoutes";


dotenv.config();
conectarBD();
const app= express();
app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/api/projects',ProyectRoutes);

export default app;