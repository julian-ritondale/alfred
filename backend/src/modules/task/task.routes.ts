import { Router } from 'express';
import { getTasks, createTask, updateTask, deleteTask, summarizeTask } from './task.controller.ts';

const router = Router();

router.get('/', getTasks);
router.post('/', createTask);
router.put('/:id', updateTask);
router.delete('/:id', deleteTask);
router.post('/:id/summary', summarizeTask);

export default router;
