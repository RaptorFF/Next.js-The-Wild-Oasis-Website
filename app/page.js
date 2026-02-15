import Link from "next/link";
import Image from "next/image";
import backgroundImage from "@/public/bg.png";

export default function Home() {
  return (
    <main className="mt-24">
      <Image
        className="object-cover object-top" //object-cover makes sure the image covers the entire area, object-top makes sure the top of the image is visible
        src={backgroundImage}
        alt="Mountains and forests with two cabins"
        fill // makes the image fill the parent container, which is the main element in this case
        placeholder="blur" // adds a blur effect while the image is loading, improving perceived performance
        quality={80} // reduces the quality of the image to 80%, which can significantly reduce file size and improve loading times without a noticeable loss in visual quality
      />

      <div className="relative z-10 text-center">
        <h1 className="text-8xl text-primary-50 mb-10 tracking-tight font-normal">
          Welcome to paradise.
        </h1>
        <Link
          href="/cabins"
          className="bg-accent-500 px-8 py-6 text-primary-800 text-lg font-semibold hover:bg-accent-600 transition-all"
        >
          Explore luxury cabins
        </Link>
      </div>
    </main>
  );
}
