import Link from "next/link";
import { HeaderNavLinks } from "./header-nav-links";

export const AppShell = ({ children }: Readonly<{ children: React.ReactNode; }>) => (
  <div className="h-screen flex flex-col">
    <header className="p-4 border-b flex gap-12 items-center">
      <Link href="/">
        <Logo />
      </Link>
      <HeaderNavLinks />
    </header>
    <div className="min-h-0 flex-grow p-4">
      {children}
    </div>
  </div>
);

const Logo = () => (
  <span className="font-medium text-sm uppercase">Logo</span>
);
