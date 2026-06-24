import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function ContentCardSkeleton() {
  return (
    <Card className="border-border bg-subtle gap-0 rounded-xl border p-4 shadow-none">
      <CardContent className="flex flex-col p-0">
        <Skeleton className="aspect-4/3 w-full rounded-xl" />
        <div className="mt-3 flex flex-wrap gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-20 rounded-full" />
        </div>
        <Skeleton className="mt-3 h-6 w-4/5" />
        <Skeleton className="mt-2 h-4 w-full" />
        <Skeleton className="mt-2 h-4 w-2/3" />
      </CardContent>
    </Card>
  );
}
