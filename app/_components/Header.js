import NavigationWrapper from "@/app/_components/Navigation";
import Logo from "@/app/_components/Logo";

function Header() {
  return (
    <header className="border-b border-primary-900 px-4 py-3 sm:px-8 sm:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center max-w-7xl mx-auto">
        <Logo />
        <NavigationWrapper />
      </div>
    </header>
  );
}

export default Header;
