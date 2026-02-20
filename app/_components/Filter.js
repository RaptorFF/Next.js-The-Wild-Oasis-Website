"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams(); // Get the current search parameters from the URL.
  const router = useRouter(); // Get the router object to programmatically navigate or update the URL.
  const pathname = usePathname(); // Get the current pathname (the part of the URL before the query parameters).

  const activeFilter = searchParams.get("capacity") ?? "all"; // Get the current 'capacity' filter from the search parameters, or default to "all" if it's not set.

  function handleFilter(filter) {
    const params = new URLSearchParams(searchParams); // Create a new URLSearchParams object based on the current search parameters, so we can modify it without affecting the original.
    params.set("capacity", filter); // Update the 'capacity' query parameter to the selected filter value.
    router.replace(`${pathname}?${params.toString()}`, { scroll: false }); // Update the URL with the new query parameters without reloading the page. The { scroll: false } option prevents the page from scrolling to the top when the URL changes.
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter="small"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        2&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, handleFilter, activeFilter, children }) {
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter ? "bg-primary-700 text-primary-50" : ""
      }`}
      onClick={() => handleFilter(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
