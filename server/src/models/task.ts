import { TaskStruct } from '@/interfaces/task';
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Done'],
        default: 'To Do'
    }
});

export default mongoose.model<TaskStruct & mongoose.Document>('User', TaskSchema);