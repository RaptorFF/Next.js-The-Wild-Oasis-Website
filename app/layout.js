import { Navigation } from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";
// We are importing the Josefin Sans font from Google Fonts using the next/font package.
// This allows us to use the font in our application and ensures that it is loaded efficiently.
import { Josefin_Sans } from "next/font/google";
const josefin = Josefin_Sans({
  subsets: ["latin"],
  display: "swap",
});

// console.log(josefin);

import "@/app/_styles/globals.css";
import Header from "./_components/Header";

// This is the root layout of our application. It wraps all pages and components in the app directory.
// It is used to define the common layout and structure of our application, such as the header, footer,
// and navigation. It also defines the metadata for our application, such as the title and description.
export const metadata = {
  // title: "The Wild Oasis",
  title: {
    default: "Welcome | The Wild Oasis",
    template: "%s | The Wild Oasis",
  },
  description:
    "The Wild Oasis is a paradise for nature lovers and adventure seekers. Explore our cabins, activities, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`bg-primary-950 antialiased text-primary-100 min-h-screen ${josefin.className} flex flex-col relative`}
      >
        <Header />
        <div className="flex-1 px-8 py-12 grid">
          <main className="max-w-7xl mx-auto w-full">{children}</main>
        </div>
      </body>
    </html>
  );
}
