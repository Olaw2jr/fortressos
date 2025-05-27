"use client";

import Image from 'next/image';
import Link from 'next/link';

export function FeaturesSection() {
  return (
    <section id="features" className="pb-28 lg:pb-32">
      <div className="container mx-auto">
        <div className="relative flex items-center justify-center">
          <div className="relative h-px w-full text-muted-foreground">
            <div className="h-px w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)] [mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]"></div>
          </div>
          <span className="bg-muted text-muted-foreground absolute px-3 font-mono text-sm font-medium tracking-wide max-md:hidden">
            RISK MANAGEMENT FOR ALL
          </span>
        </div>
        
        <div className="mx-auto mt-10 grid max-w-4xl items-center gap-3 md:gap-0 lg:mt-24 lg:grid-cols-2">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Democratizing IT Risk Management
          </h2>
          <p className="text-muted-foreground leading-snug">
            FortressOS is a free, open-source alternative to expensive GRC tools, designed to help organizations 
            identify, assess, treat, and monitor IT and cybersecurity risks with a modern, intuitive interface.
          </p>
        </div>
        
        <div className="bg-card text-card-foreground border shadow-sm mt-8 rounded-3xl md:mt-12 lg:mt-20">
          <div className="flex p-0 max-md:flex-col">
            <FeatureCard
              title="Asset & Threat Management"
              imageSrc="/features/auth-card.svg"
              description="Create and maintain a categorized inventory of assets and identify relevant threats."
            />
            
            <FeatureCard
              title="Risk Assessment"
              imageSrc="/features/encryption-card.svg"
              description="Perform both qualitative and quantitative risk assessments with configurable risk matrices."
            />
            
            <FeatureCard
              title="Control Implementation"
              imageSrc="/features/monitor-card.svg"
              description="Define and link security controls to risks aligned with frameworks like CIS, NIST, and ISO."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type FeatureCardProps = {
  title: string;
  imageSrc: string;
  description: string;
};

function FeatureCard({ title, imageSrc, description }: FeatureCardProps) {
  return (
    <div className="flex flex-1 max-md:flex-col">
      <div className="flex-1 p-4 pe-0 md:p-6">
        <p className="text-muted-foreground mb-4">{description}</p>
        <div className="relative aspect-[1.28/1] overflow-hidden">
          <Image
            alt={title}
            src={imageSrc}
            fill
            className="object-cover object-left-top ps-4 pt-2"
          />
          <div className="from-background absolute inset-0 z-10 bg-linear-to-t via-transparent to-transparent"></div>
        </div>
        <Link href={`/features#${title.toLowerCase().replace(/\s+/g, '-')}`} className="group flex items-center justify-between gap-4 pe-4 pt-4 md:pe-6 md:pt-6">
          <h3 className="font-display max-w-60 text-2xl leading-tight font-bold tracking-tight">
            {title}
          </h3>
          <div className="rounded-full border p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-chevron-right size-6 transition-transform group-hover:translate-x-1 lg:size-9"
            >
              <path d="m9 18 6-6-6-6"></path>
            </svg>
          </div>
        </Link>
      </div>
      
      {/* Divider */}
      <div className="relative hidden md:block">
        <div className="text-muted-foreground relative h-full w-px">
          <div className="h-full w-px bg-[repeating-linear-gradient(180deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)] [mask-image:linear-gradient(180deg,transparent,black_25%,black_75%,transparent)]"></div>
        </div>
      </div>
      <div className="relative block md:hidden">
        <div className="text-muted-foreground relative h-px w-full">
          <div className="h-px w-full bg-[repeating-linear-gradient(90deg,transparent,transparent_4px,currentColor_4px,currentColor_10px)] [mask-image:linear-gradient(90deg,transparent,black_25%,black_75%,transparent)]"></div>
        </div>
      </div>
    </div>
  );
}
