import { ContentCardSkeleton } from "@/components/academy/listings/content-card-skeleton";
import { Skeleton } from "@/components/ui/skeleton";

/** Shared skeleton for Academy slug detail pages — blog, webinars, courses. */
export function AcademyDetailSkeleton() {
  return (
    <>
      <section className="bg-white pt-10 sm:pt-12 lg:pt-16">
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <Skeleton className="aspect-video w-full rounded-xl lg:aspect-21/9" />
        </div>
      </section>

      <section className="bg-white py-8 sm:py-10 lg:py-12">
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <div className="grid gap-10 lg:grid-cols-[1fr_320px] lg:gap-12 xl:gap-16">
            <div className="min-w-0">
              <div className="mb-6 flex flex-col gap-4 sm:mb-8">
                <Skeleton className="h-4 w-32" />
                <div className="flex flex-wrap gap-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-24 rounded-full" />
                </div>
                <Skeleton className="h-10 w-full max-w-3xl sm:h-12" />
              </div>
              <div className="mt-2 flex max-w-3xl flex-col gap-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-4 w-full" />
                ))}
              </div>
            </div>

            <aside className="flex flex-col gap-6">
              <Skeleton className="h-64 w-full rounded-xl" />
            </aside>
          </div>
        </div>
      </section>

      <section className="bg-subtle py-14 sm:py-16 lg:py-20">
        <div className="max-w-8xl mx-auto w-full px-4 sm:px-6 lg:px-8 xl:px-10">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="mt-3 h-8 w-64" />
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {Array.from({ length: 3 }).map((_, index) => (
              <ContentCardSkeleton key={index} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
