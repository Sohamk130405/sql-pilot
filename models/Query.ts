import mongoose, { Schema, Document, Types } from "mongoose";

export interface IQuery extends Document {
  data: string;
  project: Types.ObjectId;
  schemaId: Types.ObjectId;
  error: string;
  success: string;
}

const QuerySchema = new Schema<IQuery>(
  {
    data: { type: String },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      required: true,
    },
    schemaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Schema",
      required: true,
    },
    error: { type: String },
    success: { type: String },
  },
  { timestamps: true }
);

const Query =
  mongoose.models.Query || mongoose.model<IQuery>("Query", QuerySchema);
export default Query;
