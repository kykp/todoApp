import mongoose, { Schema } from "mongoose";
const TaskSchema = new Schema({
    id: { type: String, require: true, unique: true },
    title: { type: String },
    status: { type: String },
    project: { type: String },
    archive: { type: Boolean },
    deleted: { type: Boolean },
});
export default mongoose.model("Task", TaskSchema);
