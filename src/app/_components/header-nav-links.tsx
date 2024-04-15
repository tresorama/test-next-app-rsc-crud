'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

export const HeaderNavLinks = () => {
  const pathname = usePathname();
  const isActive = (itemUrl: string) => {
    if (itemUrl === '/') return itemUrl === pathname;
    if (pathname.startsWith(itemUrl)) return true;
    return false;
  };

  return (
    <ul className="flex gap-4">
      {[
        { url: "/", label: "Home" },
        { url: "/posts", label: "Posts" },
        { url: "/gallery", label: "Gallery" },
      ].map(({ url, label }) => (
        <li key={url + label}>
          <Link
            href={url}
            className={cn(
              "py-1 px-2 font-medium rounded text-neutral-900 hover:bg-neutral-200  dark:text-neutral-50 dark:hover:bg-neutral-600", {
              "bg-neutral-200 dark:bg-neutral-700": isActive(url),
            })}
          >
            {label}
          </Link>
        </li>
      ))}
    </ul>
  );
};