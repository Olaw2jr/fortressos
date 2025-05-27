"use client";

import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function FaqSection() {
  return (
    <section className="py-28 lg:py-32">
      <div className="container mx-auto max-w-5xl">
        <div className="mx-auto grid gap-16 lg:grid-cols-2">
          <div className="space-y-4">
            <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">Got Questions?</h2>
            <p className="text-muted-foreground max-w-md leading-snug lg:mx-auto">
              If you can&apos;t find what you&apos;re looking for,{" "}
              <Link href="/contact" className="underline underline-offset-4">
                get in touch
              </Link>.
            </p>
          </div>

          <div className="grid gap-6 text-start">
            <FaqCategory
              title="Risk Management"
              items={[
                {
                  question: "What risk assessment methodologies does FortressOS support?",
                  answer: "FortressOS supports both qualitative and quantitative risk assessment methods, including customizable risk matrices, as well as SLE (Single Loss Expectancy), ARO (Annual Rate of Occurrence), and ALE (Annual Loss Expectancy) calculations."
                },
                {
                  question: "How does FortressOS help with compliance?",
                  answer: "FortressOS maps controls to common frameworks like ISO 27001, NIST CSF, and CIS Controls, making it easier to demonstrate compliance with industry standards and regulations."
                },
                {
                  question: "Can I customize the risk assessment criteria?",
                  answer: "Yes, FortressOS provides flexible customization options for risk assessment criteria, allowing you to tailor the methodology to your organization's specific requirements and risk appetite."
                }
              ]}
            />

            <FaqCategory
              title="Platform"
              items={[
                {
                  question: "How can I deploy FortressOS?",
                  answer: "FortressOS can be easily self-hosted using Docker on your own infrastructure. It's designed as a 12-factor app for easy deployment, scaling, and maintenance."
                },
                {
                  question: "Is FortressOS truly free and open-source?",
                  answer: "Yes, FortressOS is 100% free and open-source software. The core platform will always remain free, with optional paid support services available for organizations that need additional assistance."
                }
              ]}
            />

            <FaqCategory
              title="Community & Support"
              items={[
                {
                  question: "How can I contribute to FortressOS?",
                  answer: "We welcome contributions from the community! You can contribute code, documentation, translations, or share risk assessment templates and control libraries. Check our GitHub repository for contribution guidelines."
                },
                {
                  question: "What kind of support is available?",
                  answer: "The Community edition includes support through our GitHub issues and community forums. Paid support plans include direct email support, implementation guidance, and dedicated support engineers for enterprise customers."
                }
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

type FaqItem = {
  question: string;
  answer: string;
};

type FaqCategoryProps = {
  title: string;
  items: FaqItem[];
};

function FaqCategory({ title, items }: FaqCategoryProps) {
  return (
    <div>
      <h3 className="text-muted-foreground border-b py-4">{title}</h3>
      <Accordion type="single" collapsible className="w-full">
        {items.map((item, index) => (
          <AccordionItem key={index} value={`item-${index}`}>
            <AccordionTrigger className="text-sm font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-sm">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
