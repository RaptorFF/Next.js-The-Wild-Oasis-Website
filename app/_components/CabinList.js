import { unstable_noStore as noStore } from "next/cache";

import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "../_lib/data-service";

async function CabinList({ filter }) {
  //noStore(); // This tells Next.js not to cache the result of this function, ensuring that it always fetches fresh data on each request.
  // This is useful for components that are static by default but need to fetch dynamic data that changes frequently, such as a list of cabins that might be updated often.
  const cabins = await getCabins();

  if (!cabins.length) return null;

  let dispayCabins;
  if (filter === "all") {
    dispayCabins = cabins;
  }
  if (filter === "small") {
    dispayCabins = cabins.filter((cabin) => cabin.maxCapacity <= 3);
  }
  if (filter === "medium") {
    dispayCabins = cabins.filter(
      (cabin) => cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7,
    );
  }
  if (filter === "large") {
    dispayCabins = cabins.filter((cabin) => cabin.maxCapacity >= 8);
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {dispayCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
