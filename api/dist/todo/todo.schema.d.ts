import * as mongoose from 'mongoose';
export declare const TodoSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}>;
