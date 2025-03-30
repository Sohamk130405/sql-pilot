"use server";
import Query from "@/models/Query";

const base_url = process.env.NEXT_PUBLIC_API_URL;
export const executeQuery = async (query: string, schema: string) => {
  const res = await fetch(`${base_url}/execute_query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sql_query: query,
      schema,
      dialect: "trino",
    }),
  });

  const result = await res.json();
  return result; // Return the parsed JSON object directly
};

export const getQueries = async (projectId: string) => {
  const result = await Query.find({ project: projectId });
  return result;
};
