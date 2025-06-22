
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowLeft } from "lucide-react";


const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
    
      
      <main className="flex-grow flex items-center justify-center py-16">
        <div className="text-center max-w-md px-4">
          <h1 className="text-5xl font-bold mb-4">404</h1>
          <p className="text-xl text-muted-foreground mb-6">Page not found</p>
          <div className="mb-8 pb-6 border-b">
            <p className="text-sm text-muted-foreground mb-2">
              The page you're looking for doesn't exist or has been moved.
            </p>
            <div className="text-xs text-left bg-muted/50 p-3 rounded-md mt-4 overflow-x-auto">
              <p className="font-mono">Attempted path: {location.pathname}</p>
            </div>
          </div>
          <div className="space-y-4">
            <Link to="/">
              <Button variant="default" className="w-full">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Return to Home
              </Button>
            </Link>
            <Link to="/services">
              <Button variant="outline" className="w-full">
                View All Services
              </Button>
            </Link>
          </div>
        </div>
      </main>
      
      
    </div>
  );
};

export default NotFound;