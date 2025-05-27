"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="py-28 lg:py-32 lg:pt-44">
      <div className="container mx-auto flex flex-col justify-between gap-8 md:gap-14 lg:flex-row lg:gap-20">
        <div className="flex-1">
          <h1 className="max-w-160 text-3xl tracking-tight md:text-4xl lg:text-5xl xl:whitespace-nowrap">
            Open-Source Risk Management
          </h1>
          <p className="text-muted-foreground text-1xl mt-5 md:text-3xl">
            FortressOS is a comprehensive, free risk management platform for organizations of all sizes.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 lg:flex-nowrap">
            <Button size="lg">Get Started</Button>
            <Link href="/about">
              <Button variant="outline" className="gap-2">
                <span className="max-w-56 truncate text-start md:max-w-none">Learn About FortressOS</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </Button>
            </Link>
          </div>
        </div>

        <div className="relative flex flex-1 flex-col justify-center space-y-5 max-lg:pt-10 lg:ps-10">
          <div className="text-muted-foreground h-full w-px absolute top-0 left-0 max-lg:hidden">
            <div className="h-full w-px bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)] [mask-image:linear-gradient(180deg,transparent,black_25%,black_75%,transparent)]"></div>
          </div>
          <div className="text-muted-foreground h-px w-full absolute top-0 lg:hidden">
            <div className="h-px w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)] [mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]"></div>
          </div>

          <FeatureItem
            icon="shield-check"
            title="Asset Management"
            description="Create and maintain an inventory of your company's digital assets"
          />

          <FeatureItem
            icon="alert-triangle"
            title="Risk Assessment"
            description="Perform qualitative and quantitative risk assessments"
          />

          <FeatureItem
            icon="check-square"
            title="Control Mapping"
            description="Define and track security controls to mitigate risks"
          />

          <FeatureItem
            icon="activity"
            title="Compliance Management"
            description="Track compliance with industry standards and frameworks"
          />
        </div>
      </div>

      <div className="mt-12 max-lg:ml-6 max-lg:h-[550px] max-lg:overflow-hidden md:mt-20 lg:container lg:mx-auto lg:mt-24">
        <div className="relative h-[550px] w-full">
          <Image
            alt="FortressOS risk management dashboard"
            src="/hero.webp"
            fill
            className="rounded-3xl object-cover object-left-top shadow-lg max-lg:rounded-tr-none"
          />
        </div>
      </div>
    </section>
  );
}

type FeatureItemProps = {
  icon: string;
  title: string;
  description: string;
};

// Helper component for feature items
function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <div className="flex gap-2.5 lg:gap-5">
      <FeatureIcon name={icon} />
      <div>
        <h2 className="font-text font-semibold">{title}</h2>
        <p className="text-muted-foreground max-w-76 text-sm">{description}</p>
      </div>
    </div>
  );
}

type FeatureIconProps = {
  name: string;
};

// Helper component for feature icons
function FeatureIcon({ name }: FeatureIconProps) {
  // Render different icons based on name
  const iconClass = "text-primary mt-1 size-4 shrink-0 lg:size-5";

  switch (name) {
    case "shield-check":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "lock":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
          <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
      );
    case "key":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <circle cx="7.5" cy="15.5" r="5.5" />
          <path d="m21 2-9.6 9.6" />
          <path d="m15.5 7.5 3 3L22 7l-3-3" />
        </svg>
      );
    case "activity":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
        </svg>
      );
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={iconClass}>
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="1" />
        </svg>
      );
  }
}
