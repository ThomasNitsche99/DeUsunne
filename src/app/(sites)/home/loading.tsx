"use client";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="flex h-[600px] justify-center items-center container ">
      <div className="flex items-center">
        <div className="space-y-2">
          <Skeleton className="h-[600px] w-[500px]" />
        </div>
      </div>
    </div>
  );
}
