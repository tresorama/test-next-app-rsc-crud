import Link from "next/link";

export const AppShell = ({ children }: Readonly<{ children: React.ReactNode; }>) => (
  <div className="flex flex-col min-h-screen">
    <header className="p-4 border-b flex items-center">
      <Link href="/">
        <Logo />
      </Link>
    </header>
    <div className="flex gap-4">
      <aside className="p-4 border">
        <NavLinks />
      </aside>
      <main className="flex-grow p-4 border">
        {children}
      </main>
    </div>
  </div>
);

const Logo = () => (
  <span className="font-medium">Logo</span>
);
const NavLinks = () => (
  <ul>
    <li>
      <Link href="/">Home</Link>
    </li>
    <li>
      <Link href="/posts">Posts</Link>
    </li>
  </ul>
);