'use server'
import Query from "@/models/Query";

interface Schema {
  name: string;
  ddl: string;
  project: string;
}

const base_url = process.env.NEXT_PUBLIC_API_URL;
export const executeQuery = async (query: string, schema: string) => {
  const res = await fetch(`${base_url}/execute_query`, {
    method: "POST",
    body: JSON.stringify({
      query,
      schema,
    }),
  });
  const result = await res.json();
  if (result.error) {
    const newQuery = new Query(result);
    await newQuery.save();
  }
  return result;
};

export const getQueries = async (projectId: string) => {
  const result = await Query.find({ project: projectId });
  return result;
};
