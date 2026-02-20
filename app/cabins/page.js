import { Suspense } from "react";
import CabinList from "../_components/CabinList";
import Spinner from "../_components/Spinner";

// export const revalidate = 0; // Disable caching for this page, so it always fetches fresh data on each request.
export const revalidate = 3600; // Cache the page for 1 hour (3600 seconds). After that, the next request will trigger a revalidation and fetch fresh data.

export const metadata = {
  title: "Cabins",
};

export default function Page({ searchParams }) {
  const filter = searchParams?.capacity ?? "all"; // Get the 'capacity' query parameter from the URL, or default to "all" if it's not provided.
  const filterOptions = [
    { label: "All", value: "all" },
    { label: "Small", value: "small" },
    { label: "Medium", value: "medium" },
    { label: "Large", value: "large" },
  ];
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

      {/* Filter Buttons aligned right */}
      <div className="flex justify-end mb-8">
        <div className="flex gap-3">
          {filterOptions.map((option) => (
            <a
              key={option.value}
              href={
                option.value === "all"
                  ? "/cabins"
                  : `/cabins?capacity=${option.value}`
              }
              className={`px-4 py-2 rounded font-medium border transition-colors duration-150
                ${filter === option.value ? "bg-accent-500 text-primary-800 border-accent-500" : "bg-primary-900 text-primary-200 border-primary-700 hover:bg-primary-800"}`}
              aria-current={filter === option.value ? "page" : undefined}
            >
              {option.label}
            </a>
          ))}
        </div>
      </div>

      {/* The CabinList component is wrapped in Suspense to show a loading spinner while the data is being fetched. */}
      <Suspense fallback={<Spinner />}>
        <CabinList filter={filter} />
      </Suspense>
    </div>
  );
}
