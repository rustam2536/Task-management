import { Router } from 'express';
import task from './routes/task_route';

// guaranteed to get dependencies
export default () => {
	const app = Router();
	task(app);

	return app
}