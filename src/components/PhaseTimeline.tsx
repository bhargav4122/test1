// components/project/PhaseTimeline.tsx
'use client';

import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export interface Phase {
  name: string;
  progress?: number;
  completed?: boolean;
  current?: boolean;
  description?: string;
  date?: string;
}

export interface Timeline {
  phases: Phase[];
  currentProgress: number;
}

interface PhaseTimelineProps {
  timeline: Timeline;
}

export const PhaseTimeline = ({ timeline }: PhaseTimelineProps) => {
     // Return null if no timeline data
  if (!timeline?.phases?.length) return null;
  const phases = timeline.phases;
  const completedPhases = timeline.phases.filter(phase => phase.completed);
  const highestCompletedProgress = completedPhases.length > 0 
    ? Math.max(...completedPhases.map(phase => phase.progress || 0)) 
    : 0;

  return (
    <div className="relative">
      {/* Vertical connector line */}
      <div className="absolute left-[11px] top-0 h-full w-0.5 bg-gray-200 dark:bg-gray-700 z-0">
        <div 
          className="absolute top-0 left-0 w-0.5 bg-primary transition-all duration-700 ease-out z-0" 
          style={{ height: `${highestCompletedProgress}%` }}
        />
      </div>

      {/* Timeline phases */}
      <div className="space-y-6 pl-8 relative z-10">
        {timeline.phases.map((phase, index) => {
          const isCurrent = phase.current;
          const isCompleted = phase.completed;
          const isUpcoming = !isCompleted && !isCurrent;

          return (
            <div key={index} className="relative">
              {/* Phase dot indicator */}
              <div className={`
                absolute -left-8 top-1 w-3 h-3 rounded-full border-2 z-10
                ${isCompleted ? 'bg-primary border-primary' : 
                  isCurrent ? 'border-primary bg-background animate-pulse' : 
                  'border-gray-300 bg-background dark:border-gray-600'}
              `} />

              {/* Phase content */}
              <div className={`
                p-3 rounded-lg transition-all
                ${isCurrent ? 'bg-primary/10 border border-primary/20' : 
                 'hover:bg-accent/50'}
              `}>
                <div className={`flex items-start justify-between ${isCompleted ? 'text-primary' : ''}`}>
                  <div>
                    <h4 className={`font-medium ${isCurrent ? 'text-primary' : ''}`}>
                      {phase.name}
                    </h4>
                    {phase.description && (
                      <p className="text-sm text-muted-foreground mt-1">
                        {phase.description}
                      </p>
                    )}
                  </div>
                  {phase.date && (
                    <span className="text-xs text-muted-foreground whitespace-nowrap ml-2">
                      {phase.date}
                    </span>
                  )}
                </div>

                {isCurrent && (
                  <Badge 
                    variant="outline" 
                    className="mt-2 text-xs bg-primary/10 border-primary/30 text-primary"
                  >
                    In Progress
                  </Badge>
                )}

                {isCurrent && phase.progress && (
                  <div className="mt-2 space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Phase Completion</span>
                      <span>{phase.progress}%</span>
                    </div>
                    <div className="h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary rounded-full transition-all duration-500" 
                        style={{ width: `${phase.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};