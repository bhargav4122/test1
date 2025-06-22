import {
    Dialog as DialogPrimitive, // Use the alias pattern
    DialogContent,
    DialogHeader,
    DialogTitle,
  } from "@/components/ui/dialog";
  import { Check, ArrowRight, CheckCircle } from "lucide-react";
  import { Badge } from "@/components/ui/badge";
  import { ComponentProps } from "react"; // Import ComponentProps
  
  // --- Interfaces (Define them once) ---
  interface Project {
    client: string;
    description: string[];
    duration: string;
    result?: string;
    location: string;
  }
  
  interface Specializations {
    [key: string]: string[];
  }
  
  interface Service {
    id: string;
    title: string;
    description: string;
    icon: string; // Keep the icon field, you might want to use it later
    technologies: string[];
    specializations?: Specializations;
    projects?: {
      completed: Project[];
    };
  }
  
  // --- Prop Types using the DialogPrimitive ---
  type DialogProps = ComponentProps<typeof DialogPrimitive>;
  
  // Define props based on the primitive's props
  interface ServiceDetailDialogProps extends Pick<DialogProps, 'open' | 'onOpenChange'> {
    service: Service;
  }
  
  // --- Component Definition (Use the second version's structure) ---
  export function ServiceDetailDialog({
    service,
    open,         // Use 'open'
    onOpenChange  // Use 'onOpenChange'
  }: ServiceDetailDialogProps) {
    return (
      // Use the aliased DialogPrimitive and the correct props
      <DialogPrimitive open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary">
                {/* TODO: Replace with your actual icon component based on service.icon */}
                {/* Example: <YourIconComponent name={service.icon} className="h-6 w-6" /> */}
                <div className="h-6 w-6" /> {/* Placeholder */}
              </div>
              <DialogTitle>{service.title}</DialogTitle>
            </div>
          </DialogHeader>
  
          <div className="space-y-6 py-4">
            <div>
              <h3 className="font-medium mb-2">Service Overview</h3>
              <p className="text-sm text-muted-foreground">{service.description}</p>
            </div>
  
            {service.specializations && (
              <div>
                <h3 className="font-medium mb-2">Our Specializations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(service.specializations).map(([title, items]) => (
                    <div key={title} className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium mb-2">{title}</h4>
                      <ul className="space-y-1">
                        {items.map((item, i) => (
                          <li key={i} className="flex items-start">
                            <Check className="h-4 w-4 text-primary mt-0.5 mr-2 flex-shrink-0" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}
  
            <div>
              <h3 className="font-medium mb-2">Technologies We Use</h3>
              <div className="flex flex-wrap gap-2">
                {service.technologies.map((tech, i) => (
                  <Badge key={i} variant="outline" className="py-1 px-3">
                    {tech}
                  </Badge>
                ))}
              </div>
            </div>
  
            {service.projects?.completed && service.projects.completed.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Project Highlights</h3>
                <div className="space-y-4">
                  {/* Slice is good practice to limit displayed items */}
                  {service.projects.completed.slice(0, 2).map((project, i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <h4 className="text-sm font-medium">{project.client}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {project.location} • {project.duration}
                      </p>
                      <ul className="mt-2 space-y-1">
                        {project.description.map((desc, j) => (
                          <li key={j} className="flex items-start">
                            <ArrowRight className="h-3 w-3 text-primary mt-1 mr-2 flex-shrink-0" />
                            <span className="text-sm">{desc}</span>
                          </li>
                        ))}
                      </ul>
                      {project.result && (
                        <div className="mt-2 flex items-center text-sm font-medium text-green-600">
                          <CheckCircle className="h-4 w-4 mr-1" />
                          {project.result}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </DialogPrimitive>
    );
  }