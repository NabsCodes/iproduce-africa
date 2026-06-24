import { ContentCardSkeleton } from "@/components/academy/listings/content-card-skeleton";
import { ListingHeroSkeleton } from "@/components/academy/listings/listing-hero-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

export function BlogListingSkeleton() {
  return (
    <>
      <ListingHeroSkeleton />
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="mb-10 grid gap-8 lg:grid-cols-2 lg:items-center">
            <Skeleton className="aspect-5/4 w-full rounded-xl lg:aspect-4/3" />
            <div className="flex flex-col gap-3">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-20 w-full" />
            </div>
          </div>
          <div className="mb-10 flex gap-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-24 rounded-full" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <ContentCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
