import { Router } from "express";
import { body, param } from "express-validator";
import { ProjectController } from "../Controllers/ProjectController";
import { TaskController } from "../Controllers/TaskController";
import { handleInputError } from "../middleware/validatro";
import { ValidateProjectExist } from "../middleware/project";
import { ValidateTaskExist, hasAuthorization, taskBelongsToProject } from "../middleware/task";
import { authenticate } from "../middleware/auth";
import { TeamMember } from "../Controllers/TeamController";
const router = Router();

// Route de proyectos
router.use(authenticate);

  router.get("/",  authenticate,ProjectController.getProjects);
router.get(
  "/:id",
  param("id").isMongoId().withMessage("el id del proyecto debe ser valida"),
  handleInputError,
  ProjectController.getProjectById
);
router.post(
  "/",
  authenticate,
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

// rutas para la miembros de proyecto

router.post(
  "/:projectid/team/find",
  body("email").isEmail().withMessage("el email del usuario debe ser valido"),
  handleInputError,
  TeamMember.findMember
);

router.post(
  "/:projectid/team",
  body("id").isMongoId().withMessage("el id del proyecto debe ser valida"),
  handleInputError,
  TeamMember.addTeamMember
);

router.delete( "/:projectid/team/:id",
param("id").isMongoId().withMessage("el id del proyecto debe ser valida"),
handleInputError,
TeamMember.deleteTeamMember)

router.get( "/:projectid/team",
  TeamMember.getTeamMembers
)















// rutas para la miembros de proyecto

router.put(
  "/:id",
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
  ProjectController.updateProject
);
router.delete("/:id", ProjectController.deleteProject);

//  Route de tareas

router.param("projecid", ValidateProjectExist);
router.post(
  "/:projecid/tasks",
  body("name").notEmpty().withMessage("el nombre de la tarea es requerido"),

  body("description")
    .notEmpty()
    .withMessage("la descripción de la tarea es requerida"),
  handleInputError,
  TaskController.createTask
);

router.get("/:projecid/tasks", TaskController.getProjectTasks);
router.get(
  "/:projecid/tasks/:taskid",
  param("taskid").isMongoId().withMessage("el id de la tarea debe ser valida"),
  TaskController.getTaskById
);
router.param("taskid", ValidateTaskExist);
router.param("taskid", taskBelongsToProject);
router.put(
  "/:projecid/tasks/:taskid",
  hasAuthorization,
  param("taskid").isMongoId().withMessage("el id de la tarea debe ser valida"),
  TaskController.updateTask
);
router.delete(
  "/:projecid/tasks/:taskid",
  hasAuthorization,
  param("taskid").isMongoId().withMessage("el id de la tarea debe ser valida"),
  TaskController.deleteTask
);
router.post(
  "/:projecid/tasks/:taskid/status",
  param("taskid").isMongoId().withMessage("el id de la tarea debe ser valida"),
  body("status").notEmpty().withMessage("el estado de la tarea es requerido"),

  handleInputError,
  TaskController.changeTaskStatus
);

export default router;
