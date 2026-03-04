import Link from "next/link";
import { auth } from "../_lib/auth";

export default async function Navigation() {
  // IMPORTANT: Calling auth() all the pages becoms dynamic
  const session = await auth(); // Ensure the user is authenticated before rendering the navigation
  return (
    <nav className="z-10 text-lg sm:text-xl">
      <ul className="flex flex-col gap-4 sm:flex-row sm:gap-16 items-start sm:items-center">
        <li>
          <Link
            href="/cabins"
            className="hover:text-accent-400 transition-colors"
          >
            Cabins
          </Link>
        </li>
        <li>
          <Link
            href="/about"
            className="hover:text-accent-400 transition-colors"
          >
            About
          </Link>
        </li>
        <li>
          {session?.user?.image ? (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors flex items-center gap-2 sm:gap-4"
            >
              <img
                src={session.user.image}
                alt="User Avatar"
                className="h-8 rounded-full"
                referrerPolicy="no-referrer"
              />
              <span>{session.user.name}</span>
            </Link>
          ) : (
            <Link
              href="/account"
              className="hover:text-accent-400 transition-colors"
            >
              Guest area
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
