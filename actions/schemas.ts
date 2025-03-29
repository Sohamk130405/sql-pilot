"use server";
import SchemaModel from "@/models/Schema"; // Renamed to avoid conflict
import { Types } from "mongoose";

export interface SchemaType {
  _id?: string;
  name: string;
  ddl: string;
  project: string;
}

const base_url = process.env.NEXT_PUBLIC_API_URL;

export const generateSchema = async (query: string) => {
  const res = await fetch(`${base_url}/generate_schema`, {
    method: "POST",
    body: JSON.stringify({
      business_description: query,
    }),
  });
  const data = await res.json();
  return data;
};

export const saveSchema = async (schema: SchemaType) => {
  const newSchema = new SchemaModel(schema);
  await newSchema.save();
};

export const getSchemas = async (projectId: string) => {
  const data = await SchemaModel.find({
    project: projectId,
  });

  return JSON.stringify(data);
};
