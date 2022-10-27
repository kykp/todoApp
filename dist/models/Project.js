import mongoose, { Schema } from "mongoose";
const ProjetSchema = new Schema({
    project: { type: String },
    id: { type: String, require: true, unique: true },
    archive: { type: Boolean },
    deleted: { type: Boolean },
    weight: { type: Number },
});
export default mongoose.model("Project", ProjetSchema);
