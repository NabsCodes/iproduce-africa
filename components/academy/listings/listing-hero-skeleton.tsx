import { Skeleton } from "@/components/ui/skeleton";

export function ListingHeroSkeleton() {
  return (
    <section className="bg-forest-900">
      <div className="max-w-8xl mx-auto w-full px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24 xl:px-10">
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Skeleton className="h-7 w-36 rounded-full bg-white/10" />
          <Skeleton className="mt-5 h-10 w-full max-w-lg rounded-md bg-white/10 sm:h-12" />
          <Skeleton className="mt-5 h-16 w-full rounded-md bg-white/10" />
        </div>
      </div>
    </section>
  );
}
