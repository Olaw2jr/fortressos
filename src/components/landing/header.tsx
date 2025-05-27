"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export function Header() {
  return (
    <header className="bg-background/70 absolute top-5 left-1/2 z-50 w-[min(90%,700px)] -translate-x-1/2 rounded-full border backdrop-blur-md lg:top-12">
      <div className="flex items-center justify-between px-6 py-3">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <Image
            alt="FortressOS"
            loading="lazy"
            width="94"
            height="18"
            className="dark:invert"
            src="/logo.svg"
          />
        </Link>

        <nav aria-label="Main" data-orientation="horizontal" className="relative z-10 flex max-w-max flex-1 items-center justify-center max-lg:hidden">
          <div className="relative">
            <ul className="group flex flex-1 list-none items-center justify-center space-x-1" data-orientation="horizontal">
              <li>
                <Link href="/features" className="group inline-flex h-9 w-max items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground focus:outline-hidden bg-transparent px-1.5">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/about" className="relative bg-transparent px-1.5 text-sm font-medium">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="relative bg-transparent px-1.5 text-sm font-medium">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="/faq" className="relative bg-transparent px-1.5 text-sm font-medium">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="relative bg-transparent px-1.5 text-sm font-medium">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <Link href="/login" className="max-lg:hidden">
            <Button variant="outline" size="sm">Login</Button>
          </Link>
          <button className="text-muted-foreground relative flex size-8 lg:hidden">
            <span className="sr-only">Open main menu</span>
            <div className="absolute top-1/2 left-1/2 block w-[18px] -translate-x-1/2 -translate-y-1/2">
              <span aria-hidden="true" className="absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out -translate-y-1.5"></span>
              <span aria-hidden="true" className="absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out"></span>
              <span aria-hidden="true" className="absolute block h-0.5 w-full rounded-full bg-current transition duration-500 ease-in-out translate-y-1.5"></span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}
