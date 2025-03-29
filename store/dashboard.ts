import { create } from "zustand";

interface Connection {
  dialect: "Trino" | "Spark";
  host: string;
  port: number;
}

interface Project {
  id: string;
  title: string;
}

interface DashboardState {
  connection: Connection;
  project: Project | null;
  setConnection: (connection: Connection) => void;
  setProject: (project: Project) => void;
}

const useDashboardStore = create<DashboardState>((set) => ({
  connection: {
    dialect: "Trino",
    host: "localhost",
    port: 4032,
  },
  project: null,
  setConnection: (connection) => set(() => ({ connection })),
  setProject: (project) => set(() => ({ project })),
}));

export default useDashboardStore;
