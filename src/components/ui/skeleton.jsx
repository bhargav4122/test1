import React from "react";
import { cn } from "@/lib/utils"; // Make sure you have this utility file

const Skeleton = ({
  className,
  ...props
}) => (
  <div
    className={cn(
      "animate-pulse rounded-md bg-muted",
      className
    )}
    {...props}
  />
);

export { Skeleton };