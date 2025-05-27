"use client";

import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';

export function TestimonialsSection() {
  return (
    <section className="py-28 lg:py-32">
      <div className="container mx-auto">
        <div className="space-y-4">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">
            Trusted by Risk Managers
          </h2>
          <p className="text-muted-foreground max-w-md leading-snug">
            FortressOS is the preferred risk management platform for organizations that need powerful
            tools without the prohibitive costs of commercial GRC solutions.
          </p>
          <Button variant="outline" className="shadow-md">
            Read our Case Studies
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="relative mt-8 -mr-[max(3rem,calc((100vw-80rem)/2+3rem))] md:mt-12 lg:mt-20">
          <div className="relative w-full overflow-hidden">
            <div className="flex gap-4 pb-8">
              {testimonials.map((testimonial, index) => (
                <TestimonialCard key={index} testimonial={testimonial} />
              ))}
            </div>

            <div className="mt-8 flex gap-3">
              <Button variant="outline" size="icon" className="rounded-full size-14">
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
                  className="size-6 lg:size-9"
                >
                  <path d="m15 18-6-6 6-6"></path>
                </svg>
                <span className="sr-only">Previous slide</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full size-14">
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
                  className="size-6 lg:size-9"
                >
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
                <span className="sr-only">Next slide</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

type Testimonial = {
  name: string;
  title: string;
  company: string;
  image: string;
  quote: string;
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="min-w-0 shrink-0 pl-4 xl:basis-1/3.5 grow basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-[28%] 2xl:basis-[24%]">
      <div className="text-card-foreground rounded-xl border shadow-sm bg-muted h-full overflow-hidden border-none">
        <div className="flex h-full flex-col p-0">
          <div className="relative h-[288px] lg:h-[328px]">
            <Image
              alt={testimonial.name}
              src={testimonial.image}
              fill
              className="object-cover object-top"
            />
          </div>
          <div className="flex flex-1 flex-col justify-between gap-10 p-6">
            <blockquote className="font-display text-lg leading-snug font-medium md:text-xl lg:text-2xl">
              {testimonial.quote}
            </blockquote>
            <div className="space-y-0.5">
              <div className="text-primary font-semibold">{testimonial.name}, {testimonial.title}</div>
              <div className="text-muted-foreground text-sm">{testimonial.company}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    title: "CISO",
    company: "TechSecure Inc.",
    image: "/testimonials/sarah-johnson.webp",
    quote: "FortressOS has revolutionized our risk management program and saved us thousands compared to commercial GRC tools."
  },
  {
    name: "Michael Chen",
    title: "Security Engineer",
    company: "DataSafe Systems",
    image: "/testimonials/michael-chen.webp",
    quote: "The asset and risk assessment capabilities in FortressOS are intuitive yet powerful enough for our ISO 27001 compliance needs."
  },
  {
    name: "Olivia Martinez",
    title: "VP of Engineering",
    company: "SecureFlow",
    image: "/testimonials/olivia-martinez.webp",
    quote: "Our team loves how FortressOS balances comprehensive risk management with an excellent user experience. The dashboard is a game-changer."
  },
  {
    name: "James Wilson",
    title: "IT Manager",
    company: "ProtectNet",
    image: "/testimonials/james-wilson.webp",
    quote: "As an SME with limited resources, FortressOS has enabled us to implement a formal risk management process that impressed even our auditors."
  }
];
