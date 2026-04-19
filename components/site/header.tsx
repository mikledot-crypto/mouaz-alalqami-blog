"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/seo";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/about", label: "من نحن" },
  { href: "/search", label: "البحث" },
  { href: "/contact", label: "اتصل بنا" },
  { href: "/dashboard", label: "التحكم" }
];

export function SiteHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const current = navItems.find((item) => item.href === pathname)?.label ?? "الرئيسية";

  return (
    <header className="sticky top-0 z-50 border-b border-stone-200/80 bg-stone-50/90 backdrop-blur-xl dark:border-zinc-800/60 dark:bg-zinc-950/70">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-20 items-center justify-between">
          <div className="flex flex-1 justify-start lg:hidden">
            <button
              onClick={() => setIsOpen((value) => !value)}
              className="rounded-full border border-stone-300 px-4 py-2 text-sm text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
            >
              {current}
            </button>
          </div>

          <div className="flex flex-1 justify-center">
            <Link
              href="/"
              className="font-noto-kufi text-3xl font-black tracking-tight text-zinc-900 dark:text-white"
            >
              {siteConfig.name}
            </Link>
          </div>

          <nav className="hidden flex-1 justify-end lg:flex">
            <ul className="flex items-center gap-8">
              {navItems.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "text-sm font-medium transition-all hover:text-zinc-900 dark:hover:text-white",
                      pathname === link.href
                        ? "text-zinc-900 underline underline-offset-8 decoration-2 dark:text-white"
                        : "text-zinc-500 dark:text-zinc-400"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="hidden flex-1 justify-start lg:flex" />

          <div className="hidden lg:flex" />
        </div>
      </div>

      {isOpen ? (
        <div className="absolute inset-x-4 top-20 rounded-3xl border border-stone-200 bg-white shadow-xl dark:border-zinc-800 dark:bg-zinc-950 lg:hidden">
          <ul className="divide-y divide-stone-100 dark:divide-zinc-800">
            {navItems.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "block px-6 py-4 text-base font-medium",
                    pathname === link.href
                      ? "bg-stone-50 text-zinc-900 dark:bg-zinc-900 dark:text-white"
                      : "text-zinc-600 dark:text-zinc-300"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
