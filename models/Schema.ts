import mongoose, { Document, Types } from "mongoose";

export interface ISchema extends Document {
  name: string;
  ddl: string;
  project: Types.ObjectId;
}

const schemaSchema = new mongoose.Schema<ISchema>(
  {
    name: { type: String, required: true, minlength: 3 },
    ddl: { type: String, required: true },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
  },
  { timestamps: true }
);

const Schema =
  mongoose.models.Schema || mongoose.model<ISchema>("Schema", schemaSchema);
export default Schema;
