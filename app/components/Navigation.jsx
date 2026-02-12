import Link from "next/link";

export function Navigation() {
  return (
    <ul className="flex flex-row gap-x-4">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/account">Account</Link>
      </li>
      <li>
        <Link href="/cabins">Cabins</Link>
      </li>
      <li>
        <Link href="/about">About</Link>
      </li>
    </ul>
  );
}
