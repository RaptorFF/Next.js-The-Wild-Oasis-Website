import { Navigation } from "./components/Navigation";
import Logo from "./Logo";

// This is the root layout of our application. It wraps all pages and components in the app directory.
// It is used to define the common layout and structure of our application, such as the header, footer,
// and navigation. It also defines the metadata for our application, such as the title and description.
export const metadata = {
  title: "The Wild Oasis",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
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
