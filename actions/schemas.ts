import Schema, { ISchema } from "@/models/Schema";

interface Schema {
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

export const saveSchema = async (schema: Schema) => {
  const newSchema = new Schema(schema);
  await newSchema.save();
};

export const getSchemas = async (projectId: string) => {
  const data = await Schema.find({ project: projectId });
  return data;
};
