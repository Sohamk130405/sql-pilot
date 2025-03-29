"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import useDashboardStore from "@/store/dashboard";
import { getProjectsByUser } from "@/actions/projects";
import CreateProjectModal from "@/components/dashboard/create-project-modal";
import { Loader } from "lucide-react";

export default function DashboardPage() {
  const router = useRouter();
  const { setProject } = useDashboardStore();
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const projects = JSON.parse(await getProjectsByUser());
        if (projects.length > 0) {
          setProject(projects[0]);
          router.push(`/dashboard/${projects[0]._id}`);
        } else {
          setShowProjectDialog(true);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, [router, setProject]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen ">
        <Loader className="animate-spin transition size-5" />
      </div>
    );
  }

  return (
    <CreateProjectModal
      open={showProjectDialog}
      setOpen={setShowProjectDialog}
    />
  );
}
