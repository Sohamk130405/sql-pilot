import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen ">
      <Loader className="animate-spin transition size-5" />
    </div>
  );
}

