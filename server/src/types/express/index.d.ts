import { Document, Model } from 'mongoose';
import { TaskStruct } from '@/interfaces/task';
declare global {
  namespace Express {  
  }

  namespace Models {
    export type TaskModel = Model<TaskStruct & Document>;
  }
}
