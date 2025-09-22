// src/components/TeamButton.tsx
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

export function TeamsButton({
  className = "",
  variant = "default"
}: {
  className?: string;
  variant?: "default" | "outline" | "secondary";
}) {
  const navigate = useNavigate();

  return (
    <Button
      size="lg"
      variant={variant}
      className={cn(
        "hover:scale-[1.02] transition-transform shadow-lg hover:shadow-primary/30 group",
        className
      )}
      //onClick={() => navigate('/teamAndCareersPage')}
      onClick={() => navigate('/care')}
    >
    
      Join Our Team
      <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Button>
  );
}
