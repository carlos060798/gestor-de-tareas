import   {Router} from 'express';
import { ProjectController } from '../Controllers/ProjectController';

const router = Router();

// Route
router.get('/', ProjectController.getProject);
router.post('/', ProjectController.createProject);
router.put('/:id', ProjectController.updateProject);
router.delete('/:id', ProjectController.deleteProject);


export default router;