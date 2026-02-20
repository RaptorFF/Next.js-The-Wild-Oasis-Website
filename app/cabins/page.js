import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";
import Filter from "../_components/Filter";

// export const revalidate = 0; // Disable caching for this page, so it always fetches fresh data on each request.
// Cache the page for 1 hour (3600 seconds). After that, the next request will trigger a revalidation and fetch fresh data.
// becaouse of search params, this page is now dynamic, therefore no need for revalidate
export const revalidate = 3600;

export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all"; // Get the 'capacity' query parameter from the URL, or default to "all" if it's not provided.

  return (
    <div>
      <h1 className="text-4xl mb-5 text-accent-400 font-medium">
        Our Luxury Cabins
      </h1>
      <p className="text-primary-200 text-lg mb-10">
        Cozy yet luxurious cabins, located right in the heart of the Italian
        Dolomites. Imagine waking up to beautiful mountain views, spending your
        days exploring the dark forests around, or just relaxing in your private
        hot tub under the stars. Enjoy nature's beauty in your own little home
        away from home. The perfect spot for a peaceful, calm vacation. Welcome
        to paradise.
      </p>
      <div className="flex justify-end mb-8">
        <Filter />
      </div>

      {/* The CabinList component is wrapped in Suspense to show a loading spinner while the data is being fetched. */}
      <Suspense fallback={<Spinner />} key={filter}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
