import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../Controllers/ProjectController";
import { TaskController } from "../Controllers/TaskController";
import { handleInputError } from "../middleware/validatro";
import { ValidateProjectExist } from "../middleware/project";


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
router.post(
  "/:projecid/tasks",
  ValidateProjectExist,
  body("name").notEmpty().withMessage("el nombre de la tarea es requerido"),

  body("description")
    .notEmpty()
    .withMessage("la descripción de la tarea es requerida"),
  handleInputError,
  TaskController.createTask
);

router.get("/:projecid/tasks", ValidateProjectExist, TaskController.getProjectTasks);
router.get("/:projecid/tasks/:taskid", ValidateProjectExist, TaskController.getTaskById);


















export default router;
