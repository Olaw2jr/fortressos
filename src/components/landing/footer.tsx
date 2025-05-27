"use client";

import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { ReactNode } from "react";

export function Footer() {
  return (
    <footer className="flex flex-col items-center gap-14 pt-28 lg:pt-32">
      <div className="container mx-auto space-y-3 text-center">
        <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
          Manage your risks effectively today
        </h2>
        <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
          FortressOS provides a free, open-source risk management platform for organizations of all sizes. No more expensive GRC tools.
        </p>
        <div>
          <Button size="lg" className="mt-4 rounded-lg px-8">
            Get started
          </Button>
        </div>
      </div>
      
      <nav className="container mx-auto flex flex-col items-center gap-4">
        <ul className="flex flex-wrap items-center justify-center gap-6">
          <FooterLink href="/features">Features</FooterLink>
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/pricing">Pricing</FooterLink>
          <FooterLink href="/faq">FAQ</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
          <FooterExternalLink href="https://twitter.com/fortressos">Twitter</FooterExternalLink>
          <FooterExternalLink href="https://linkedin.com/company/fortressos">LinkedIn</FooterExternalLink>
        </ul>
        
        <ul className="flex flex-wrap items-center justify-center gap-6">
          <FooterSmallLink href="/privacy">Privacy Policy</FooterSmallLink>
          <FooterSmallLink href="/terms">Terms of Service</FooterSmallLink>
          <FooterSmallLink href="/security">Security</FooterSmallLink>
        </ul>
      </nav>
      
      <div className="w-full mt-10 md:mt-14 lg:mt-20">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <Image 
              src="/logo.svg" 
              alt="FortressOS" 
              width={120} 
              height={30} 
              className="dark:invert" 
            />
            <span className="text-muted-foreground text-sm">
              © {new Date().getFullYear()} FortressOS. All rights reserved.
            </span>
          </div>
          <div className="text-muted-foreground text-sm">
            Built with security at its core
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterLinkProps = {
  href: string;
  children: ReactNode;
};

function FooterLink({ href, children }: FooterLinkProps) {
  return (
    <li>
      <Link 
        className="font-medium transition-opacity hover:opacity-75" 
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}

type FooterExternalLinkProps = {
  href: string;
  children: ReactNode;
};

function FooterExternalLink({ href, children }: FooterExternalLinkProps) {
  return (
    <li>
      <a 
        className="flex items-center gap-0.5 font-medium transition-opacity hover:opacity-75" 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}{" "}
        <ArrowUpRight className="size-4" />
      </a>
    </li>
  );
}

type FooterSmallLinkProps = {
  href: string;
  children: ReactNode;
};

function FooterSmallLink({ href, children }: FooterSmallLinkProps) {
  return (
    <li>
      <Link 
        className="text-muted-foreground text-sm transition-opacity hover:opacity-75" 
        href={href}
      >
        {children}
      </Link>
    </li>
  );
}
