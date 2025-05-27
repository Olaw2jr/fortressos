"use client";

import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { Check } from "lucide-react";

export function PricingSection() {
  const [annualBilling, setAnnualBilling] = useState(true);
  
  return (
    <section className="py-28 lg:py-32">
      <div className="container mx-auto max-w-5xl">
        <div className="space-y-4 text-center">
          <h2 className="text-2xl tracking-tight md:text-4xl lg:text-5xl">Pricing</h2>
          <p className="text-muted-foreground mx-auto max-w-xl leading-snug text-balance">
            FortressOS is completely free and open-source. We offer optional support services for organizations that need dedicated assistance with their risk management program.
          </p>
        </div>
        
        <div className="mt-8 grid items-start gap-5 text-start md:mt-12 md:grid-cols-3 lg:mt-20">
          {/* Free Plan */}
          <PricingCard
            title="Community"
            price="$0"
            description="Free and open-source forever"
            features={[
              "Full risk management features",
              "Asset management",
              "Threat & vulnerability tracking",
              "Unlimited self-hosting",
              "Community support"
            ]}
            buttonText="Get started"
            buttonVariant="outline"
          />
          
          {/* Pro Plan */}
          <PricingCard
            title="Supported"
            price={annualBilling ? "$499" : "$59"}
            billingPeriod={annualBilling ? "per year" : "per month"}
            description="Professional support for your risk management program"
            features={[
              "All community features",
              "Email support within 48 hours",
              "Implementation guidance",
              "Risk framework consulting",
              "Monthly security updates",
              "Customization assistance"
            ]}
            buttonText="Get started"
            buttonVariant="default"
            highlighted
            billingToggle={
              <div className="flex items-center gap-2">
                <Switch 
                  checked={annualBilling} 
                  onCheckedChange={setAnnualBilling} 
                />
                <span className="text-sm font-medium">Billed annually</span>
              </div>
            }
          />
          
          {/* Enterprise Plan */}
          <PricingCard
            title="Enterprise"
            price="Custom"
            description="Tailored solutions for large organizations"
            features={[
              "All supported features",
              "Dedicated support engineer",
              "Custom risk assessment methodologies",
              "Integration with existing tools",
              "SLA guarantees",
              "Compliance framework mapping"
            ]}
            buttonText="Contact sales"
            buttonVariant="outline"
          />
        </div>
      </div>
    </section>
  );
}

type PricingCardProps = {
  title: string;
  price: string;
  billingPeriod?: string;
  description: string;
  features: string[];
  buttonText: string;
  buttonVariant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  highlighted?: boolean;
  billingToggle?: React.ReactNode;
};

function PricingCard({ 
  title, 
  price, 
  billingPeriod, 
  description, 
  features, 
  buttonText, 
  buttonVariant = "outline",
  highlighted = false,
  billingToggle
}: PricingCardProps) {
  return (
    <div className={`bg-card text-card-foreground rounded-xl border shadow-sm ${highlighted ? 'outline-primary origin-top outline-4' : ''}`}>
      <div className="p-6 flex flex-col gap-7 px-6 py-5">
        <div className="space-y-2">
          <h3 className="text-primary font-semibold">{title}</h3>
          <div className="space-y-1">
            <div className="text-muted-foreground text-lg font-medium">
              {price} {billingPeriod && <span className="text-muted-foreground">{billingPeriod}</span>}
            </div>
          </div>
        </div>
        
        {billingToggle && billingToggle}
        
        <span className="text-muted-foreground text-sm">{description}</span>
        
        <div className="space-y-3">
          {features.map((feature, index) => (
            <div key={index} className="text-muted-foreground flex items-center gap-1.5">
              <Check className="size-5 shrink-0" />
              <span className="text-sm">{feature}</span>
            </div>
          ))}
        </div>
        
        <Button variant={buttonVariant} className="w-fit">{buttonText}</Button>
      </div>
    </div>
  );
}
