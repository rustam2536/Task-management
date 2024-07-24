import { Service, Inject } from 'typedi';
import { Request, Response } from 'express';
import { TaskStruct } from '@/interfaces/task';

@Service()
export default class TaskService {
  constructor(
    @Inject('taskModel') private taskModel: Models.TaskModel,
    @Inject('logger') private logger,
  ) {
  }

  // Get all tasks
  public async getTasks(req: Request, res: Response)
    : Promise<{ message: string | TaskStruct[], success: boolean }> {
    try {
      const tasks: TaskStruct[] = await this.taskModel.find();
      return { message: tasks, success: true };
    } catch (e) {
      this.logger.error(e.message);
      return { message: e.message, success: false };
    }
  };

  // Create a new task
  public async createTask(req: Request, res: Response)
    : Promise<{ message: string | TaskStruct, success: boolean }> {
    const { title, description, status } = req.body;

    const task = new this.taskModel({
      title,
      description,
      status
    });

    try {
      const newTask = await task.save();
      return { message: newTask, success: true };
    } catch (e) {
      this.logger.error(e.message);
      return { message: e.message, success: false };
    }
  };

  // Update a task
  public async updateTask(req: Request, res: Response)
    : Promise<{ message: string | TaskStruct, success: boolean }> {
    try {
      const task = await this.taskModel.findById(req.params.id);
      if (!task) {
        return { message: 'Task not found', success: false };
      }

      task.title = req.body.title || task.title;
      task.description = req.body.description || task.description;
      task.status = req.body.status || task.status;

      const updatedTask = await task.save();
      return { message: updatedTask, success: true };
    } catch (e) {
      this.logger.error(e.message);
      return { message: e.message, success: false };
    }
  };

  // Delete a task
  public async deleteTask(req: Request, res: Response)
    : Promise<{ message: string, success: boolean }> {
    try {
      const task = await this.taskModel.findById(req.body.id);
      if (!task) {
        return { message: "Task doesn't exists.", success: false };
      }

      await this.taskModel.deleteOne({ _id: req.body.id });

      return { message: "Task deleted successfully.", success: true };
    } catch (e) {
      this.logger.error(e.message);
      return { message: e.message, success: false };
    }
  };
}
