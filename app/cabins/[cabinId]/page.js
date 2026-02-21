import { getCabin, getCabins } from "@/app/_lib/data-service";
import Reservation from "@/app/_components/Reservation";
import { Suspense } from "react";
import Loading from "../loading";
import Cabin from "@/app/_components/Cabin";

// export const metadata = {
//   title: "Cabin Details",
// };

export async function generateMetadata({ params }) {
  const cabin = await getCabin(params.cabinId);
  return {
    title: `Cabin ${cabin.name} Details`,
  };
}
//In Next.js 13, when you have a dynamic route (like [cabinId].js), you can use the generateStaticParams function to specify which dynamic routes should be pre-rendered at build time. This is particularly useful for improving performance and SEO, as it allows Next.js to generate static HTML for those routes instead of rendering them on the fly.
export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({
    cabinId: cabin.id.toString(),
  }));
  return ids;
}

export default async function Page({ params }) {
  //Whenever we navigate to a dynamic route, Next.js provides us with a params object that contains the dynamic segments of the URL. In this case, since our file is named [cabinId].js, we can access the cabinId parameter from the params object. This allows us to fetch and display data specific to the cabin that corresponds to the cabinId in the URL.
  //console.log(params);
  const cabin = await getCabin(params.cabinId);

  return (
    <div className="max-w-6xl mx-auto mt-8">
      <Cabin cabin={cabin} />
      <div>
        <h2 className="text-5xl font-semibold text-center text-accent-400 mb-10">
          Reserve {cabin.name} today. Pay on arrival.
        </h2>
        {/* Suspense here allows us to show a loading state while the Reservation component is being loaded, while rest of the page (like the Cabin details) is already visible to the user. */}
        <Suspense fallback={<Loading />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </div>
  );
}
