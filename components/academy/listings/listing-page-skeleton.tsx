import { ContentCardSkeleton } from "@/components/academy/listings/content-card-skeleton";
import { ListingHeroSkeleton } from "@/components/academy/listings/listing-hero-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

type ListingPageSkeletonProps = {
  cardCount?: number;
};

/** Webinars / Courses listing — hero + card grid. */
export function ListingPageSkeleton({
  cardCount = 6,
}: ListingPageSkeletonProps) {
  return (
    <>
      <ListingHeroSkeleton />
      <section className="bg-white py-14 sm:py-16 lg:py-20">
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="mb-10 flex gap-2 sm:mb-12">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-24 rounded-full" />
            ))}
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {Array.from({ length: cardCount }).map((_, index) => (
              <ContentCardSkeleton key={index} />
            ))}
          </div>
          <div className="mt-10 flex flex-col items-center gap-3 sm:mt-12">
            <Skeleton className="h-12 w-36 rounded-md" />
            <Skeleton className="h-4 w-44" />
          </div>
        </div>
      </section>
    </>
  );
}
