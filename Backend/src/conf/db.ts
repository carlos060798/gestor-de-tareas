import mongoose from "mongoose";
import { exit } from "node:process";

console.log( process.env.DB);
export const conectarBD = async () => {
  try {
   const conectar= await mongoose.connect('mongodb+srv://carlos:0z56ZrsSLI4N4aKC@databasepruebas.anpsvma.mongodb.net/prueba');
    console.log("Conectado a la base de datos");
  } catch (error) {
    console.log("Error al conectar a la base de datos", error);
    exit(1);
  }
};
