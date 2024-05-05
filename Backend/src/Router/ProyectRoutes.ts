import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../Controllers/ProjectController";
import { TaskController } from "../Controllers/TaskController";
import { handleInputError } from "../middleware/validatro";


const router = Router();

// Route de proyectos
router.get("/", ProjectController.getProjects);
router.get("/:id",
    param("id").isMongoId().withMessage("el id del proyecto debe ser valida")
    ,
    handleInputError,
    ProjectController.getProjectById);
router.post(
    "/",
    body("projectName")
        .notEmpty()
        .withMessage("el nombre del proyecto es requerido"),
    body("clientName")
        .notEmpty()
        .withMessage("el nombre del cliente es requerido"),
    body("description")
        .notEmpty()
        .withMessage("la descripción del proyecto es requerida"),
    handleInputError,
    ProjectController.createProject
);
router.put("/:id",
param("id").isMongoId().withMessage("el id del proyecto debe ser valida"),
body("projectName")
.notEmpty()
.withMessage("el nombre del proyecto es requerido"),
body("clientName")
.notEmpty()
.withMessage("el nombre del cliente es requerido"),
body("description")
.notEmpty()
.withMessage("la descripción del proyecto es requerida"),
handleInputError,
ProjectController.updateProject);
router.delete("/:id", ProjectController.deleteProject);


//  Route de tareas
router.post("/:projecid/tasks", TaskController.createTask);
















export default router;
