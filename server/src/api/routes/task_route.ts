import { TaskStruct } from '@/interfaces/task';
import TaskService from '@/services/taskController';
import { Joi, celebrate } from 'celebrate';
import { Router, Request, Response } from 'express';
import Container from 'typedi';
const route = Router();

export default (app: Router) => {

  app.use('/tasks', route);

  route.post('/create_task', celebrate({
    body: Joi.object().keys({
      title: Joi.string().required(),
      description: Joi.string().allow(""),
      status: Joi.string()
    })
  }),
    async (req: Request, res: Response) => {
      const result: { message: string | TaskStruct, success: boolean } = await Container.get(TaskService)
        .createTask(req, res);
      return res.status(200).json(result);
    }
  );


  route.get('/get_tasks', async (req: Request, res: Response) => {
    const result: { message: string | TaskStruct[], success: boolean } = await Container.get(TaskService)
      .getTasks(req, res);
    return res.status(200).json(result);
  });


  route.put('/update_task/:id', celebrate({
    body: Joi.object().keys({
      title: Joi.string(),
      description: Joi.string(),
      status: Joi.string()
    })
  }),
    async (req: Request, res: Response) => {
      const result: { message: string | TaskStruct, success: boolean } = await Container.get(TaskService)
        .updateTask(req, res);
      return res.status(200).json(result);
    }
  );


  route.delete('/delete_task', celebrate({
    body: Joi.object().keys({
      id: Joi.string().required(),
    })
  }), async (req: Request, res: Response) => {
    const result: { message: string, success: boolean } = await Container.get(TaskService)
      .deleteTask(req, res);
    return res.status(200).json(result);
  });
};
