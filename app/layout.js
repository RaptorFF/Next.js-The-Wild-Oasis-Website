import { Navigation } from "@/app/_components/Navigation";
import Logo from "@/app/Logo";

import "@/app/_styles/globals.css";

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
      <body className="bg-primary-950 text-primary-100 min-h-screen">
        <header>
          <Logo />
          <Navigation />
        </header>
        <main>{children}</main>
        <footer>Copyright ©️ {new Date().getFullYear()} The Wild Oasis</footer>
      </body>
    </html>
  );
}
