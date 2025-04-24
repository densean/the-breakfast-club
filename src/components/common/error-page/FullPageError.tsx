import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";

interface FullPageErrorProps {
  message?: string;
  redirectLink: string;
  redirectMessage: string;
}

export default function FullPageError({
  message,
  redirectLink,
  redirectMessage,
}: FullPageErrorProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-red-900 px-4">
      <div className="flex items-center space-x-4 mb-6">
        <AlertTriangle size={40} className="text-red-500" />
        <h1 className="text-3xl font-semibold">Oops!</h1>
      </div>
      <p className="text-lg mb-4 text-center max-w-md">
        {message || "Something went wrong. Please try again."}
      </p>
      <Button variant="outline" onClick={() => navigate({ to: redirectLink })}>
        {redirectMessage}
      </Button>
    </div>
  );
}
